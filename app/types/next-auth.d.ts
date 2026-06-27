import type { DefaultSession, DefaultUser } from 'next-auth'
import 'next-auth'

type Role = 'admin' | 'normal'

declare module 'next-auth' {
  interface User extends DefaultUser {
    role: Role
  }

  interface Session extends DefaultSession {
    user: DefaultSession['user'] & {
      role: Role
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: Role
  }
}
