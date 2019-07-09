import React from 'react';
import { Radio } from 'antd';

import { withAppContext, AppContextInterface } from '../../AppContext';
import config from './config';

const LanguageSwitcher = ({
  appContext,
}: {
  appContext: AppContextInterface;
}) => {
  const { language, switchLanguage } = appContext;

  return (
    <div className="language-switcher">
      <Radio.Group defaultValue={language} buttonStyle="solid">
        {config.options.map(option => {
          const { languageId, locale, text } = option;

          return (
            <Radio.Button
              value={locale}
              onClick={() => switchLanguage(locale)}
              key={languageId}
            >
              {text}
            </Radio.Button>
          );
        })}
      </Radio.Group>
    </div>
  );
};

export default withAppContext(LanguageSwitcher);
