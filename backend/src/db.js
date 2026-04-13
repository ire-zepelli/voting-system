const { Pool } = require("pg");

const databaseUrl = process.env.DATABASE_URL;
const databaseHost = process.env.DB_HOST;
const databasePort = Number(process.env.DB_PORT || 5432);
const databaseName = process.env.DB_NAME;
const databaseUser = process.env.DB_USER;
const databasePassword = process.env.DB_PASSWORD;
const missingConfigMessage =
  "Database config is missing. Set DATABASE_URL or DB_HOST, DB_PORT, DB_NAME, DB_USER, and DB_PASSWORD.";

function isSupabaseHost(value = "") {
  return value.includes("supabase.co") || value.includes("pooler.supabase.com");
}

function resolvePoolConfig() {
  if (databaseUrl) {
    return {
      connectionString: databaseUrl,
      ssl: isSupabaseHost(databaseUrl) ? { rejectUnauthorized: false } : false,
    };
  }

  if (databaseHost && databaseName && databaseUser && databasePassword) {
    return {
      host: databaseHost,
      port: databasePort,
      database: databaseName,
      user: databaseUser,
      password: databasePassword,
      ssl: isSupabaseHost(databaseHost) ? { rejectUnauthorized: false } : false,
    };
  }

  return null;
}

const poolConfig = resolvePoolConfig();

if (!poolConfig) {
  console.warn(missingConfigMessage);
}

const pool = poolConfig ? new Pool(poolConfig) : null;

if (pool) {
  pool.on("error", (error) => {
    console.error("Unexpected PostgreSQL error:", error.message);
  });
}

async function query(text, params = []) {
  if (!pool) {
    throw new Error(missingConfigMessage);
  }

  return pool.query(text, params);
}

async function checkDatabaseConnection() {
  const result = await query(
    "select now() as server_time, current_database() as database_name, current_user as database_user"
  );
  const row = result.rows[0];

  return {
    connected: true,
    database: row.database_name,
    user: row.database_user,
    serverTime: row.server_time,
  };
}

module.exports = {
  checkDatabaseConnection,
  query,
};