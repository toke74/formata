export const ACCESS_TOKEN_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES || "15m";
export const REFRESH_TOKEN_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES || "30d";
export const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET;

if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
  console.error("JWT secrets not set in env");
  process.exit(1);
}
