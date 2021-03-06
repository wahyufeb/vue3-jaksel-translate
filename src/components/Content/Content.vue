<script setup lang="ts">
import { useDictionary } from "@/composables/useDictionary";
import { getCurrentTheme } from "@/composables/useThemeSwitcher";
import { ITranslatingPayload } from "@/types/payload";
import { ref, watch, reactive } from "vue";
import debounce from "@/utils/debounce";

const dictionary = useDictionary();
let recomendations = reactive<{ list: Array<string> }>({ list: [] });

const fromInputRef = ref<any>(null);

const fromInput = ref<string>("");
const toInput = ref<string>("Terjemahan");

const from = ref<"jaksel" | "artinya">("jaksel");
const to = ref<"jaksel" | "artinya">("artinya");

const handleSwitch = () => {
  const temp = from.value;
  from.value = to.value;
  to.value = temp;

  const tempInput = fromInput.value;
  fromInput.value = toInput.value === "Terjemahan" ? "" : toInput.value;
  toInput.value = tempInput === "" ? "Terjemahan" : tempInput;
};

const handleClickRecomendation = (word: string) => {
  const splitWord = fromInput.value.split(" ");
  splitWord[splitWord.length - 1] = word;
  fromInput.value = splitWord.join(" ");
  recomendations.list = [];
  fromInputRef.value.focus();
  translating();
};

const translating = async (): Promise<void> => {
  toInput.value = "Menerjemahkan...";
  if (fromInput.value === "") {
    toInput.value = "Terjemahan";
    recomendations.list = [];
    return;
  }

  const payloadData: ITranslatingPayload = {
    params: {
      search: fromInput.value,
    },
    payload: from.value,
  };
  toInput.value = await dictionary.translatingProcess(payloadData);
  toInput.value = toInput.value
    .split("")
    .map((char) => char.replace("_", " "))
    .join("");
  recomendations.list = dictionary.getRecomendation();
};
</script>

<template>
  <div class="w-screen flex justify-center items-center p-8 xs:mt-10 md:mt-40">
    <div
      class="xs:w-full md:w-8/12 bg-white dark:bg-secondary-dark rounded-md shadow-xl"
    >
      <div
        class="flex justify-evenly py-2 mb-4"
        :class="getCurrentTheme() === 'dark' ? 'options-dark' : 'options'"
      >
        <div class="uppercase text-primary-dark dark:text-primary-light">
          {{ from }}
        </div>
        <button class="rounded-full p-1" @click="handleSwitch">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            :stroke="getCurrentTheme() === 'dark' ? 'white' : 'black'"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
        </button>
        <div class="uppercase text-primary-dark dark:text-primary-light">
          {{ to }}
        </div>
      </div>
      <div
        class="py-4 px-6 flex xs:flex-col md:flex-row justify-between gap-10"
      >
        <div
          class="relative xs:w-full md:w-6/12 dark:bg-ternary-dark dark:text-ternary-light bg-ternary-light text-ternary-dark rounded-md text-2xl resize-none mb-2"
        >
          <textarea
            ref="fromInputRef"
            rows="5"
            class="xs:w-full md:w-12/12 dark:bg-ternary-dark dark:text-ternary-light bg-ternary-light text-ternary-dark p-2 rounded-md text-2xl resize-none"
            v-model="fromInput"
            @input="translating"
          >
          </textarea>
          <div
            v-if="recomendations.list.length > 0"
            class="absolute left-0 bottom-0 w-full flex flex-wrap text-sm gap-2 text-center dark:text-ternary-light text-ternary-dark p-2"
          >
            <div
              v-for="(dic, index) in recomendations.list"
              :key="index"
              class="px-4 py-2 bg-gray-200 rounded-md dark:bg-primary-dark cursor-pointer"
              @click="handleClickRecomendation(dic)"
            >
              {{ dic }}
            </div>
          </div>
        </div>
        <textarea
          rows="5"
          class="xs:w-full md:w-6/12 dark:bg-ternary-dark dark:text-ternary-light bg-ternary-light text-ternary-dark p-2 rounded-md text-2xl resize-none mb-2"
          v-model="toInput"
          :disabled="true"
        >
        </textarea>
      </div>
      <div
        class="px-6 -mt-2 mb-4 text-red-600 dark:text-red-400 text-sm font-light"
      >
        *Gunakan tanda "&nbsp;<strong>_</strong>&nbsp;" untuk menyambungkan kata
        yang memiliki 1 arti. contoh : <strong>which_is</strong>
      </div>
    </div>
  </div>
</template>

<style scoped>
.options-dark {
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.6);
}

.options {
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.3);
}
</style>
