CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP FUNCTION IF EXISTS cast_ballot(UUID, UUID[]);
DROP TABLE IF EXISTS ballot_items;
DROP TABLE IF EXISTS ballots;
DROP TABLE IF EXISTS voters;
DROP TABLE IF EXISTS candidates;

CREATE TABLE voters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id VARCHAR(8) NOT NULL UNIQUE CHECK (student_id ~ '^[0-9]{8}$'),
    password_hash TEXT NOT NULL,
    has_voted BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE candidates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    partylist VARCHAR(50) NOT NULL CHECK (partylist IN ('BEATS', 'PEAK')),
    position VARCHAR(100) NOT NULL,
    display_order INTEGER NOT NULL,
    image_path TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE ballots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    voter_id UUID NOT NULL UNIQUE REFERENCES voters(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE ballot_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ballot_id UUID NOT NULL REFERENCES ballots(id) ON DELETE CASCADE,
    position VARCHAR(100) NOT NULL,
    candidate_id UUID NOT NULL REFERENCES candidates(id) ON DELETE RESTRICT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE (ballot_id, position)
);

CREATE INDEX idx_candidates_display_order ON candidates(display_order, partylist);
CREATE INDEX idx_ballot_items_candidate_id ON ballot_items(candidate_id);

INSERT INTO candidates (name, partylist, position, display_order, image_path) VALUES
('Crista Monica Oscar', 'BEATS', 'President', 1, '/BEATS/TRANSPARENT_INDIV/OSCAR_PRES.png'),
('Darren Villanueva', 'PEAK', 'President', 1, '/PEAK/PEAK NO BACKGROUND INDIVIDUAL/PRES- VILLANUEVA_.png'),
('Dan Pierre Pogoy', 'BEATS', 'Vice-President Internal', 2, '/BEATS/TRANSPARENT_INDIV/POGOY_VP_INTERNAL.png'),
('Altheia Dano', 'PEAK', 'Vice-President Internal', 2, '/PEAK/PEAK NO BACKGROUND INDIVIDUAL/VP INTERNAL- DANO.png'),
('Ryan Pacumio', 'BEATS', 'Vice-President External', 3, '/BEATS/TRANSPARENT_INDIV/PACUMIO_VP_EXTERNAL.png'),
('Kane Huxley Book', 'PEAK', 'Vice-President External', 3, '/PEAK/PEAK NO BACKGROUND INDIVIDUAL/VP EXTERNAL - BOOK.png'),
('May Lapeña', 'BEATS', 'Secretary', 4, '/BEATS/TRANSPARENT_INDIV/LAPENA_SECRETARY.png'),
('Diane Mendoza', 'PEAK', 'Secretary', 4, '/PEAK/PEAK NO BACKGROUND INDIVIDUAL/SECRETARY - MENDOZA_.png'),
('Fiona Monilar', 'BEATS', 'Public Information Officer', 5, '/BEATS/TRANSPARENT_INDIV/MONILAR_PIO.png'),
('Jea Mary Trixy Magalland', 'PEAK', 'Public Information Officer', 5, '/PEAK/PEAK NO BACKGROUND INDIVIDUAL/P.I OFFICER- MAGALLANO.png'),
('Keith Ramises Latonio', 'BEATS', 'Treasurer', 6, '/BEATS/TRANSPARENT_INDIV/LATONIO_TREASURER.png'),
('Hanny Jane Enriquez', 'PEAK', 'Treasurer', 6, '/PEAK/PEAK NO BACKGROUND INDIVIDUAL/TREASURER - ENRIQUEZ_.png'),
('Harry Conde', 'BEATS', 'Chief of Creatives', 7, '/BEATS/TRANSPARENT_INDIV/CONDE_CHIEF_OF_CREATIVES.png'),
('Tristhan Mark Vincent Villamor', 'PEAK', 'Chief of Creatives', 7, '/PEAK/PEAK NO BACKGROUND INDIVIDUAL/CREATIVES - VILLAMOR_.png'),
('Emmanuel Franz Apawan', 'BEATS', 'Auditor', 8, '/BEATS/TRANSPARENT_INDIV/APAWAN_AUDITOR.png'),
('Myka Angela Dumael', 'PEAK', 'Auditor', 8, '/PEAK/PEAK NO BACKGROUND INDIVIDUAL/AUDIT- DUMAEL.png'),
('Jhoviegen Cuysona', 'BEATS', 'Chief of Representative', 9, '/BEATS/TRANSPARENT_INDIV/CUYSONA_CHIEF_OF_REP.png'),
('Abijah Shen Regado', 'PEAK', 'Chief of Representative', 9, '/PEAK/PEAK NO BACKGROUND INDIVIDUAL/REPRESENTATIVE - REGADO.png'),
('Aimee Gayle Cogal', 'BEATS', 'Chief of Students Development', 10, '/BEATS/TRANSPARENT_INDIV/COGAL_CHIEF_OF_STUDENTDEV.png'),
('Jeoff Andrew Demecillo', 'PEAK', 'Chief of Students Development', 10, '/PEAK/PEAK NO BACKGROUND INDIVIDUAL/DEVELOPMENT - DEMECILLO.png'),
('Rose Anne Resureccion', 'BEATS', 'Academic Representative', 11, '/BEATS/TRANSPARENT_INDIV/RESURRECCION_ACADEMIC_REP.png'),
('Mary Grace Patalinghug', 'BEATS', 'CARES Representative', 12, '/BEATS/TRANSPARENT_INDIV/PATALINGHUG_CARE_REP.png'),
('Nathaniel Ornopia', 'PEAK', 'CARES Representative', 12, '/PEAK/PEAK NO BACKGROUND INDIVIDUAL/CARES REP- ORNOPIA.png');

CREATE OR REPLACE FUNCTION cast_ballot(v_voter_id UUID, v_candidate_ids UUID[])
RETURNS VOID AS $$
DECLARE
    expected_position_count INTEGER;
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

    SELECT count(DISTINCT position)
    INTO expected_position_count
    FROM candidates;

    SELECT count(DISTINCT position)
    INTO selected_position_count
    FROM candidates
    WHERE id = ANY(v_candidate_ids);

    IF coalesce(array_length(v_candidate_ids, 1), 0) <> selected_position_count THEN
        RAISE EXCEPTION 'Only one candidate can be selected per position.';
    END IF;

    IF selected_position_count <> expected_position_count THEN
        RAISE EXCEPTION 'Complete the ballot before submitting.';
    END IF;

    INSERT INTO ballots (voter_id)
    VALUES (v_voter_id)
    RETURNING id INTO new_ballot_id;

    INSERT INTO ballot_items (ballot_id, position, candidate_id)
    SELECT new_ballot_id, position, id
    FROM candidates
    WHERE id = ANY(v_candidate_ids);

    UPDATE voters
    SET has_voted = TRUE
    WHERE id = v_voter_id;
END;
$$ LANGUAGE plpgsql;