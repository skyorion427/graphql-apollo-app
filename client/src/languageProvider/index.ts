import { addLocaleData } from 'react-intl';
import Enlang from './entries/en-US';
import JAlang from './entries/ja-JP';

export type LanguageEntryType = {
  messages: object,
  antd: any,
  locale: string,
  data: any,
};

const AppLocale: { [key: string]: LanguageEntryType } = {
  en: Enlang,
  ja: JAlang,
};

addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.ja.data);

export default AppLocale;
