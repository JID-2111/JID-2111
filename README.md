# 🚀 Developing

## Pre requisites

- Node Install: [Bundled](https://nodejs.org/en/download/), [Homebrew](https://formulae.brew.sh/formula/node)
- [ODBC Binaries](https://www.npmjs.com/package/odbc)
  - Setup [Guide](https://exploratory.io/note/exploratory/How-to-set-up-ODBC-in-Mac-unixodbc-lQz2Fnp7)
  - [Postgres ODBC Driver](https://formulae.brew.sh/formula/psqlodbc)

### VS Code Extensions

> Recommended extensions to use in VS Code

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) typescript formatting
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) Linting

_You can also just type @recommended in the extensions search bar_

[Husky](https://www.npmjs.com/package/husky) and [lint-staged](https://github.com/okonet/lint-staged) are enabled in this repo which means that prior to each commit, your code is checked for issues

## Starting Development

Install the necessary packages

```
npm install
```

Start the app

```
npm run start
```

Adding more modules

See documentation [here](https://electron-react-boilerplate.js.org/docs/adding-dependencies)

## Packaging for Production

To package apps for the local platform:

```
npm run package
```

## Linting

> Making sure that code is written well and neatly

<br>

- `npm run lint` - runs ESLint and reports all linting errors without fixing them
- `npm run lint:fix` - runs ESLint and reports all linting errors, attempting to fix any auto-fixable ones
- `npm run format` - runs Prettier and automatically formats the entire codebase
- `npm run format:check` - runs Prettier and reports formatting errors without fixing them

## Docs

See boilerplate [docs and guides here](https://electron-react-boilerplate.js.org/docs/installation)

## License

MIT © [Electron React Boilerplate](https://github.com/electron-react-boilerplate)
