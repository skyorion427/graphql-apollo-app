export const getBrowserLanguage = () => {
  const { language = '' } = navigator || {};

  return language.slice(0, 2);
};
