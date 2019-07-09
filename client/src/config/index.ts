const PRODUCTION_GRAPHQL_URI = 'https://react-app.behindbit.com/graphql';
const LOCAL_GRAPHQL_URI = 'http://192.168.1.128:8000/graphql';

export const GRAPHQL_URI =
  process.env.REACT_APP_ENV === 'production'
    ? PRODUCTION_GRAPHQL_URI
    : LOCAL_GRAPHQL_URI;
