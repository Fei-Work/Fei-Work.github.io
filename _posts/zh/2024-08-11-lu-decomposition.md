---
title: "重学线代：LU分解"
categories:
  - blogs
tags:
  - Matrix
  - Linear Algebra
  - Math
lang: zh
header: 
  teaser: "./assets/images/LU-decomposition.png"
---

**LU分解**是矩阵分解的一种，其可以将一个矩阵分解为[下三角矩阵](https://en.wikipedia.org/wiki/Triangular_matrix)与[上三角矩阵](https://en.wikipedia.org/wiki/Triangular_matrix)的乘积，常用于**计算机**求解线性方程组、求解逆矩阵等。已经有了直观又简便的高斯消元法（初等行变换），但计算机仍然选择使用LU分解。【因为它善🐂】


# LU分解

## 定义

对于方阵$A$，**LU分解**是指将$A$按照适当的行列顺序或排列分解为两个矩阵—下三角矩阵$L$和上三角矩阵$U$



$$
\underbrace{\begin{bmatrix}a_{11} & a_{12} & \cdots & a_{1n} \\ a_{21} & a_{22} & \cdots & a_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ a_{n1} & a_{n2} & \cdots & a_{nn}\end{bmatrix}}_A
=
\underbrace{\begin{bmatrix}l_{11} & 0 & \cdots & 0 \\ l_{21} & l_{22} & \cdots & 0 \\ \vdots & \vdots & \ddots & \vdots \\ l_{n1} & l_{n2} & \cdots & l_{nn}\end{bmatrix}}_L
\underbrace{\begin{bmatrix}u_{11} & u_{12} & \cdots & u_{1n} \\0 & u_{22} & \cdots & u_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \cdots & u_{nn}\end{bmatrix}}_U
\tag 1
$$



## 求解L、U

首先使用**基本置换矩阵**$E$对$A$进行一系列的行变换来求解得到上三角矩阵$U$：


$$
\underbrace{
E_{nn-1}\cdots E_{n2} \cdots E_{22}E_{21}
}_E
A=U \tag2
$$


得到上三角矩阵$U$后，我们再去求上三角矩阵$L$，从$(2)$中我们可以得到$(3)$:


$$
A = E^{-1}U
\tag 3
$$

那么联合$(1)$和$(3)$，显然得到:

$$
L = E^{-1} ={ (E_{nn-1}\cdots E_{n2} \cdots E_{22}E_{21}})^{-1} \tag 4
$$

值得注意的是**LU分解**需要方阵$A$为**非奇异矩阵**，且消元过程不存在0主元，不然$(2)$就做不到了。

## 解方程

**LU分解**的重要作用之一是对线性方程组进行求解，很显然对于一个线性方程组$Ax = b$而言，我们将$A$分解为上三角矩阵$L$和下三角矩阵$U$之后分两步求解即可：

$$
\begin{align}
L\underbrace{Ux}_c &= b &\text{step1. get c}\tag 5
\\ Ux &= c & \text{step2. get x} \tag6
\end{align}
$$

# 为什么使用LU分解

## 计算效率

在单次计算中，**时间复杂度**方面LU分解与高斯消元法都是$O(n^3)$，LU分解将矩阵分解与方程求解分离，当我们面对多次计算时，当矩阵$A$不变而$b$发生变化时，LU分解的优势就体现出来了。

## 数值稳定性

单纯的LU分解并不具备良好的数值稳定性，一般会拓展为**LUP分解**等方法来解决。LUP分解使用置换矩阵进行行变换在完成LU分解，其实这就是一个选择主元的过程。

$$
PA=LU\tag 7
$$



