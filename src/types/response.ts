import { IAdmin } from "./admin";
import { IDictionary } from "./dictionary";
export interface StandardResponse<T> {
  code: number;
  message: string;
  data: T | null;
}

export type IResponseLogin = StandardResponse<{ user: IAdmin; token: string }>;

export type IResponseTranslating = StandardResponse<{
  result: IDictionary;
  resultRecomendation: Array<IDictionary>;
}>;
