import { dev } from '$app/environment'
import { env } from '$env/dynamic/private'
import * as config from '$lib/config'
import { prisma } from '$lib/server/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { SvelteKitAuth } from '@auth/sveltekit'
import DiscordProvider from '@auth/sveltekit/providers/discord'
import EmailProvider from '@auth/sveltekit/providers/nodemailer'

export const { handle, signIn, signOut } = SvelteKitAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id
      }
      return session
    },
  },
  pages: {
    signIn: '/',
    newUser: '/',
    signOut: '/',
    verifyRequest: '/',
  },
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    EmailProvider({
      from: env.EMAIL_FROM,
      server: {
        host: env.EMAIL_SERVER_HOST,
        port: env.EMAIL_SERVER_PORT,
        auth: {
          user: env.EMAIL_SERVER_USER,
          pass: env.EMAIL_SERVER_PASSWORD,
        },
      },
    }),
  ],
  trustHost: dev,
  basePath: config.APP_URL,
})
