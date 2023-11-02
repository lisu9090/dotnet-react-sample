import { AxiosInstance } from "axios";
import { CreateAccountDto } from "../dtos";

export class AwesomeApiService {
  constructor(private readonly axiosClient: AxiosInstance) {

  }

  public getAccount(id: number): Promise<CreateAccountDto> {

  }
}