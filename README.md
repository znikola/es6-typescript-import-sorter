TODO:

# Ts config json

- Should we include `dom` in `lib`?

# Docs

- write a dev guide how to develop:

* `yarn install`
* `yarn watch` (will block one terminal tab)
* whenever you make a change, it will automatically be picked up by `tsc`
* Quick and dirty way to run cli version: `./node_modules/.bin/ts-node ./bin/index.js`
* `yarn build:prod` for a production build

# Future

- An option to specify a path or a file(s) in which to sort imports. If no option is specified, run on all files.
  - Maybe use this: https://nodejs.org/api/path.html#path_path_isabsolute_path
  - We can maybe use one `files` argument, which can be an array of either directories or files. If it's a file, run the lib on it. If it's a directory, run the lib on the files inside it. Optionally, if `recursive` flag is up, continue to iterate through directories recursevly
