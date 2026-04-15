const { query } = require("../db");
const { decodeToken } = require("../utils/auth");

async function requireAuth(req, res, next) {
  const authorizationHeader = req.headers.authorization || "";
  const [scheme, token] = authorizationHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({
      success: false,
      message: "Authentication is required.",
    });
  }

  try {
    const payload = decodeToken(token);
    const result = await query(
      `
        select id, student_id, has_voted
        from voters
        where id = $1
      `,
      [payload.sub]
    );

    if (!result.rows[0]) {
      return res.status(401).json({
        success: false,
        message: "Session is no longer valid.",
      });
    }

    req.user = result.rows[0];
    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired session.",
    });
  }
}

module.exports = {
  requireAuth,
};