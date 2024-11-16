export type Language = 'en' | 'ru';

interface Translation {
  en: string;
  ru: string;
}

export const STRINGS = {
  mainPage: {
    title: {
      en: "Welcome to the main page",
      ru: "Добро пожаловать на главную страницу",
    },
  },
  errors: {
    network: {
      en: "Network error. Please try again later.",
      ru: "Ошибка сети. Пожалуйста, попробуйте позже.",
    },
    requiredField: {
      en: "This field is required.",
      ru: "Это поле обязательно для заполнения.",
    },
  },
  buttons: {
    submit: {
      en: "Submit",
      ru: "Отправить",
    },
    cancel: {
      en: "Cancel",
      ru: "Отмена",
    },
  },
} as const;

