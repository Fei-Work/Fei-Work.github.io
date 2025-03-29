---
title: "重学线代：向量空间"

categories:
  - blogs
tags:
  - numerical analysis
  - math
lang: zh
header: 
  teaser: "./assets/images/Vector-space.png"
---

关于**向量空间**的概念，维基百科是这样解释的：**向量空间**是一群可**缩放**和**相加的**数学实域（如[实数](https://zh.wikipedia.org/wiki/實數)甚至是[函数](https://zh.wikipedia.org/wiki/函数)）所构成的特殊[集合](https://zh.wikipedia.org/wiki/集合_(数学))，其特殊之处是向量在于缩放和相加后**仍属于这个集合**。从理解向量空间的角度，我觉得很贴切，索性直接拿来使用了。



# 向量空间与子空间

## 向量空间的表示

我们仅在实数的情况下讨论向量空间，此时向量空间使用$\mathbb{R}^n$来表示，其中$n$表示为向量空间中向量的维数。对于$\{v\in\mathbb{R}^1\}$，则$v$可以是任意的一维向量$\begin{bmatrix}x\end{bmatrix}$，对于$\{v\in\mathbb{R}^2\}$，则$v$可以是任意的二维向量$\begin{bmatrix}x\\y\end{bmatrix}$，如此。既然提到空间了，其实在几何上我们也可以想象，$\mathbb{R}^1$是一条直线，$\mathbb{R}^2$则是一个平面，$\mathbb{R}^3$则充满了整个三维空间，更高维度的情况我们无法想象了，但只要紧紧抓住属于向量空间的向量在经过缩放和相加后**仍属于这个集合**即可。



## 子空间

子空间是向量空间中的一个重要概念。简单来说，子空间也是向量空间，其依赖一个向量空间存在。既然提到“子”，即当一个**向量集合**被包含于其依赖的**向量空间S**中，同时其又满足我们提到的构成向量空间的条件，则可以被称为**该向量空间S**的子空间。

对于下面两种情况，根据以上规则，很明显得到(a)是$\mathbb{R}^3$的子空间，而(b)不是。

{% include image.html url="/assets/images/Vector-space.png" description="" %}



## 列空间与零空间

一个*m* 行 *n*列实数矩阵为$A$，则其**列空间**是由矩阵**$A$**的所有**列向量**生成的$\mathbb{R}^m$上的子空间，记作$C(A)$。

一个*m* 行 *n*列实数矩阵为$B$的**零空间**是方程  $Bv=0$的所有解$v$的集合，记作$\mathrm{Null}(B) $。

