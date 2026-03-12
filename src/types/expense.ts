export interface IExpense {
  _id: string;
  user: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  createdAt: string;
}

export interface ICreateExpenseInput {
  amount: number;
  category: string;
  description: string;
  date: string; // ISO string YYYY-MM-DD
}

export interface IUpdateExpenseInput extends Partial<ICreateExpenseInput> {}

export interface ICategoryTotal {
  category: string;
  total: number;
}

export interface IDashboardData {
  monthlyTotal: number;
  byCategory: ICategoryTotal[];
}
