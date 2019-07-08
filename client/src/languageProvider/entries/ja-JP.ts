import appLocaleData from 'react-intl/locale-data/ja';
import jaMessages from '../locales/ja-JP.json';
import { LanguageEntryType } from '../index';

const JALan: LanguageEntryType = {
  messages: {
    ...jaMessages,
  },
  antd: null,
  locale: 'ja-JP',
  data: appLocaleData,
};

export default JALan;
