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
  IUpdateDictionaryPayload,
} from "@/types/payload";
import {
  IResponseTranslating,
  IResponseDictionaries,
  IResponseAddDictionary,
  IResponseStatus,
  IResponseDeleteDictionary,
  IResponseUpdateDictionary,
} from "@/types/response";
import { IDictionary } from "@/types/dictionary";

interface IUseDictionary {
  getDictionaries: () => Array<IDictionary>;
  getRecomendation: () => Array<string>;
  translatingProcess: (payload: ITranslatingPayload) => Promise<string>;
  loadDictionaries: () => Promise<void>;
  addDictionary: (payload: IDictionary) => Promise<IResponseStatus>;
  deleteDictionary: (
    payload: IDeleteDictionaryPayload
  ) => Promise<IResponseStatus>;
  updateDictionary: (
    payload: IUpdateDictionaryPayload
  ) => Promise<IResponseStatus>;
  getLoading: () => boolean;
}

let dictionaries = reactive<Array<IDictionary>>([]);
const loading = ref<boolean>(false);
export const useDictionary = (): IUseDictionary => {
  let translatingRecomendation = reactive<Array<string>>([]);

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
        return data.result;
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

      if (data) {
        dictionaries.push(data);
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
      const index = dictionaries.findIndex(
        (dic) => dic._id === payload.params._id
      );
      dictionaries.splice(index, 1);
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

  const updateDictionary = async (
    payload: IUpdateDictionaryPayload
  ): Promise<IResponseStatus> => {
    try {
      const reqUpdateDictionary = await updateDictionaryAPI(payload);
      const { code, message, data }: IResponseUpdateDictionary =
        await reqUpdateDictionary.data;
      if (code !== 200) {
        return {
          status: false,
          message,
        };
      }

      if (data) {
        const indexData = dictionaries.findIndex((dic) => dic._id === data._id);
        dictionaries[indexData] = data;
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

  return {
    getDictionaries: () => dictionaries,
    getRecomendation: () => translatingRecomendation,
    translatingProcess,
    loadDictionaries,
    addDictionary,
    deleteDictionary,
    updateDictionary,
    getLoading: (): boolean => loading.value,
  };
};
