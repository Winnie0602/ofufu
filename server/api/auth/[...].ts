import { NuxtAuthHandler } from '#auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

type Credentials = {
  username: string
  password: string
}

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,

  providers: [
    // admin 登入
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: 'Credentials',
      credentials: {
        username: {},
        password: {},
      },

      async authorize(credentials: Credentials) {
        const { username, password } = credentials

        if (username === 'admin_w' && password === '123456') {
          return {
            id: '1',
            name: 'Winnie',
            role: 'admin',
          }
        }

        return null
      },
    }),
    // 一般使用者 Google 登入
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId: useRuntimeConfig().googleClientId,
      clientSecret: useRuntimeConfig().googleClientSecret,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        // 這裡之後接 MongoDB
        // 第一次登入：建立 user
        // 第二次登入：更新 user 資料

        console.log('Google user:', user)
        console.log('Google profile:', profile)
      }

      return true
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.name = user.name

        if (account?.provider === 'google') {
          token.role = 'user'
        }

        if ('role' in user) {
          token.role = user.role
        }
      }

      return token
    },

    async session({ session, token }) {
      // 整理給前端的資料
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role,
        },
      }
    },
  },

  pages: {
    signIn: '/admin/login',
  },
})
