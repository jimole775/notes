``` js
Simple = function() {
return {
init : function() {
var mainLayout = new Ext.BorderLayout(document.body, {
  north: {
    split: true, initialSize: 50
  },
  south: {
    split: true, initialSize: 50
  },
  east: {
    split: true, initialSize: 100
  },
  west: {
    split: true, initialSize: 100
  },
  center: {
  }
});
mainLayout.beginUpdate();
mainLayout.add('north', new Ext.ContentPanel('north-div', {
      fitToFrame: true, closable: false
    }));
    mainLayout.add('south', new Ext.ContentPanel('south-div', {
      fitToFrame: true, closable: false
    }));
    mainLayout.add('east', new Ext.ContentPanel('east-div', {
      fitToFrame: true, closable: false
    }));
    mainLayout.add('west', new Ext.ContentPanel('west-div', {
      fitToFrame: true, closable: false
    }));
    mainLayout.add('center', new Ext.ContentPanel('center-div', {
      fitToFrame: true
    }));
      mainLayout.endUpdate();
    }
  };
}();
Ext.EventManager.onDocumentReady(Simple.init, Simple, true);
```

批量导入出现空指针异常；