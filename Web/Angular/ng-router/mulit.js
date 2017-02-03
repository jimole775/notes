/**
 * Created by Andy on 2017/2/3.
 */
<div ng-app="Demo" ng-controller="testCtrl as ctrl">
<ol>
<li><a ui-sref="app.page1">app</a></li>
<li><a ui-sref="test.page1({id:1})">test</a></li>
</ol>
<div ui-view></div>
<script type="text/ng-template" id="'layout.html'">
<div ui-view="nav@"></div>
<div ui-view></div>
</script>
<script type="text/ng-template" id="'nav1.html'">
<ol>
<li><a ui-sref="app.page1">app.page1</a></li>
<li><a ui-sref="app.page2">app.page2</a></li
</ol>
</script>
<script type="text/ng-template" id="'nav2.html'">
<ol>
<li><a ui-sref="test.page1({id:1})">test.page1</a></li>
<li><a ui-sref="test.page2">test.page2</a></li
</ol>
</script>
<script type="text/ng-template" id="'page1.html'">
this is page 1 for app.
                   </script>
                   <script type="text/ng-template" id="'page2.html'">
this is page 2 for app.
                   </script>
                   <script type="text/ng-template" id="'page3.html'">
this is page 1 for test.
                   </script>
                   <script type="text/ng-template" id="'page4.html'">
this is page 2 for test.
                   </script>
                   </div>