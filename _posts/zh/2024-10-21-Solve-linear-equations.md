---
title: "数值分析：解线性方程组"

categories:
  - blogs
tags:
  - linear equations
  - numerical analysis
  - math
lang: zh
header: 
  teaser: "./assets/images/linear-equations.png"
---

关于线性方程组的数值解法，主要分为了四种情况来进行讨论。最后的话再针对误差专题进行分析

$
Ax=b \tag1
$

$$
\begin{bmatrix}a_{11} & a_{12} & \cdots & a_{1n} \\ a_{21} & a_{22} & \cdots & a_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ a_{n1} & a_{n2} & \cdots & a_{nn}\end{bmatrix}
\begin{bmatrix} x_1 \\ x_2\\ \vdots \\x_n \end{bmatrix}
=
\begin{bmatrix} b_1 \\ b_2\\ \vdots \\b_n \end{bmatrix}
\tag 2
$$

## 矩阵求解

即高斯消元法以及高斯列主元消元法

### 高斯消元法

{% include archive-quate.html type=entries_layout filetitle = "Relearn Linear Algebra: the Basic of Matrix" %}

### 列主元消元

关于列主元，主要考虑到计算机计算过程中的数值问题，对于一个线性方程组形如

$$
\begin{bmatrix}0.3*10^{-10} & 1\\ 3 & 4\end{bmatrix} \begin{bmatrix} x\\y \end{bmatrix} = \begin{bmatrix} 1 \\ 2 \end{bmatrix}
$$

如果要进行消元，矩阵的第二列需要减去第一个方程再乘以$m_{21}=a_{21}/a_{11}$，这个过程很容易造成结果失真，在这个例子中系数为$10^{11}$。这显然很不合适，那么自然的，这个被除的值是越大越好，被选择的最大的这个就是列主元。对于线性方程组：即：假设矩阵$A$为方阵且维度为$n$，在消去过程中，进行到第$j$列的时候，在第$j$列中，找出第$j$行到第$n$行中最大的值，认为此为列主元，并交换该行与第$j$行，同时$b$向量也要进行行交换。


## 分解后再求解

主要为LU分解、cholesky分解

### LU分解

{% include archive-quate.html type=entries_layout filetitle = "Relearn Linear Algebra: LU decomposition" %}

有**Doolittle分解方法**以及**Crout分解方法**，这两种方法本质上都是LU分解，区别在于前者的下三角矩阵对角线上都为1（单位下三角矩阵），后者的为单位上三角矩阵。关于LU分解值得注意的是**矩阵非奇异**的条件下才能够进行。

### Cholesky分解

相较于LU分解，Cholesky分解的变化为将LU分解后的矩阵对角线上的元素提取到一个对角矩阵中：

$$
A = LD(D^{-1}U) \tag3
$$

当然，当A**对称正定矩阵**的时候:

$$
A = LDL^T \tag4
$$

那么再按照之前LU分解解方程的思想，逐级去计算，最终得到x的解。

*ps:这里的为改进的Cholesky分解，改进前将D分别划分给了前后两个三角矩阵，原理是一致的*

**对称正定矩阵**：所有的特征值自然都是正的。怎么理解呢，暂时也不太清楚【OK，task+1，矩阵论也要看】	



## 迭代求解

与之前提到非线性方程的迭代求解的思路相同，线性方程组迭代求解即将$(1)$改写成一个等价方程组，再建立迭代公式：

$$
\begin{flalign}
Ax=b&\longrightarrow x = Bx + k\\ &\longrightarrow 
x^{i + 1} = Bx^i + k, \quad i = 0,1,2,\cdots
\end{flalign} \tag 5
$$

既然是迭代，就肯定存在收敛性判断问题，这里只给出结论：

**以下三个命题等价**

- 迭代$x^{i + 1} = Bx^i + k$收敛
- 谱半径$\rho(B)<1$
- 至少存在一种矩阵的从属范数使得$\lVert B\rVert<1$

### Jacobi迭代

遵循提到的思路，将线性方程组$(1)$进行改写，首先将非奇异方阵$A$写成下三角矩阵+对角矩阵+上三角矩阵的形式：

$$
A = L + D + U \tag 6
$$

则线性方程组为：

$$
\begin{flalign}
Ax=b&\longrightarrow x = -D^{-1}(L + U)x + D^{-1}b\\ 
&\longrightarrow  x^{i+1} = -D^{-1}(L + U)x^{i} + D^{-1}b, \quad i = 0,1,2,\cdots \\
&\longrightarrow  x^{i+1} = (I-D^{-1}A)x^{i} + D^{-1}b, \quad i = 0,1,2,\cdots \\
\end{flalign} \tag 7
$$

展开分量形式为：

$$
x^{i+1}_j = \frac{1}{a_{jj}}(b_j-\sum_{m = 1}^{j-1}{a_{jm}x^i_m}-\sum_{m = j+1}^{n}{a_{jm}x^i_m})\quad j = 1,2, \cdots,n; \quad i = 0,1,2,3,\cdots  \tag 8
$$


### Gauss-Seldel迭代

考虑到**Jacobi**迭代中，第$i+1$次迭代的前$j-1$个分量并没有被使用，Gauss-Seldel迭代充分利用了这些信息：

$$
x^{i+1}_j = \frac{1}{a_{jj}}(b_j-\sum_{m = 1}^{j-1}{a_{jm}x^{i+1}_m}-\sum_{m = j+1}^{n}{a_{jm}x^i_m}) \tag 9
$$

实际上，经过推导也可以发现，只是移过去的矩阵变了：

$$
\begin{flalign}
Ax=b&\longrightarrow (L + D + U)x = x + b \\ 
&\longrightarrow  x = -(D+L)^{-1}Ux^{i} + (D+L)^{-1}b,  \\
&\longrightarrow  x^{i+1} = -(D+L)^{-1}Ux^{i} +(D+L)^{-1}b, \quad i = 0,1,2,\cdots \\
\end{flalign} \tag {10}
$$

关于两种方法的收敛性，也有下面几种判断方法：

1. 若系数矩阵$A$对称正定，则Gauss-Seldel方法收敛。
2. 若系数矩阵$A$严格对角占优，则Jacobi迭代与Gauss-Seldel迭代都收敛

## 梯度法

梯度法也是一种迭代求解，首先设定一个初始值，再逐步迭代。但是将其单独拉出来分一个类主要的原因是，区别于之前的将非奇异方阵$A$写成下三角矩阵+对角矩阵+上三角矩阵的方式，其利用公式$(1)$定义了一个二次函数$f(x)$，并利用等价性原理，认为**非线性方程组的的解的充分必要条件是该二次函数取得最小值**。

$$
f(x)=\frac{1}{2}(Ax,x)-(b,x) = \frac{1}{2} \sum_{i = 1}^n\sum_{j = 1}^na_{ij}x_{i}x_{j} - \sum_{j=1}^nb_jx_j \tag {11}
$$

不再给出证明，同时使用梯度法**基于假设$A$对称正定**，*当$A$不对称正定也可能能算*

### 最速下降法

算法思路如下：

1. 任取一初始向量$x^0$，根据该初始向量选择出方向，使得函数$f(x)$在$x^0$点沿着该方向减少最快,即:

$$
-\text{grad}f(x^0) = r^0=b-Ax^0 \tag {12}
$$

2. 进行一维搜索:

$$
x^1 = x^0  + \frac{(r^0,r^0)}{(Ar^0,r^0)}r^0 \tag {13}
$$

如此往复.

### 共轭梯度法

最速下降的方法基于的梯度具有局部性有可能拐来拐去的, 这样会造成迭代次数的增加, 从椭圆的共轭直径获得的启发衍生出来的快速到达目标值的方法.    
公式繁杂,不再列举. 

## 误差分析

在工程上, 对于线性方程组$(1)$, 矩阵$A$在大部分情况是由实验测得的, 所以并不一定精准, 那么需要考虑此时求解的得到的结果会怎么变化. 

直接给结论了.

### 谱条件数

定义矩阵$A$的谱条件数:

$$
\text{Cond}(A) = \| A\|_2\|A^{-1}\|_2
$$

谱条件数越大, 则解的误差可能越大, 当谱条件数等于1的时候, 方程组的状态最好.



