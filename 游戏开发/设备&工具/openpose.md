Unity 支持 OpenPose 来收集动作帧。OpenPose 本身是一个开源的实时人体姿态估计系统，可以检测人体的全身关键点和身体姿势。

在 Unity 中，你可以通过 OpenPose 的输出结果来获取人体的各个部位信息，例如 关节角度、位置等，从而进一步实现动作捕捉、动画等应用。

在 Unity 中使用 OpenPose，你需要将 OpenPose 的模型文件导入到 Unity 项目中，并使用 OpenPose 的 js 版本代码进行模型推理。

你可以通过 OpenPose 的输出结果来获取人体的关键点信息，并将其保存到 Unity 中的变量中。

需要注意的是，OpenPose 的 JS 版本在浏览器中运行时可能会受到一些限制，例如网络请求的速度、GPU加速等。

因此，在使用 OpenPose 进行动作捕捉时，你可能需要优化算法或者选择更适合的解决方案。