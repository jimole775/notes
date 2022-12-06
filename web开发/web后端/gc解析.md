1. 程序中存在一些实例，叫做 **GC Root**，他们不会被GC回收，常见的如静态变量、线程等。

2. 被 **GC Root** 间接或直接引用的实例会被标记为 `in use`，他们也不会被回收。

# Shallow Size
浅层尺寸，是实例自身所占用的内存，不包括其引用的其他实例。

- 计算公式：

> Shallow Size = [类定义] + 父类fields所占用空间 + 自身fields所占空间 + [alignment]


1. `类定义` - 声明一个类所需要的空间，**固定为8byte**，也就是说，一个不包含任何fields的"空类"，也需要占8byte；另外类定义空间不会重复计算，就是说，即使类集成了其他类，也只算8byte

2. `父类fields所占空间` - 对于集成了其他类的类来说，父类声明的fields显然需要占用一定的空间

3. `自身dields所占空间` - 所有fields所占空间之和；fieldss分基础类型和引用，基础类型所占空间和系统有关，例如在32为系统中 int=4byte，64位系统中 int=8byte；**引用固定占4byte**，例如`String name`；这个变量声明占4byte

4. `alignment` - 是指位数对齐，会让总空间位8的倍数，例如某个A类，以上3项计算出来为15byte，那么为了对齐，让它是8的倍数，会取最接近的值，所以它的Shallow Size是16byte

> 注意，`alignment` 的行为和JVM有关，对于Android来说，实测4.4系统会有对齐行为，但是5.1系统不会

## Shallow Size举例
``` java
class X {
  int a;
  byte b;
  Integer c = new Integer();
}
```
**假设当前是在32位系统**，对于类X来说，一个x实例的Shallow Size为：

1. 类定义的8byte
2. 没有集成其他类，所以没有父类fields
3. a变量为 int 型，4 byte；b变量为 byte 型，1 byte；c变量是引用类型，和它是否指向具体实例无关，固定占4 byte。

如果 **不算** alignment。

> X 的 Shallow size = 8 + 0 + 4 + 1 + 4 = 17byte

如果 **算上** alignment，那么要补齐为8的倍数，也就是 24 byte。

## Shallow Size 举例 2
``` java
class Y extends X {
  List d;
  Date e;
}
```
一个Y实例的Shallow Size为：
1. 类定义的 8 byte
2. 继承了 X 类，X 类的所有 fields 为 X 类的 `Shallow Size` 减去类定义空间 8 byte，也就是 `17b - 8b = 9b`
3. d, e 都是引用类型，各占 4 byte

如果 **不算** alignment

> Y 的 Shallow Size = 8 + 9 + 4 + 4 = 25 byte


如果 **算上** alignment，那么要补齐为 8 的倍数，也就是 32 byte。

# Retained Size
> 实例 A 的 `Retained Size` 是指，当实例 A 被回收时，可以 **同时被回收** 的实例的 `Shallow Size` 之和

所以进行内存分析时，我们应该重点关注 `Retained Size` 较大的实例；或者可以通过 `Retained Size` 判断出某 A 实例内部使用的实例是否被其他实例引用。

例如在 Andriod 中，如果某个 `Bitmap` 实例的 `Retained Size` 很小，证明它内部的 byte 数组被复用了，有另一个 `Bitmap` 实例指向了同一个 byte 数组。

- 举例：
> GC Root => A => B => C => D

图中 A B C D 四个实例，为了方便计算，我们假设所有的实例 `Shallow Size` 都是 1 kb。

## D 实例
D 实例没有引用其他实例，所以移除 D 实例只会释放它自己的空间，因此
> D 实例的 `Retained Size` = `Shallow Size` = 1 kb

## C 实例
当我们移除 C 实例，C 实例引用了 D 实例，**同时 D 实例没有被其他实例引用**，所以 D 实例也会被 GC，所以
> C 实例的 `Retained Size` = C 实例的 `Shallow Size` + D 实例的 `Shallow Size` = 2 kb

## B 实例
当我们移除 B 实例，虽然 B 实例引用了 C 实例，但是 A 实例也引用了 C 实例，所以移除 B 实例不会让 C 实例被 GC，所以
> B 实例的 `Retained Size` = `Shallow Size` = 1 kb

## A 实例
当我们移除 A 实例，显然 A B C D 实例都会被 GC，所以
> A 实例的 `Retained Size` = 4 kb

# 总结
计算 `Retained Size` 的关键在于领会 **移除实例时，可以同时被回收的实例**，重点观察 B 实例的情况。