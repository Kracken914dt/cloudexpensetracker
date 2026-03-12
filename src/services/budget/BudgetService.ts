import { ApiService } from "@/services/libs/ApiService";
import type { IBudgetResponse, ICreateBudgetInput } from "@/types/budget";

export class BudgetService {
  static async getCurrent(): Promise<IBudgetResponse> {
    return ApiService.get<IBudgetResponse>("/api/budget/current");
  }

  static async create(data: ICreateBudgetInput): Promise<IBudgetResponse> {
    return ApiService.post<IBudgetResponse>("/api/budget", data);
  }

  static async update(
    id: string,
    data: Partial<ICreateBudgetInput>,
  ): Promise<IBudgetResponse> {
    return ApiService.put<IBudgetResponse>(`/api/budget/${id}`, data);
  }
}
