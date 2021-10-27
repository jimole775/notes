> AspectJ 允许使用注解定义`切面`、`切入点`和`增强处理`，Spring 框架可以根据这些注解生成 `AOP 代理`

|名称|说明|
|-|-|
|`@Aspect`|定义一个切面|
|`@Pointcut`|用于定义一个切入点。|
|`@Before`|用于定义前置通知，相当于 BeforeAdvice。|
|`@AfterReturning`|用于定义后置通知，相当于 AfterReturningAdvice。|
|`@Around`|用于定义环绕通知，相当于MethodInterceptor。|
|`@AfterThrowing`|用于定义抛出通知，相当于ThrowAdvice。|
|`@After`|用于定义最终final通知，不管是否异常，该通知都会执行。|
|`@DeclareParents`|用于定义引介通知，相当于IntroductionInterceptor（不要求掌握）。|

### 样例
``` java
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.aspectj.lang.reflect.MethodSignature;
import java.lang.annotation.*;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@interface MyAnnotation {
    @AliasFor("module")
    String value() default "";

    @AliasFor("moduleTag")
    String businessTag() default "";
}

@Aspect
@Component
public class MyAspect {

    @Pointcut("@annotation(myAnnotation)")
    public void annotationPointcut(MyAnnotation myAnnotation) {

    }

    @Before("annotationPointcut(myAnnotation)")
    public void beforePointcut(JoinPoint joinPoint, MyAnnotation myAnnotation) throws Throwable {

    }

    @Around("annotationPointcut(myAnnotation)")
    public Object doAround(ProceedingJoinPoint joinPoint, MyAnnotation myAnnotation) throws Throwable {
        // 获取被修饰方法的参数
        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
        String[] params = methodSignature.getParameterNames();
        Object[] args = joinPoint.getArgs();
        // 遍历参数列表
        if (params != null || params.length > 0) {
            StringBuilder stringBuilder = new StringBuilder();
            for (int i = 0; i<params.length; i++) {
                stringBuilder.append(params[i] + ":" + args[i]);
                stringBuilder.append(";");
            }
        }
        return joinPoint.proceed();
    }

    // 函数执行后
    @AfterReturning("annotationPointcut(myAnnotation)")
    public void doAfterReturning(JoinPoint joinPoint, MyAnnotation myAnnotation) {
    }

}

```