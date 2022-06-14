# - Martian Robots -
(code challenge can be found in the /public directory)

From what I could gauge from the challenge description, these are some important constraints:
- unspecified number of robots (I will limit to 50 for this challenge)
- random initial starting point for each robot
- max grid dimensions: 50
- max robot instructions: 100

This is the first time I was trying out using a simplistic store instead of using Pinea and found it to be just fine for what was needed, apart from being unable to debug and monitor the store using the vue dev tools.

**NOTE:** I added the ability to rerun the mission, but found some bugs with persisting data (The same outcome would be displayed in the same row every single time in some cases). But as this wasn't part for the requirements, I didn't spend any longer to investigate the bug as I had already spent more than the average time on the challenge in general. But I wondered if it had something to do with the simple store I was using not updating the data properly.

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
