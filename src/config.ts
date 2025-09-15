import dotenv from "dotenv"

dotenv.config();
function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
}

export const config = {
  sessionSecret: requireEnv("SESSION_SECRET_KEY"),
};
