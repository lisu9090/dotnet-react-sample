import { DefaultSession } from 'next-auth';
import { AccountRole } from './account/AccountRole';

declare module 'next-auth' {
  interface User {
    id: number;
    role: AccountRole;
  }

  interface Session extends DefaultSession {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: number;
    role: AccountRole;
  }
}