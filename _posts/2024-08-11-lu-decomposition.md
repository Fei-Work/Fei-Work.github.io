---
title: "Relearn Linear Algebra: LU decomposition"

categories:
  - blogs
tags:
  - Matrix
  - Linear Algebra
  - Math

header: 
  teaser: "./assets/images/LU-decomposition.png"
---


**Lower-upper (LU) decomposition** is a kind of matrix decomposition, which can decompose a matrix into the product of [lower triangular matrix](https://en.wikipedia.org/wiki/Triangular_matrix) and [upper triangular matrix]( https://en.wikipedia.org/wiki/Triangular_matrix), which is commonly used in **computers** to solve systems of linear equations, inverse matrices, and so on. The intuitive and easy Gaussian elimination method (elementary row transformation) is already available, but computers still choose to use the LU decomposition.

# LU decomposition

## Definations

For a square matrix $A$, the **LU decomposition** is the decomposition of $A$ into two matrices - the **lower triangular matrix** $L$ and the **upper triangular matrix** $U$ - in the appropriate row-column order or arrangement



$$
\underbrace{\begin{bmatrix}a_{11} & a_{12} & \cdots & a_{1n} \\ a_{21} & a_{22} & \cdots & a_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ a_{n1} & a_{n2} & \cdots & a_{nn}\end{bmatrix}}_A
=
\underbrace{\begin{bmatrix}l_{11} & 0 & \cdots & 0 \\ l_{21} & l_{22} & \cdots & 0 \\ \vdots & \vdots & \ddots & \vdots \\ l_{n1} & l_{n2} & \cdots & l_{nn}\end{bmatrix}}_L
\underbrace{\begin{bmatrix}u_{11} & u_{12} & \cdots & u_{1n} \\0 & u_{22} & \cdots & u_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \cdots & u_{nn}\end{bmatrix}}_U
\tag 1
$$



## Solve for $L$, $U$

The **upper triangular matrix** $U$ is first obtained by solving a series of row transformations on $A$ using the **[elementary  matrix](https://en.wikipedia.org/wiki/Elementary_matrix)** $E$:


$$
\underbrace{
E_{nn-1}\cdots E_{n2} \cdots E_{22}E_{21}
}_E
A=U \tag2
$$


After obtaining the **upper triangular matrix** $U$, we go on to the **upper triangular matrix** $L$, and from $(2)$ we obtain $(3)$.


$$
A = E^{-1}U
\tag 3
$$

From $(1)$ and $(3)$, it clearly follows tha

$$
L = E^{-1} ={ (E_{nn-1}\cdots E_{n2} \cdots E_{22}E_{21}})^{-1} \tag 4
$$

It is worth noting that the **LU decomposition** requires the **square matrix** $A$ to be a **non-singular matrix** and that the elimination process does not have 0 principal elements, otherwise $(2)$ cannot be satisfied.

## Solving equations

One of the key applications of LU decomposition is the resolution of systems of linear equations. For a system of linear equations, $Ax = b$, it is evident that the decomposition of $A$ into an **upper triangular matrix**, $L$, and a **lower triangular matrix**, $U$, allows for a two-step solution process.

$$
\begin{align}
L\underbrace{Ux}_c &= b &\text{step1. get c}\tag 5
\\ Ux &= c & \text{step2. get x} \tag6
\end{align}
$$


# Why use LU decomposition?

## Computational efficiency

In a single computation, the **time complexity** aspects of LU decomposition and Gaussian elimination are both $O(n^3)$. LU decomposition separates matrix decomposition from equation solving, and the advantage of LU decomposition is demonstrated when multiple computations are required, with the matrix $A$ remaining unchanged and the variable $b$ changing.

## Numerical stability

The simple LU decomposition does not have good numerical stability, and will generally be expanded to **[LU factorization with partial pivoting(LUP)]()** and other methods to solve the problem.The LUP decomposition uses the substitution matrix to perform row transformations in the completion of the LU decomposition, which is in fact a process of selecting the principal elements.

$$
PA=LU\tag 7
$$




