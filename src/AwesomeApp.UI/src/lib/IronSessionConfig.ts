import { IronSessionOptions } from "iron-session";

declare module "iron-session" { 
  interface IronSessionData { 
    user?: { id: number, role: number }; 
  } 
} 

export const sessionConfig: IronSessionOptions = {
  cookieName: "awesome_app_auth",
  password: process.env.SESSION_PASSWORD ?? '',
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  }
}