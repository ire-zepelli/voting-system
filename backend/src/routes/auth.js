const express = require("express");

const { query } = require("../db");
const { requireAuth } = require("../middleware/auth");
const { createToken, hashPassword } = require("../utils/auth");
const { isValidStudentId, normalizeStudentId } = require("../utils/validation");

const router = express.Router();
const ID_ONLY_AUTH_SEED = "__id_only_student_login__";

let idOnlyPasswordHashPromise;

function serializeUser(voter) {
  return {
    id: voter.id,
    studentId: voter.student_id,
    hasVoted: voter.has_voted,
  };
}

function getIdOnlyPasswordHash() {
  if (!idOnlyPasswordHashPromise) {
    idOnlyPasswordHashPromise = hashPassword(ID_ONLY_AUTH_SEED);
  }

  return idOnlyPasswordHashPromise;
}

async function findOrCreateVoter(studentId) {
  const passwordHash = await getIdOnlyPasswordHash();
  const result = await query(
    `
      insert into voters (student_id, password_hash)
      values ($1, $2)
      on conflict (student_id) do update
      set student_id = excluded.student_id
      returning id, student_id, has_voted
    `,
    [studentId, passwordHash]
  );

  return result.rows[0];
}

router.post("/register", async (_req, res) => {
  return res.status(410).json({
    success: false,
    message: "Registration is disabled. Use your 8-digit student ID to sign in.",
  });
});

router.post("/login", async (req, res) => {
  const studentId = normalizeStudentId(req.body?.studentId);

  if (!isValidStudentId(studentId)) {
    return res.status(400).json({
      success: false,
      message: "Enter a valid 8-digit student ID.",
    });
  }

  try {
    const voter = await findOrCreateVoter(studentId);

    return res.json({
      success: true,
      message: "Sign-in successful.",
      token: createToken(voter),
      user: serializeUser(voter),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to sign in right now.",
    });
  }
});

router.get("/me", requireAuth, async (req, res) => {
  return res.json({
    success: true,
    user: serializeUser(req.user),
  });
});

module.exports = router;