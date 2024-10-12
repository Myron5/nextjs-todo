import { TypeBages } from "@/lib/constants/default";

export interface IBackendTodoParams {
  bage: TypeBages;
  search?: string;
  limit?: number;
  page?: number;
}
