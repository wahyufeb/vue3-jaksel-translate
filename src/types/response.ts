import { IAdmin } from "./admin";
import { IDictionary } from "./dictionary";

export interface StandardResponse<T> {
  code: number;
  message: string;
  data: T | null;
}

export interface IResponseStatus {
  status: boolean;
  message: string;
}

export type IResponseLogin = StandardResponse<{ user: IAdmin; token: string }>;

export type IResponseTranslating = StandardResponse<{
  result: IDictionary;
  resultRecomendation: Array<IDictionary>;
}>;

export type IResponseDictionaries = StandardResponse<Array<IDictionary>>;

export type IResponseAddDictionary = StandardResponse<IDictionary>;

export type IResponseDeleteDictionary = StandardResponse<{
  deleteCount: number;
}>;
