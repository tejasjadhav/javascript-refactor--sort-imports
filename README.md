# Javascript Refractor: Sort Imports

### This extension is still in alpha.

This extension is for sorting ES6 imports for Javascript files (`.js`, `.jsx`, `.ts`, `.tsx`) using [Renke](https://github.com/renke/)'s excellent [import-sort](https://github.com/renke/import-sort/) tool. Sorting happens **in-place** and overwrites the file with sorted imports.

This extension also installs `import-sort-cli`, `import-sort-style-eslint` and `import-sort-parser-babylon` packages as `devDependencies` in the project.

## Usage

1.  Open the Javascript file in the editor.
2.  Open the command palette <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> and enter _Javascript Refactor: Sort Imports_.

## Change sort style

By default, the sorting happens using `import-sort-style-eslint`. You can choose any [available style on Github](https://github.com/search?q=import-sort-style-&type=Repositories&utf8=%E2%9C%93).

1.  Install the import style,

```bash
yarn add -D import-sort-style-<your style>
```

2.  Create an `.importsortrc` file in your project root.
3.  Add the following lines in `.importsortrc` file,

```json
{
  ".js, .jsx, .ts, .tsx": {
    "style": "<your style>"
  }
}
```

# Changelog

| Version | Description               |
| ------- | ------------------------- |
| 0.0.1   | First alpha release.      |
| 0.0.2   | Added support for `.tsx`. |
