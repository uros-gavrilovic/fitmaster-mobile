// Used to avoid dynamic imports.
const availableTranslations = {
  fitmaster_en: require("./fitmaster_en"),
  fitmaster_sr: require("./fitmaster_sr"),
};

export function loadTranslation(translationName) {
  return availableTranslations[translationName].translation;
}
