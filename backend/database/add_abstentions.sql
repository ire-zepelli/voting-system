DO $$
DECLARE
    constraint_name TEXT;
BEGIN
    FOR constraint_name IN
        SELECT conname
        FROM pg_constraint
        WHERE conrelid = 'ballot_items'::regclass
            AND contype = 'c'
            AND pg_get_constraintdef(oid) ILIKE '%is_abstained%'
    LOOP
        EXECUTE format('ALTER TABLE ballot_items DROP CONSTRAINT %I', constraint_name);
    END LOOP;
END $$;

DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
            AND table_name = 'ballot_items'
            AND column_name = 'is_abstained'
    ) THEN
        EXECUTE 'DELETE FROM ballot_items WHERE candidate_id IS NULL OR is_abstained = TRUE';
        EXECUTE 'ALTER TABLE ballot_items DROP COLUMN is_abstained';
    ELSE
        EXECUTE 'DELETE FROM ballot_items WHERE candidate_id IS NULL';
    END IF;
END $$;

ALTER TABLE ballot_items
    ALTER COLUMN candidate_id SET NOT NULL;

DROP FUNCTION IF EXISTS cast_ballot(UUID, JSONB);
DROP FUNCTION IF EXISTS cast_ballot(UUID, UUID[]);

CREATE OR REPLACE FUNCTION cast_ballot(v_voter_id UUID, v_candidate_ids UUID[])
RETURNS VOID AS $$
DECLARE
    submitted_candidate_count INTEGER;
    selected_position_count INTEGER;
    voter_has_voted BOOLEAN;
    new_ballot_id UUID;
BEGIN
    SELECT has_voted
    INTO voter_has_voted
    FROM voters
    WHERE id = v_voter_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Voter not found.';
    END IF;

    IF voter_has_voted THEN
        RAISE EXCEPTION 'Your ballot has already been submitted.';
    END IF;

    IF EXISTS (
        SELECT 1
        FROM unnest(coalesce(v_candidate_ids, ARRAY[]::UUID[])) AS selected(candidate_id)
        LEFT JOIN candidates c ON c.id = selected.candidate_id
        WHERE c.id IS NULL
    ) THEN
        RAISE EXCEPTION 'Ballot contains an unknown candidate.';
    END IF;

    SELECT count(*), count(DISTINCT c.position)
    INTO submitted_candidate_count, selected_position_count
    FROM unnest(coalesce(v_candidate_ids, ARRAY[]::UUID[])) AS selected(candidate_id)
    JOIN candidates c ON c.id = selected.candidate_id;

    IF submitted_candidate_count <> selected_position_count THEN
        RAISE EXCEPTION 'You can only select one candidate per position.';
    END IF;

    INSERT INTO ballots (voter_id)
    VALUES (v_voter_id)
    RETURNING id INTO new_ballot_id;

    INSERT INTO ballot_items (ballot_id, position, candidate_id)
    SELECT
        new_ballot_id,
        c.position,
        c.id
    FROM unnest(coalesce(v_candidate_ids, ARRAY[]::UUID[])) AS selected(candidate_id)
    JOIN candidates c ON c.id = selected.candidate_id;

    UPDATE voters
    SET has_voted = TRUE
    WHERE id = v_voter_id;
END;
$$ LANGUAGE plpgsql;