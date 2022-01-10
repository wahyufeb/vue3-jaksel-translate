import { ref } from "@vue/reactivity";
const localTheme: string = localStorage.getItem("theme") || "light";
const currentTheme = ref<string>(localTheme);

export const toggleTheme = (): void => {
  if (currentTheme.value == "dark") {
    setLightTheme();
  } else {
    setDarkTheme();
  }
};

export const getCurrentTheme = currentTheme.value;

const setLightTheme = () => {
  currentTheme.value = "light";
  localStorage.setItem("theme", "light");
};
const setDarkTheme = () => {
  currentTheme.value = "dark";
  localStorage.setItem("theme", "dark");
};
