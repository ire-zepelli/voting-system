const express = require("express");

const { query } = require("../db");
const { requireAuth } = require("../middleware/auth");
const { isValidCandidateIds } = require("../utils/validation");

const router = express.Router();

function serializeCandidate(candidate) {
  return {
    id: candidate.id,
    name: candidate.name,
    partylist: candidate.partylist,
    position: candidate.position,
    displayOrder: candidate.display_order,
    imagePath: candidate.image_path,
  };
}

router.get("/candidates", async (req, res) => {
  try {
    const result = await query(
      `
        select id, name, partylist, position, display_order, image_path
        from candidates
        order by display_order asc, partylist asc, name asc
      `
    );

    return res.json({
      success: true,
      candidates: result.rows.map(serializeCandidate),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to load candidates right now.",
    });
  }
});

router.get("/results", async (req, res) => {
  try {
    const [summaryResult, resultsResult] = await Promise.all([
      query(
        `
          select
            count(*)::int as registered_voters,
            count(*) filter (where has_voted)::int as ballots_cast
          from voters
        `
      ),
      query(
        `
          with position_totals as (
            select
              c.position,
              count(bi.id)::int as total_votes
            from candidates c
            left join ballot_items bi on bi.candidate_id = c.id
            group by c.position
          )
          select
            c.position,
            c.display_order,
            c.id,
            c.name,
            c.partylist,
            c.image_path,
            count(bi.id)::int as vote_count,
            coalesce(round((count(bi.id)::numeric / nullif(pt.total_votes, 0)) * 100, 1), 0) as percentage
          from candidates c
          left join ballot_items bi on bi.candidate_id = c.id
          left join position_totals pt on pt.position = c.position
          group by c.position, c.display_order, c.id, c.name, c.partylist, c.image_path, pt.total_votes
          order by c.display_order asc, c.partylist asc, c.name asc
        `
      ),
    ]);

    const groupedResults = [];
    let currentPosition = null;

    for (const row of resultsResult.rows) {
      if (row.position !== currentPosition) {
        groupedResults.push({
          position: row.position,
          displayOrder: row.display_order,
          candidates: [],
        });
        currentPosition = row.position;
      }

      groupedResults[groupedResults.length - 1].candidates.push({
        id: row.id,
        name: row.name,
        partylist: row.partylist,
        imagePath: row.image_path,
        voteCount: row.vote_count,
        percentage: Number(row.percentage),
      });
    }

    return res.json({
      success: true,
      summary: {
        registeredVoters: summaryResult.rows[0]?.registered_voters || 0,
        ballotsCast: summaryResult.rows[0]?.ballots_cast || 0,
      },
      positions: groupedResults,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to load election results right now.",
    });
  }
});

router.post("/votes", requireAuth, async (req, res) => {
  const candidateIds = req.body?.candidateIds;

  if (!isValidCandidateIds(candidateIds)) {
    return res.status(400).json({
      success: false,
      message: "Submit a complete ballot with valid candidate selections.",
    });
  }

  if (new Set(candidateIds).size !== candidateIds.length) {
    return res.status(400).json({
      success: false,
      message: "Only one candidate can be selected per position.",
    });
  }

  try {
    await query("select cast_ballot($1::uuid, $2::uuid[])", [
      req.user.id,
      candidateIds,
    ]);

    const updatedVoterResult = await query(
      `
        select id, student_id, has_voted
        from voters
        where id = $1
      `,
      [req.user.id]
    );

    return res.status(201).json({
      success: true,
      message: "Your ballot has been submitted.",
      user: {
        id: updatedVoterResult.rows[0].id,
        studentId: updatedVoterResult.rows[0].student_id,
        hasVoted: updatedVoterResult.rows[0].has_voted,
      },
    });
  } catch (error) {
    const message = error.message || "Unable to submit the ballot right now.";
    const statusCode =
      message.includes("already been submitted")
        ? 409
        : message.includes("Complete the ballot") ||
            message.includes("Only one candidate")
          ? 400
          : 500;

    return res.status(statusCode).json({
      success: false,
      message,
    });
  }
});

module.exports = router;