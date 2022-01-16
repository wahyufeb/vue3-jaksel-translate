import { translatingAPI, loadDictionariesAPI } from "@/services/dictionary";
import { ITranslatingPayload } from "@/types/payload";
import { IResponseTranslating } from "@/types/response";
import { reactive, ref } from "vue";
import { IDictionary } from "@/types/dictionary";
import { IResponseDictionaries } from "@/types/response";

interface IUseDictionary {
  getRecomendation: () => Array<string>;
  getDictionaries: Array<IDictionary>;
  translatingProcess: (payload: ITranslatingPayload) => Promise<string>;
  loadDictionaries: () => Promise<void>;
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

  return {
    getRecomendation: () => translatingRecomendation,
    getDictionaries: dictionaries,
    loadDictionaries,
    translatingProcess,
  };
};
