# issues
- Warning: You cannot set a form field before rendering a field associated with the value.
出现原因：
1. 使用setFieldsValue(), 但是传入的值多出form表单定义的值
2. 只使用v-decorator声明form属性的时候，setFieldValue()在mounted之前执行了
