import { execSync } from "node:child_process";

function run(command) {
  execSync(command, { stdio: "inherit" });
}

function isLocalDatabaseUrl(url) {
  return /localhost|127\.0\.0\.1/.test(url);
}

run("npx prisma generate");

const databaseUrl = process.env.DATABASE_URL?.trim();

if (!databaseUrl) {
  console.error("\n❌ DATABASE_URL is not set in Vercel Environment Variables.");
  console.error("   1. Create a free database at https://neon.tech");
  console.error("   2. Copy the connection string (use DIRECT connection, not pooled)");
  console.error("   3. Vercel → Settings → Environment Variables → add DATABASE_URL");
  console.error("   4. Redeploy\n");
  process.exit(1);
}

if (isLocalDatabaseUrl(databaseUrl)) {
  console.error("\n❌ DATABASE_URL points to localhost. Vercel cannot use your local PC database.");
  console.error("   Replace it with your Neon/Supabase production URL in Vercel settings.\n");
  process.exit(1);
}

try {
  run("npx prisma migrate deploy");
} catch {
  console.error("\n❌ Database migration failed.");
  console.error("   Use Neon DIRECT connection string (not pooled) as DATABASE_URL.");
  console.error("   Neon dashboard → Connection details → Direct connection → copy URL\n");
  process.exit(1);
}

run("npx next build");
