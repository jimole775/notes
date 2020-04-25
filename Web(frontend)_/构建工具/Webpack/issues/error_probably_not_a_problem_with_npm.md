``` bash
events.js:167
      throw er; // Unhandled 'error' event
      ^
npm ERR! app-platform@1.0.0 build: `node build/build.js`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the app-platform@1.0.0 build script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     D:\Program Files\nodejs\node_cache\_logs\2019-11-03T16_20_22_829Z-debug.log
```

这种情况一般是各个插件和库的版本之间的依赖问题

只能一个一个排查
