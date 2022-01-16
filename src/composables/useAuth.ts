import { registrationAPI, loginAPI, profileAPI } from "@/services/auth";
import { IRegistrationPayload, ILoginPayload } from "@/types/payload";
import { IResponseLogin, IResponseStatus } from "@/types/response";
import { setAxiosHeaders, encryptCrypto } from "@/services/generic";
import { IAxiosHeaders } from "@/types/axiosHeader";
import Cookies from "js-cookie";

interface IUseAuth {
  registrationProcess: (
    payload: IRegistrationPayload
  ) => Promise<IResponseStatus>;
  loginProcess: (payload: ILoginPayload) => Promise<IResponseStatus>;
  myProfile: () => Promise<IResponseStatus>;
}

export const useAuth = (): IUseAuth => {
  const registrationProcess = async (
    payload: IRegistrationPayload
  ): Promise<IResponseStatus> => {
    try {
      const asd = await registrationAPI(payload);
      console.log(asd);
      return {
        status: true,
        message: "Success",
      };
    } catch (error) {
      return {
        status: false,
        message: "Failed",
      };
    }
  };

  const loginProcess = async (
    payload: ILoginPayload
  ): Promise<IResponseStatus> => {
    try {
      const reqAuthLogin = await loginAPI(payload);
      const { data: responseData } = reqAuthLogin;
      const { code, message, data }: IResponseLogin = responseData;
      if (code !== 200) {
        return {
          status: false,
          message,
        };
      }

      if (data) {
        const headers: IAxiosHeaders = [
          { name: "Authorization", value: `Bearer ${data.token}` },
        ];
        setAxiosHeaders(headers);
        Cookies.set("token", encryptCrypto(data.token), {
          expires: 1,
          secure: true,
        });
      }
      return {
        status: true,
        message,
      };
    } catch (error: any) {
      const { data } = error.response;
      return {
        status: false,
        message: data.message,
      };
    }
  };

  const myProfile = async (): Promise<IResponseStatus> => {
    try {
      const reqProfile = await profileAPI();
      const { data: responseData } = reqProfile;
      const { code, message }: IResponseLogin = responseData;
      if (code !== 200) {
        return {
          status: false,
          message,
        };
      }
      return {
        status: true,
        message,
      };
    } catch (error: any) {
      const { data } = error.response;
      return {
        status: false,
        message: data.message,
      };
    }
  };

  return {
    registrationProcess,
    loginProcess,
    myProfile,
  };
};
