import sql from 'mssql'

let pool: sql.ConnectionPool | null = null

export async function getDb(): Promise<sql.ConnectionPool> {
  if (pool?.connected) return pool

  const { db } = useRuntimeConfig()

  pool = await new sql.ConnectionPool({
    server:   db.host,
    port:     db.port,
    database: db.database,
    user:     db.user,
    password: db.password,
    options: {
      encrypt:                db.encrypt,
      trustServerCertificate: db.trustCert,
    },
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30_000,
    }
  }).connect()

  pool.on('error', () => { pool = null })

  return pool
}
