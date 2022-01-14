import { registrationAPI, loginAPI } from "@/services/auth";
import { IRegistrationPayload, ILoginPayload } from "@/types/payload";
import { IResponseLogin } from "@/types/response";

interface IUseAuth {
  registrationProcess: (payload: IRegistrationPayload) => Promise<void>;
  loginProcess: (payload: ILoginPayload) => Promise<IResponseLogin>;
}

export const useAuth = (): IUseAuth => {
  const registrationProcess = async (
    payload: IRegistrationPayload
  ): Promise<void> => {
    try {
      const asd = await registrationAPI(payload);
      console.log(asd);
    } catch (error) {
      console.error(error);
    }
  };

  const loginProcess = async (
    payload: ILoginPayload
  ): Promise<IResponseLogin> => {
    const reqAuthLogin = await loginAPI(payload);
    const { data } = reqAuthLogin;
    return data;
  };

  return {
    registrationProcess,
    loginProcess,
  };
};
