// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// createFileSystemWatcher
// FileChangeType
// writeFile
// onDidCreate !!!

const getTsxFileString = (
  componentName: string
) => `import * as React from "react";

type Props = {}

export const ${componentName}: React.FunctionComponent<Props> = () => {
	return null
}
`;

function str2ab(str: string) {
  var buf = new ArrayBuffer(str.length); // 2 bytes for each char
  var bufView = new Uint8Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return bufView;
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let fileSystemWatcher = vscode.workspace.createFileSystemWatcher("**");

  context.subscriptions.push(
    fileSystemWatcher.onDidCreate(fileUri => {
      const fileName = fileUri
        .toString()
        .split("/")
        .pop()!;

      const [componentName, extension] = fileName.toString().split(".");
      const isTsx = extension === "tsx";

      if (isTsx === false) {
        return;
      }

      const fileString = getTsxFileString(componentName);

      const content = str2ab(fileString);

      vscode.workspace.fs.writeFile(fileUri, content);
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
