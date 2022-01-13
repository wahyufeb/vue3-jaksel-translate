import { IAdmin } from "./admin";

export type IRegistrationPayload = IAdmin;

export interface ILoginPayload {
  email: string;
  password: string;
}
