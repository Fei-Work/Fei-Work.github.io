---
title: "无约束非线性优化：高斯牛顿法"

categories:
  - blogs
tags:
  - step length selection
  - Unconstrained Optimization
  - Mathmatical Optimization
lang: zh
header: 
  teaser: "./assets/images/Gauss_Newton.png"
---

无约束优化在机器人学中的作用毋庸置疑，该博客简单记录在无约束非线性优化方法中的高斯牛顿法的推导过程，其本质都一样


## 从最简单的最小二乘问题出发

$
\min F(x) = \frac{1}{2} \||f(x)\||_2^2 \tag{1}
$

我们针对$f(x)$执行泰勒展开：

$$
f(x_0 + \Delta x) = f(x_0) + J(x_0) \Delta x + \Delta x^T\frac{H(x_0)}{2}\Delta x + o(n) \tag 2
$$

这里我们认为$f$为$m$维向量$x_0$向$m$维误差项的映射，$\Delta x$为变化量，$J(x_0)$为雅可比矩阵，$H(x_0)$则为海塞矩阵。

只保留一阶项：

$$
min \ F(x) =\frac{1}{2}[f(x_0) + J(x_0) \Delta x]^T[f(x_0) + J(x_0) \Delta x] \\
	=\frac{1}{2}[||f(x_0)||_2^2 + 2\Delta x^T J(x_0)^T f(x_0) + \Delta x^T J(x_0)^T J(x_0) \Delta x] \tag 3
$$

显然若想得到最小值，需要对$\Delta x$求偏导:

$$
\frac{\partial F(x)}{\partial \Delta x} = J(x_0)^T f(x_0) + J(x_0)^T J(x_0) \Delta x = 0 \tag 4
$$

即：

$$
\Delta x = -[J(x_0)^T J(x_0)]^{-1}J(x_0)^T f(x_0) \tag{5}
$$


## 引入信息矩阵

在实际建模的过程中，推导得到协方差的逆为信息矩阵，作为权来刻画每一项的大小：

$$
min \ F(x) = \frac{1}{2}f(x)^T \Sigma^{-1} f(x) \tag{6}
$$

同上面的过程：

$$
min \ F(x) =\frac{1}{2}[f(x_0) + J(x_0) \Delta x]^T \Sigma^{-1} [f(x_0) + J(x_0) \Delta x] \\
	=\frac{1}{2}[f(x_0)^T \Sigma^{-1} f(x_0) + 2\Delta x^T J(x_0)^T \Sigma^{-1} f(x_0) + \Delta x^T J(x_0)^T \Sigma^{-1}J(x_0) \Delta x] \tag 7
$$

$$
\frac{\partial F(x)}{\partial \Delta x} = J(x_0)^T \Sigma^{-1} f(x_0) + J(x_0)^T \Sigma^{-1} J(x_0) \Delta x = 0 \tag 8
$$

$$
\Delta x = -[J(x_0)^T \Sigma^{-1} J(x_0)]^{-1}J(x_0)^T \Sigma^{-1} f(x_0) \tag{9}
$$

## 批量最小二乘

当存在多个误差项：

$$
min \ F(x) =\sum_i \frac{1}{2}f_i(x)^T \Sigma_i^{-1} f_i(x) \tag{10}
$$

同上面的过程：

$$
min \ F(x) =\sum_i\frac{1}{2}[f_i(x_0) + J_i(x_0) \Delta x]^T \Sigma^{-1}_i [f_i(x_0) + J_i(x_0) \Delta x] \\
	=\sum_i\frac{1}{2}[f_i(x_0)^T \Sigma^{-1}_i f_i(x_0) + 2\Delta x^T J_i(x_0)^T \Sigma^{-1}_i f_i(x_0) + \Delta x^T J_i(x_0)^T \Sigma^{-1}_i J(x_0)_i \Delta x] \tag {11}
$$

$$
\frac{\partial F(x)}{\partial \Delta x} =\sum_i[ J_i(x_0)^T \Sigma^{-1}_i f_i(x_0) + J_i(x_0)^T \Sigma^{-1}_i J_i(x_0) \Delta x] = 0 \tag {12}
$$

$$
\Delta x = \sum_i-[J_i(x_0)^T \Sigma^{-1}_i J_i(x_0)]^{-1}J_i(x_0)^T \Sigma^{-1}_i f_i(x_0) \tag{13}
$$
