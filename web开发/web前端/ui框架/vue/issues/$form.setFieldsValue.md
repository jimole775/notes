## Warning: You cannot set a form field before rendering a field associated with the value.

- 出现这个问题的原因：

因为template的视图没有渲染，就调用了 `setFieldsValue` 方法，

- 解决：

在mounted里面使用，如果在mounted里面还是出现这个提示

那很大可能是在 `form-item` 上使用了 v-if，导致在 setFieldsValue 的时候，视图是被剔除的，即使你的预期 `v-if="true"`

所以，我们统一的解决方案就是： 在 `mounted` 函数中使用 `$nextTick` 方法
