# Javascript Refractor: Sort Imports

### This extension is still in alpha.

This extension is for sorting ES6 imports for Javascript files (`.js`, `.jsx`, `.ts`, `.tsx`) using [Renke](https://github.com/renke/)'s excellent [import-sort](https://github.com/renke/import-sort/) tool. Sorting happens **in-place** and overwrites the file with sorted imports.

This extension also installs `import-sort-cli` and `import-sort-style-eslint` packages as `devDependencies` in the project.

## Installation

1. Open the file palette <kbd>Ctrl</kbd>+<kbd>P</kbd> (<kbd>Cmd</kbd>+<kbd>P</kbd> on Mac) and enter the following command,

    ```bash
    ext install developertejasjadhav.javascript-refactor--sort-imports
    ```

2. Install the required parser for your language.

    ```bash
    # Using NPM
    npm install --save-dev import-sort-parser-babylon # For Javascript
    npm install --save-dev import-sort-parser-typescript # For Typescript

    # Using Yarn
    yarn add --dev import-sort-parser-babylon # For Javascript
    yarn add --dev import-sort-parser-typescript # For Typescript
    ```

3. Create a `.importsortrc.js` file in the root of your project.
    ```javascript
    module.exports = {
      // Only for Javascript.
      '.js, .jsx': {
        parser: 'babylon',
      },

      // Only for Typescript.
      '.ts, .tsx': {
        parser: 'typescript',
      },
    }
    ```

## Usage

1.  Open the Javascript file in the editor.
2.  Open the command palette <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> and enter _Javascript Refactor: Sort Imports_.

## Change sort style

By default, the sorting happens using `import-sort-style-eslint`. You can choose any [available style on Github](https://github.com/search?q=import-sort-style-&type=Repositories&utf8=%E2%9C%93).

1.  Install the import style,

    ```bash
    # Using NPM
    npm install --save-dev import-sort-style-<your style>

    # Using Yarn
    yarn add --dev import-sort-style-<your style>
    ```

2.  Edit the `.importsortrc.js` file in your project root.
3.  Add the `style` parameter for the extensions,

    ```javascript
    module.exports = {
      '.js, .jsx, .ts, .tsx': {
        style: '<your style>'
      }
    }
    ```

# Changelog

| Version | Description                                    |
| ------- | ---------------------------------------------- |
| 0.0.1   | First alpha release.                           |
| 0.0.2   | Added support for `.tsx`.                      |
| 0.0.3   | Added support for latest `import-sort-cli`.    |
| 0.0.4   | Fixed bugs in previous release.                |
| 0.0.5   | Fixed NPM security vulnerabilities.            |
| 0.0.6   | Added "Install CLI using Yarn" option.         |
