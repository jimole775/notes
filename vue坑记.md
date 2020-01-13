a-table的宽度处理
当需要“动态展示列”和“固定列”同时加载到一个table的时候，需要添加scroll属性，并且深度监听column对象，实时调整scroll的值，并把scroll绑定到:style属性上（width='scroll.x' maxWidth='100%'）
如果不那么做，就会出现空白间隙

