# - Martian Robots -
(code challenge can be found in the /public directory)
From what I could gauge from the challenge description, these are some important constraints:
- unspecified number of robots (I will limit to 50 for this challenge)
- random initial starting point for each robot
- max grid dimensions: 50
- max robot instructions: 100

This is the first time I was trying out using a simplistic store instead of using Pinea and found it to fine, apart from being unable to debug and monitor the store using the vue dev tools.

## Project Setup
I'm using NVM for Node version management and Yarn for my package manager. Feel free to use NPM if it's easier for you. Just replace `yarn` with `npm run` for each of the available scripts.

```sh
nvm install
```

```sh
yarn install
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```
```sh
yarn coverage
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```
