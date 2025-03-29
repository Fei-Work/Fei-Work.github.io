---
title: "重学线性代数：矩阵基础"
categories:
  - blogs
tags:
  - Matrix
  - Linear Algebra
  - Math
lang: zh
header: 
  teaser: "./assets/images/Matrix-times.png"
---

线性代数是每个工科生的必修课，近来在计算机图形学、机器人学的学习中深感其重要性以及当年自己学习的浅薄，故重新学习该课程并作此记录。   


## 从解方程开始

线性代数的第一课一般都从解方程开始，事实上对于当下的我而言，提及线性代数印象最深刻的也是解方程，那么这次的线代再学习也从最基础的开始，简单回顾这里的引入，有线性方程组：

$$
\begin{align}
x + y = 1 \tag1\\
3x + 4y =2 \tag2
\end{align}
$$

如何求得方程组中$x$，$y$的解呢，这是个很初级的数学问题，首先想到的**做法一**就是在其中一个方程上使用$x$来表示$y$，再代入另一个方程即可求得结果；另一个**做法二**是使用将公式$(1)$减去3倍的公式$(2)$，即得到$y$的值，反代得到$x$的值。当问题的规模变大的时候呢？存在3个、4个、甚至更多的未知数时这样直接求解将变得很复杂，所以我们引入矩阵来表示。

即我们可以将刚才的方程组转化为下面的形式：

$$
\begin{bmatrix}1 & 1\\ 3 & 4\end{bmatrix} \begin{bmatrix} x\\y \end{bmatrix} = \begin{bmatrix} 1 \\ 2 \end{bmatrix} \tag 3
$$

求解的方式有很多，比如说等式左右两边*同时对左边的矩阵求逆*，**使用初等行变换**。事实上初等行变换就是从矩阵的角度去完成一遍之前提到的**做法二**。

$$
\left[
\begin{array}{cc|c} 1 & 1 & 1\\ 3 & 4 & 2\end{array}
\right]
\longrightarrow
\left[
\begin{array}{cc|c} 1 & 1 & 1\\ 0 & 1 & -1\end{array}
\right]
$$

答案就显而易见了。这只是一个最简单的例子，并且我刻意选择了一个**非奇异矩阵**使得该问题有解。当面对更复杂的问题时，我会更加赞美**矩阵消元**。

## 矩阵乘法

当$A$为一个$m \times p$的矩阵，$B$为一个$p \times n$的矩阵，设$A$与$B$的乘积为矩阵$C$，则：

$$
(AB)_{ij} = \sum_{k=1}^p{a_{ik}b_{kj}} = a_{i1}b_{1j} + a_{i2}b_{2j} + ···+ a_{ip}b_{pj}
$$

在我的印象中，我一直只使用上面的公式来计算矩阵乘法，并且它也帮助我在考试中拿到了很高的成绩，毕竟*一招鲜吃遍天*，但事实上我似乎也因此错过了矩阵乘法的本质：**线性变换**。下面列举了四种不同视角下的矩阵乘法，很有帮助。

{% include image.html url="/assets/images/Matrix-times.png" description="四种不同的视角去看矩阵乘法" %}



## 逆矩阵

我们都知道**矩阵求逆**也能够求解出$(3)$中的未知数，因为我们定义了矩阵的逆是一种类似于常数运算中的倒数，并且类似于0不能求倒数，**奇异矩阵**也不能进行矩阵求逆。

$$
\underbrace{\begin{bmatrix}1 & 1\\ 3 & 4\end{bmatrix}}_A
\underbrace{\begin{bmatrix} a & c\\b &d \end{bmatrix}}_{A^{-1}}
= 
\underbrace{\begin{bmatrix} 1 & 0\\0 & 1 \end{bmatrix}}_I
$$

使用**Gauss-Jordan**方法可以方便求解逆矩阵，其首先创建一个[增广矩阵](https://en.wikipedia.org/wiki/Augmented_matrix)，左侧为待求逆矩阵，右侧为[单位矩阵](https://en.wikipedia.org/wiki/Identity_matrix)。然后，使用**Gauss-Jordan**方法将左侧转换为单位矩阵，这会导致右侧成为输入矩阵的逆。仍然以该例做示范：

$$
\left[
\begin{array}{cc|cc}1&1&1&0\\3&4&0&1 \end{array}
\right]
\longrightarrow
\left[
\begin{array}{cc|cc}1&1&1&0\\0&1&-3&1 \end{array}
\right]
\longrightarrow
\left[
\begin{array}{cc|cc}1&0&4&-1\\  0&1& -3&1 \end{array}
\right]
$$

$$
A^{-1}=\begin{bmatrix}4&-1\\-3&1 \end{bmatrix}
$$

在整个过程中**Gauss-Jordan**方法其实也是使用了**线性变换**的思想，将下面两个方程组汇成一个来考虑求解。

$$
A \times colimn ~ j ~ of ~A^{-1}=colimn ~ j ~ of ~I
$$
