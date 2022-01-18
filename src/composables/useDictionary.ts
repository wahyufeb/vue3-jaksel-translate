import { reactive, ref } from "vue";
import {
  translatingAPI,
  loadDictionariesAPI,
  addDictionaryAPI,
  deleteDictionaryAPI,
  updateDictionaryAPI,
} from "@/services/dictionary";
import {
  ITranslatingPayload,
  IAddDictionaryPayload,
  IDeleteDictionaryPayload,
} from "@/types/payload";
import {
  IResponseTranslating,
  IResponseDictionaries,
  IResponseAddDictionary,
  IResponseStatus,
  IResponseDeleteDictionary,
} from "@/types/response";
import { IDictionary } from "@/types/dictionary";

interface IUseDictionary {
  getRecomendation: () => Array<string>;
  getDictionaries: () => Array<IDictionary>;
  translatingProcess: (payload: ITranslatingPayload) => Promise<string>;
  loadDictionaries: () => Promise<void>;
  addDictionary: (payload: IDictionary) => Promise<IResponseStatus>;
  deleteDictionary: (
    payload: IDeleteDictionaryPayload
  ) => Promise<IResponseStatus>;
}

export const useDictionary = (): IUseDictionary => {
  let translatingRecomendation = reactive<Array<string>>([]);
  let dictionaries = reactive<Array<IDictionary>>([]);

  const translatingProcess = async (
    payloadData: ITranslatingPayload
  ): Promise<string> => {
    try {
      const reqTranslating = await translatingAPI(payloadData);
      const { data }: IResponseTranslating = await reqTranslating.data;

      if (data !== null) {
        translatingRecomendation = data.resultRecomendation
          ? data.resultRecomendation.map((item) => {
              return item[payloadData.payload];
            })
          : [];

        return data.result
          ? data.result[payloadData.payload === "jaksel" ? "artinya" : "jaksel"]
          : "";
      } else {
        return "";
      }
    } catch (error) {
      translatingRecomendation = [];
      return payloadData.params.search;
    }
  };

  const loadDictionaries = async (): Promise<void> => {
    try {
      const reqTranslating = await loadDictionariesAPI();
      const { data }: IResponseDictionaries = await reqTranslating.data;

      if (data !== null) {
        data.forEach((item) => {
          dictionaries.push(item);
        });
      }
    } catch (error) {
      dictionaries = [];
    }
  };

  const addDictionary = async (
    payload: IAddDictionaryPayload
  ): Promise<IResponseStatus> => {
    try {
      const reqAddDictionary = await addDictionaryAPI(payload);
      const { code, message, data }: IResponseAddDictionary =
        await reqAddDictionary.data;
      if (code !== 201) {
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
        message: Array.isArray(data.errors)
          ? data.errors.map((item: any) => item.msg).join(", ")
          : data.message,
      };
    }
  };

  const deleteDictionary = async (
    payload: IDeleteDictionaryPayload
  ): Promise<IResponseStatus> => {
    try {
      const reqDeleteDictionary = await deleteDictionaryAPI(payload);
      const { code, message }: IResponseDeleteDictionary =
        await reqDeleteDictionary.data;
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
      return {
        status: false,
        message: error.message,
      };
    }
  };

  return {
    getRecomendation: () => translatingRecomendation,
    getDictionaries: () => dictionaries,
    translatingProcess,
    loadDictionaries,
    addDictionary,
    deleteDictionary,
  };
};
