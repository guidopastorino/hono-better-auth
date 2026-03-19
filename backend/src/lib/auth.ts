import 'dotenv/config'
import { betterAuth } from "better-auth";
import { db } from "../db/db";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "../db/schemas/auth-schema";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  url: process.env.BETTER_AUTH_URL,
  trustedOrigins: [process.env.FRONTEND_URL!],
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    crossSubDomainCookies: {
      enabled: true
    },
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
      partitioned: true
    },
    cookies: {
      sessionToken: {
        attributes: {
          sameSite: "none",
          secure: true,
          partitioned: true
        }
      }
    }
  }
});