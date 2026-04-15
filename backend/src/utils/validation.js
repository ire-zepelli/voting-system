const studentIdPattern = /^\d{8}$/;
const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function normalizeStudentId(studentId = "") {
  return String(studentId).trim();
}

function isValidStudentId(studentId) {
  return studentIdPattern.test(studentId);
}

function isValidPassword(password = "") {
  return typeof password === "string" && password.trim().length >= 6;
}

function isValidCandidateIds(candidateIds) {
  return (
    Array.isArray(candidateIds) &&
    candidateIds.length > 0 &&
    candidateIds.every((candidateId) => uuidPattern.test(candidateId))
  );
}

module.exports = {
  isValidCandidateIds,
  isValidPassword,
  isValidStudentId,
  normalizeStudentId,
};