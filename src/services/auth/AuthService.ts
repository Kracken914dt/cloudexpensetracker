import type { IAuthResponse, ILoginInput, IRegisterInput } from "@/types/auth";
import { ApiService } from "@/services/libs/ApiService";

export class AuthService {
  static async login(data: ILoginInput): Promise<IAuthResponse> {
    return ApiService.post<IAuthResponse>("/api/auth/login", data);
  }

  static async register(data: IRegisterInput): Promise<IAuthResponse> {
    return ApiService.post<IAuthResponse>("/api/auth/register", data);
  }
}
