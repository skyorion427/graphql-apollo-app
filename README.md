# Employee bank account list management App

Employee bank account list management webapp built with React / Apollo GraphQL

- React App: https://react-app.behindbit.com
- Graphql Explorer: https://react-app.behindbit.com/graphql

## Project Setup

### Project stack:

- Create-React-App
- React Typescript
- Apollo GraphQL (Server / Client)
- MongoDB
- CircleCI (CI/CD)
- Amazon Web Services

### Prerequisites

```
node v8^
npm
yarn
```

### Install and Run in Local

Note: Use `yarn` rather than `npm`

Install dependencies

```
yarn install:server
yarn install:client
```

```
yarn dev
yarn client:dev
yarn storybook
```

### Add `.env` file

Refer `.envrc` file for local environment

```
MONGO_URI = mongodb://***
MONGO_DEV_URI = mongodb://***
MONGO_TEST_URI = mongodb://***
```

### npm scripts

- `yarn start` - run server in production mode
- `yarn dev` - run server in development mode
- `yarn run:test-server` - run server for test
- `yarn test:server` - test server
- `yarn test:client` - test client
- `yarn install:server` - install server dependencies
- `yarn install:client` - install client dependencies
- `yarn client:build` - build client react app
- `yarn client:dev` - run client app in development mode
- `yarn storybook` - run storybook for react app
- `yarn build-storybook` - build storybook for react app

## Running unit tests

- Unit test with jest/enzyme, mocha/chai

```
yarn test:server
yarn test:client
```

## Storybook for component build

```
yarn storybook
```

## Internationalization

- React-Intl

## Functionalities

- Create
- Edit
- Delete
- Search
- Filter in Range
- Sort

## Code standard

- [React Airbnb code standard](https://github.com/airbnb/javascript/tree/master/react)
- [Prettier](https://prettier.io/)

## Built With

- [React](https://reactjs.org) - React.JS
- [Apollo GraphQL](https://www.apollographql.com/) - Apollo GraphQL
- [Ant Design](https://ant.design/) - Ant Design UI Framework

## Authors


## License

MIT
