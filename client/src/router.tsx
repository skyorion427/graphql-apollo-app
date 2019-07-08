import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import { IntlProvider } from 'react-intl';

import { AppContext, AppContextInterface } from './AppContext';
import Home from './containers/Home';
import AppLocale from './languageProvider';
import { getBrowserLanguage } from './helpers/langHelper';

const routes = [
  {
    exact: true,
    path: '/',
    component: Home,
  },
];

export interface State {
  language: string;
}

class PublicRoutes extends React.Component<any, State> {
  state = {
    language: getBrowserLanguage(),
  };

  switchLanguage = (language: string) => {
    this.setState({
      language,
    });
  };

  render() {
    const { language } = this.state;
    const currentAppLocale = AppLocale[language];
    const contextValue: AppContextInterface = {
      language,
      switchLanguage: this.switchLanguage,
    };

    return (
      <AppContext.Provider value={contextValue}>
        <LocaleProvider locale={currentAppLocale.antd}>
          <IntlProvider
            locale={currentAppLocale.locale}
            messages={currentAppLocale.messages}
          >
            <Router>
              <div>
                {routes.map(singleRoute => {
                  const { ...props } = singleRoute;

                  return <Route key={singleRoute.path} {...props} />;
                })}
              </div>
            </Router>
          </IntlProvider>
        </LocaleProvider>
      </AppContext.Provider>
    );
  }
}

export default PublicRoutes;
