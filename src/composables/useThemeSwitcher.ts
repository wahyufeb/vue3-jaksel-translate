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

export const getCurrentTheme = (): string => currentTheme.value;

const setLightTheme = () => {
  currentTheme.value = "light";
  localStorage.setItem("theme", "light");
  document.documentElement.classList.remove("dark");
};
const setDarkTheme = () => {
  currentTheme.value = "dark";
  localStorage.setItem("theme", "dark");
  document.documentElement.classList.add("dark");
};
