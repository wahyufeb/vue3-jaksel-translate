import { IAdmin } from "./admin";
import { IDictionary } from "./dictionary";

export type IRegistrationPayload = IAdmin;

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ITranslatingPayload {
  params: {
    search: string;
  };
  payload: "jaksel" | "artinya";
}

export type IAddDictionaryPayload = IDictionary;

export interface IUpdateDictionaryPayload {
  params: {
    _id: string;
  };
  payload: IDictionary;
}

export interface IDeleteDictionaryPayload {
  params: {
    _id: string | undefined;
  };
}
