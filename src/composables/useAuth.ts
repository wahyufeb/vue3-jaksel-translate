import { registrationAPI, loginAPI } from "@/services/auth";
import { IRegistrationPayload, ILoginPayload } from "@/types/payload";
import { IResponseLogin } from "@/types/response";

export const registrationProcess = async (
  payload: IRegistrationPayload
): Promise<void> => {
  try {
    const asd = await registrationAPI(payload);
    console.log(asd);
  } catch (error) {
    console.error(error);
  }
};

export const loginProces = async (
  payload: ILoginPayload
): Promise<IResponseLogin> => {
  const reqAuthLogin = await loginAPI(payload);
  const { data } = reqAuthLogin;
  return data;
};
