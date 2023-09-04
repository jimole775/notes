主要还是因为pubspac.yaml配置不正确
```
flutter: # 必须是顶层，和dependencies同级
  assets:
    - images/xxxx.png # images 目录必须是在根目录
```
