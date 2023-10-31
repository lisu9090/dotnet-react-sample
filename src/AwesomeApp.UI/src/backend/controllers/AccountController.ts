import { NextApiRequest, NextApiResponse } from "next";
import { CreateAccountDto } from "../dtos";
import { CustomerType } from "@/shared";

class AccountController {
  async createAccount(req: NextApiRequest, res: NextApiResponse<CreateAccountDto>) {
    res.json({
      email: "test@test.com",
      password: "Test",
      fullName: "Test Test",
      dateOfBirth: new Date(),
      vechiclesNumber: 0,
      customerType: CustomerType.private
    })
  } 
}

export const accountController = new AccountController()