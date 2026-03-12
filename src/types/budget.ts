export interface IBudget {
  _id: string;
  user: string;
  month: number;
  year: number;
  amount: number;
}

export interface IBudgetResponse {
  budget: IBudget;
  spent: number;
  remaining: number;
  percentageUsed: number;
  exceeded: boolean;
}

export interface ICreateBudgetInput {
  amount: number;
  month: number;
  year: number;
}
