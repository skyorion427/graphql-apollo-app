import React from 'react';
import { getBrowserLanguage } from './helpers/langHelper';

export interface AppContextInterface {
  language: string;
  switchLanguage: (lang: string) => void;
}

export const AppContext = React.createContext<AppContextInterface>({
  language: getBrowserLanguage(),
  switchLanguage: () => {},
});

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function withAppContext<
  P extends { appContext?: AppContextInterface },
  R = Omit<P, 'appContext'>
>(
  Component: React.ComponentType<P>,
): React.FC<R> {
  return function BoundComponent(props) {
    return (
      <AppContext.Consumer>
        {value => <Component {...props as unknown as P} appContext={value} />}
      </AppContext.Consumer>
    );
  };
}
