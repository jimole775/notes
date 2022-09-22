`tsconfig.json` 主要配置一项
``` json
{
  "compilerOptions": {
    "sourceMap": true,                                /* Create source map files for emitted JavaScript files. */
  }
}
```



接下来是配置 vscode 的 `lunch.json`

``` json
{
  "type": "node",
  "request": "launch",
  "name": "ts-stock",
  "skipFiles": [
    "<node_internals>/**"
  ],
  "runtimeArgs": [
    "--nolazy",
    "-r",
    "ts-node/register"
  ],
  "sourceMaps": true,
  "cwd": "${workspaceFolder}",
  "protocol": "inspector",
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen",
  "program": "${workspaceFolder}\\src\\main.ts",
  "args":["--module=deal"]
}
```