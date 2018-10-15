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

## Debugging the CLI

- Temporarly add a call to `cliSort` function in `src/cli/index.ts` with a desired configuration, i.e.:

```
cliSort({
  content: '',
  dryRun: true
});
```

_Note_ - in this way, the configuration binding is being skipped, and it can't be relied on the default value. Thus, all desired configuration value have to be explicitly specified.

- Use the VSCode's `launch.json` and launch the `Launch Program` configuration

# Future

- An option to specify a path or a file(s) in which to sort imports. If no option is specified, run on all files.
  - Maybe use this: https://nodejs.org/api/path.html#path_path_isabsolute_path
  - We can maybe use one `files` argument, which can be an array of either directories or files. If it's a file, run the lib on it. If it's a directory, run the lib on the files inside it. Optionally, if `recursive` flag is up, continue to iterate through directories recursevly
