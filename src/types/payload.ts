import { IAdmin } from "./admin";

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
