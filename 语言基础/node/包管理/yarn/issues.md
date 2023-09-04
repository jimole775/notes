# yarn : 无法加载文件 C:\Users\Administrator\AppData\Roaming\npm\yarn.ps1，因为在此系统上禁止运行脚本
- **背景**：

系统问题，我出现的是win11，powershell 的权限问题

- **解决**:
用 管理员权限运行 powershell，然后 输入 `set-ExecutionPolicy RemoteSigned`，然后选 Y，即可解决
