import { IAdmin } from "./admin";
export interface StandardResponse<T> {
  code: number;
  message: string;
  data: T | null;
}

export type IResponseLogin = StandardResponse<{ user: IAdmin; token: string }>;
