import { isProdEnvironment } from "@/shared/libs";
import { AccountRole } from "@/shared/types";
import { IronSessionOptions } from "iron-session";

declare module "iron-session" { 
  interface IronSessionData { 
    user?: { id: number, role: AccountRole }; 
  } 
} 

export const sessionConfig: IronSessionOptions = {
  cookieName: "awesome_app_auth",
  password: process.env.SESSION_PASSWORD ?? '',
  cookieOptions: {
    secure: isProdEnvironment(),
  }
}