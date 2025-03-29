---
title: "数值分析：多项式插值"

categories:
  - blogs
tags:
  - polynomial interpolation
  - numerical analysis
  - math
lang: zh
header: 
  teaser: "https://pic1.zhimg.com/v2-3adb5f19f870d87b0b43cfbe9989682e_r.jpg"
---

在工程性问题或者科学实验中, 有时会面临这样的问题: 我们只能测得一个函数$f(x)$若干个点上的函数值或者导数值, 但是我们想要得到函数在其它点上的值, 那么我们可以"造"一个函数$y(x)$, 在**确保经过已知的这些函数点**的前提下去逼近函数$f(x)$, 如果我们使用的是**代数多项式**, 那么则称作多项式插值.

{% include image.html url="https://pic1.zhimg.com/v2-3adb5f19f870d87b0b43cfbe9989682e_r.jpg" description="" %}

最初学习多项式插值的时候, 因为都是要得到一个函数, 我对于还是插值与拟合有些分不清, 但其实只需要明析插值是保证要经过函数点, 而拟合则是通过构造误差函数来最小化模型在所有数据点上的预测值与实际观测值之间的差异. 

下面介绍几种多项式插值方法.

# Lagrange插值

## 方法

Lagrange插值思想很明确, 既然要求**确保经过已知的这些函数点**, 那我能不能把所有的点的函数值都叠加起来前面加一个权函数, 当$x = x_i$的时候, 这一项就为1, 否则则为0,这样就可以满足条件了.

$$
y(x) = \sum_{j = 0}^nl_j(x)f(x_j) \tag 1
$$

$$
l_j(x) =\left\{
\begin{array}{rcl}
1      &      & {i = j}\\
0     &      & {i \neq j}\\
\end{array}\right.\quad i,j = 0,1,\cdots,n \tag 2
$$

那么问题就转化成了如何定义一个插值多项式$l_j(x)$, 至于构造思路, 从公式$(2)$中可以得知,对于每一个权函数需要有$n-1$个零点, 那么多项式就出来, 同时又要求单位化, 那么结果就显而易见了,这里直接给出来了, 可以自己代入计算下,**基本**没问题,

$$
l_j(x) = \frac{\prod_{i = 0}^{j-1}(x - x_i)\prod_{i = j-1}^{n}(x - x_i) }{\prod_{i = 0}^{j-1}(x_j - x_i)\prod_{i = j-1}^{n}(x_j - x_i)} \quad j = 0,1,\cdots, n \tag 3
$$

关于公式(3)这里其实存在一个小问题, 如果同时已知的函数点中有**两个相同的点**, 所有点形如(1, 2), (1, 2), (2, 3)需要我们进行插值, 那么我们将构造出:

$$
l_1(x) = \frac{(x - 1)(x - 2)}{(1 - 1)(1 - 2)} \tag 4
$$

显然问题出现了:分母中的$(1 - 1)$将为零，这导致基多项式$l_1(x)$无定义, 所以**Lagrange插值要求对插入的节点应该是互异的**, 这样就完全没有问题了,此时的插值多项式是**唯一**的.

## 误差分析

完成插值函数的构建了, 那么如何实现对插值函数效果的评估呢,其实也很简单, 减一下就好了, :

$$
E(x) = f(x)-y(x) \tag 5
$$

关于$E(x)$, 这里的推导过程不再赘述, 只给出推导思路: 先构造一个关于$f(z)-y(z) = k(x)\prod_{i = 0}^n( z - x_i)$的函数, 当经过插值点的时候,左边减去右边等于零. 那么再去求导, 因为有$n + 2$个零点, 求$n + 1$ 次导之后至少存在一个零点, 之后得到$k(x)$, 那么就可以得出$E(x)$的解析形式:

$$
E(x) = \frac{f^{n+1}(\zeta)}{(n+1)!} \prod_{i = 0}^n(x - x_i) \quad \zeta\in(a,b) \tag6
$$

# Newton插值

Lagrange插值思路简单易用, 但是当需要我们增加新的插值节点, 我们会发现需要重新构造插值函数了, 这里有另一个思路:

$$
y(x) = a_0 + a_1(x - x_0) + \cdots +a_n(x - x_0)(x - x_1)\cdots(x - x_n) \tag 7
$$

写成这种升幂的形式可以保证每次我们增加新的节点时, 只需要在其上面累加新的项即可.

代入原插值的函数, 可以得到$a_i$的值, 即:

$$
f_0 = a_0 \\
\frac{f_1 - f_0}{x_1-x_0} = a_1 \\
\frac{\frac{f_2 - f_0}{x_2-x_0} - \frac{f_1 - f_0}{x_1-x_0}}{x_2-x_0} = a_2 \\
\vdots \tag8
$$

这样逐步计算就可以得到每一个参数的值.

为了更优美的去计算, 我们定义**差商**:

$$
f[x_0, x_k] = \frac{f_k - f_0}{x_k - x_0} \\
f[x_0,x_1, x_k] = \frac{f[x_0, x_k] - f[x_0, x_1]}{x_k - x_1}\\
\vdots \\
f[x_0,x_1,\cdots,x_{k-1}, x_k] = \frac{f[x_0,x_1,\cdots,x_{k-2}, x_k] - f[x_0,x_1,\cdots,x_{k-1}]}{x_k - x_{k-1}} \tag9
$$

很显然, 由数学归纳法:

$$
a_k=f[x_0,x_1,\cdots, x_k] \quad k = 1,2,\cdots, n \tag{10}
$$

事实上, 通过比较Newton插值与Lagrange插值的首项系数, 可以证明差商$f[x_0,x_1,\cdots, x_k]$与节点的排列顺序无关; Newton插值与Lagrange插值也是**等价**的.

且可求:

$$
f[x_0,x_1,\cdots, x_k] =\frac{f^{j}(\zeta)}{(j)!}\quad \zeta\in(x_0,x_j) \tag{11}
$$

## 收敛性结论

1. 节点的加密不一定保证两节点之间的插值函数能够更好的逼近函数.

2. 只涉及节点的值容易造成形如图1中$y_1$的Runge现象, 函数值出现大的波动.

{% include image.html url="https://pica.zhimg.com/v2-5e41185c991ba9c8b0d4488af8045c58_1440w.jpg" description="" %}


# Hermit插值

为了解决Runge现象, 那么只需要我们加入导数约束即可, 这样自然我们的插值函数就会与原始函数相同程度的平滑:

$$
\left\{
\begin{array}{rcl}
y(x_j) =f(x_j)      &      & {j = 0,1,\cdots,n}\\
y'(x_j) =f'(x_j)     &      & {j = 0,1,\cdots,r}\\
\end{array}\right. \tag{12}
$$

即:

$$
y(x)= \sum_{j = 0}^n\alpha_j(x)f(x_j) +\sum_{j = 0}^r\beta_j(x)f'(x_j) \tag{13}
$$

这里关于$\alpha_j(x)$与$\beta_j(x)$的推导也很有意思, 但是需要打太多公式,可以参考

https://zhuanlan.zhihu.com/p/694562765

只给出最终的结果:

$$
f(x)=\sum_{j=0}^n \alpha_j(x) f\left(x_j\right)+\sum_{j=0}^n \beta_j(x) f^{\prime}\left(x_j\right) +\frac{\left[p_{n+1}(x)\right]^2}{(2 n+2)!} f^{(2 n+2)}(\zeta), \quad \zeta \in(a, b) \tag{14}
$$

$$
\alpha_j(x)=\left[1-2\left(x-x_j\right) l_j^{\prime}\left(x_j\right)\right] l_j^2(x), \quad j=0,1, \cdots, n \tag{15}
$$

$$
\beta_j(x)=\left(x-x_j\right) l_j^2(x), \quad j=0,1, \cdots n \tag{16}
$$















