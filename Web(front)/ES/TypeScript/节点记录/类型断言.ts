/**
 * Created by Andy on 2017/8/22.
 */
interface Foo{
	bar:string;
	baz:number;
}
		
function Foz(pram:Foo){
	return pram;
}  

Foz({bar:"Hello"} as Foo);  //使用类型断言可以跳过类型检查