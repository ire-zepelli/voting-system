const express = require("express");

const { query } = require("../db");
const { requireAuth } = require("../middleware/auth");
const { createToken, hashPassword, verifyPassword } = require("../utils/auth");
const {
  isValidPassword,
  isValidStudentId,
  normalizeStudentId,
} = require("../utils/validation");

const router = express.Router();

function serializeUser(voter) {
  return {
    id: voter.id,
    studentId: voter.student_id,
    hasVoted: voter.has_voted,
  };
}

router.post("/register", async (req, res) => {
  const studentId = normalizeStudentId(req.body?.studentId);
  const password = req.body?.password || "";

  if (!isValidStudentId(studentId)) {
    return res.status(400).json({
      success: false,
      message: "Student ID must be exactly 8 digits.",
    });
  }

  if (!isValidPassword(password)) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters long.",
    });
  }

  try {
    const passwordHash = await hashPassword(password);
    const result = await query(
      `
        insert into voters (student_id, password_hash)
        values ($1, $2)
        returning id, student_id, has_voted
      `,
      [studentId, passwordHash]
    );

    const voter = result.rows[0];

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      token: createToken(voter),
      user: serializeUser(voter),
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "Account already exists for this student ID.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to create the account right now.",
    });
  }
});

router.post("/login", async (req, res) => {
  const studentId = normalizeStudentId(req.body?.studentId);
  const password = req.body?.password || "";

  if (!isValidStudentId(studentId) || !password) {
    return res.status(400).json({
      success: false,
      message: "Enter a valid 8-digit student ID and password.",
    });
  }

  try {
    const result = await query(
      `
        select id, student_id, password_hash, has_voted
        from voters
        where student_id = $1
      `,
      [studentId]
    );

    const voter = result.rows[0];

    if (!voter) {
      return res.status(401).json({
        success: false,
        message: "No account was found for this student ID.",
      });
    }

    const passwordMatches = await verifyPassword(password, voter.password_hash);

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password.",
      });
    }

    return res.json({
      success: true,
      message: "Login successful.",
      token: createToken(voter),
      user: serializeUser(voter),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to log in right now.",
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