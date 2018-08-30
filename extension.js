const fs = require('fs');
const path = require('path');
const vscode = require('vscode');
const { execFile } = require('child_process');

/**
 * Installs import-sort-cli, import-sort-style-eslint and import-sort-parser-babylon using VSCode's
 * integrated terminal.
 */
function installImportSortCli() {
  const terminal = vscode.window.createTerminal('Install import-sort-cli');

  terminal.show();
  terminal.sendText(
    'npm install --save-dev import-sort-cli import-sort-parser-babylon import-sort-style-eslint'
  );
}

/**
 * Performs an in-place import sort of the current active Javascript file in the editor. If there
 * is no active editor, or a non-JS file, nothing happens. Currently supported file extensions are,
 * .js, .jsx, .ts.
 *
 * @param {string} cliPath Complete path for import-sort CLI executable.
 */
function sortImports(workspacePath, cliPath) {
  const textEditor = vscode.window.activeTextEditor;

  // No active editors open. Do nothing.
  if (!textEditor) {
    return;
  }

  const document = textEditor.document;
  const fileExtension = path.extname(document.fileName);

  // Sort imports only for Javascript files.
  if (
    fileExtension === '.js' ||
    fileExtension === '.jsx' ||
    fileExtension === '.ts' ||
    fileExtension === '.tsx'
  ) {
    execFile(
      cliPath, [document.fileName, ' --write'],
      { cwd: workspacePath },
      (err, stdout, stderr) => {
        let errorMessage = '';

        if (err) {
          errorMessage = err.toString();
        }

        if (stderr) {
          errorMessage = stderr.toString();
        }

        if (errorMessage.length > 0) {
          vscode.window.showErrorMessage(
            'Could not sort imports: ' + errorMessage
          );
          return;
        }
      }
    );
  }
}

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    'extension.sortImports',
    function() {
      const workspaceFolders = vscode.workspace.workspaceFolders;

      if (!workspaceFolders) {
        console.warn(
          'Workspace folder is undefined. Assuming no open directories in editor.'
        );
        vscode.window.showWarningMessage('You need to have a workspace open');
        return;
      }

      const currentWorkspaceFolder = workspaceFolders[0];
      const workspacePath = currentWorkspaceFolder.uri.fsPath;
      const cliPath = path.join(workspacePath, 'node_modules/.bin/import-sort');

      try {
        fs.accessSync(cliPath);
        sortImports(workspacePath, cliPath);
      } catch (err) {
        console.warn(
          '`import-sort` executable not found in `node_modules` in current workspace.'
        );
        vscode.window
          .showInformationMessage('import-sort CLI not found', 'Install CLI')
          .then(action => {
            if (action === 'Install CLI') {
              installImportSortCli();
            }
          });
      }
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}

exports.deactivate = deactivate;
