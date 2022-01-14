import { translatingAPI } from "@/services/dictionary";
import { ITranslatingPayload } from "@/types/payload";
import { IResponseTranslating } from "@/types/response";
import { reactive } from "vue";

interface IUseDictionary {
  recomendation: () => Array<string>;
  translatingProcess: (payload: ITranslatingPayload) => Promise<string>;
}

let translatingRecomendation = reactive<Array<string>>([]);

export const useDictionary = (): IUseDictionary => {
  const recomendation = () => {
    return translatingRecomendation;
  };
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

  return {
    recomendation,
    translatingProcess,
  };
};
