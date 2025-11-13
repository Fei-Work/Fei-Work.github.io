---
title: "SLAM-旋转02：李群与李代数"

categories:
  - blogs
tags:
  - Pose
  - SLAM
lang: zh
header: 
  teaser: "./assets/images/Rotation01/image-20241116220715875.png"
---



本篇文章旨在记录在SLAM中常用的特殊正交群与其李代数相关性质的推导，不对流形及其正切空间更为复杂的几何性质做讨论。


$$
SO(3)=\{R\in \mathbb{R}^{3\times 3}|RR^T = I,det(R)=1 \} \tag 1
$$

**群**的定义为满足一种**集合**与一种**运算**的代数结构，且要求运算满足封闭性、逆、幺元等性质。旋转矩阵是一种乘法封闭的具有连续的群，即特殊正交群。



## 关于反对称矩阵的几个性质

这部分都是简单的矩阵运算，性质记住即可。

### 性质一：$a^\wedge a^\wedge = aa^T-I$

$$
\begin{bmatrix}
0 & -a_3 & a_2 \\
a_3 & 0 & -a_1 \\
-a_2 & a_1 & 0
\end{bmatrix} \begin{bmatrix}
0 & -a_3 & a_2 \\
a_3 & 0 & -a_1 \\
-a_2 & a_1 & 0
\end{bmatrix}  = \begin{bmatrix}
-a_3^2-a_2^2 & a_2a_1 & a_3a_1 \\
a_1a_2 & -a_1^2-a_3^2 & a_3a_2 \\
a_1a_3 & a_2a_3 & -a_1^2-a_2^2
\end{bmatrix} = 
\begin{bmatrix}
a_1a_1 & a_1a_2 & a_1a_3 \\
a_2a_1 & a_2a_2 & a_2a_3 \\
a_3a_1 & a_3a_2 & a_3a_3
\end{bmatrix} - I
\tag 1
$$

显然成立。



### 性质二：$a^\wedge a^\wedge a^\wedge = -a^\wedge$

由$a^\wedge a^\wedge = aa^T-I$，那么只需要证明$aa^Ta^\wedge = 0$即可

$$
aa^Ta^\wedge =\begin{bmatrix}
a_1a_1 & a_1a_2 & a_1a_3 \\
a_2a_1 & a_2a_2 & a_2a_3 \\
a_3a_1 & a_3a_2 & a_3a_3
\end{bmatrix}
\begin{bmatrix}
0 & -a_3 & a_2 \\
a_3 & 0 & -a_1 \\
-a_2 & a_1 & 0
\end{bmatrix} = 0 \tag 2
$$

得证。

### 性质三：$a^\wedge p = -p^\wedge a$

这个性质在李代数进行扰动求导时常常用到，注意$p$是向量

$$
a^\wedge p =\begin{bmatrix}
0 & -a_3 & a_2 \\
a_3 & 0 & -a_1 \\
-a_2 & a_1 & 0
\end{bmatrix}
\begin{bmatrix}
p_1  \\
p_2 \\
p_3
\end{bmatrix} = \begin{bmatrix}
-a_3p_2 + a_2p_3\\
a_3p_1 - a_1p_3 \\
-a_2p_1 + a_1p_2
\end{bmatrix}
$$

$$
-p^\wedge a =-\begin{bmatrix}
0 & -p_3 & p_2 \\
p_3 & 0 & -p_1 \\
-p_2 & p_1 & 0
\end{bmatrix}
\begin{bmatrix}
a_1  \\
a_2 \\
a_3
\end{bmatrix} = -\begin{bmatrix}
-p_3a_2 + p_2a_3\\
p_3a_1 - p_1a_3 \\
-p_2a_1 + p_1a_2
\end{bmatrix} =  \begin{bmatrix}
-a_3p_2 + a_2p_3\\
a_3p_1 - a_1p_3 \\
-a_2p_1 + a_1p_2
\end{bmatrix} \tag {3}
$$

得证，事实上，由于$a^\wedge p = a \times p$，直接从叉乘的角度也能得到答案。即：

$$
a^\wedge p = a \times p = -p \times a = -p^\wedge a
$$


## 映射关系

这里按照《视觉SLAM十四讲》中的思路进行推导

$$
RR^T = I \tag 4
$$

$$
\dot{R}R^T +R\dot{R}^T = 0 \tag{5}
$$

$$
\dot{R}R^T = -(\dot{R}R^T)^T \tag 6
$$

即：

$$
\dot{R} = \phi^\wedge R \tag 7
$$

将$R$看做为关于时间$t$的函数，并执行泰勒展开：

$$
R(t_0 + \Delta t) = R(t_0) + \dot{R}(t_0)\Delta t \\
 = (I + \phi^\wedge \Delta t)R(t_0) \tag 8
$$

其中$a$反映了导数性质。

对公式$(7)$,求解该微分方程，满足公式$(8)$中当$\Delta t = 0$时的初值条件。

即：

$$
R(t_0  + \Delta t) = \exp(\phi^\wedge \Delta t) \tag 9
$$

展开得：

$$
\begin{aligned}
\exp(\phi^\wedge) & \overset{10.1}{=} \exp(\theta a^\wedge)\\
& \overset{10.2}{=} \sum_i \frac{1}{i!}(\theta a^\wedge)^i \\
& \overset{10.3}{=} \cos(\theta)I + (1-\cos(\theta))aa^T + \sin(\theta)a^\wedge 
 \end{aligned}
 \tag {10}
$$

公式$(10.3)$的推导中使用到了$a^\wedge a^\wedge = aa^T-I$、$a^\wedge a^\wedge a^\wedge = -a^\wedge$以及$\sin(\theta)$与$\cos(\theta)$泰勒展开的性质。

反过来使用求矩阵的迹以及旋转矩阵旋转向量不变的性质求得李代数。



## 李代数的伴随性质

### 推导： $Rp^\wedge R^T = (Rp)^\wedge$

$$
\begin{aligned}
(Rp)^\wedge v & \overset{11.1}{=} (Rp) \times(v) \\
 &\overset{11.2}{=}  (Rp) \times(RR^Tv) \\
 &\overset{11.3}{=} R(p\times(R^Tv)) \\
 &\overset{11.4}{=} Rp^\wedge R^Tv
 \end{aligned}
 \tag {11}
$$

11.1使用了反对称符号与叉乘等价；11.2利用旋转矩阵正交的性质，后续将$R$提出来，最终得证



### 伴随性质： $R\exp(p^\wedge)R^T = (Rp)^\wedge$

$$
\begin{aligned}
R\exp(p^\wedge)R^T & \overset{12.1}{=} R(\cos(\theta)I + (1-\cos(\theta))aa^T + \sin(\theta)a^\wedge)R^T \\
& \overset{12.2}{=} \cos(\theta)RR^T + (1-\cos(\theta))Raa^TR^T + \sin(\theta)Ra^\wedge R^T \\
&  \overset{12.3}{=} \cos(\theta) + (1-\cos(\theta))Ra(Ra)^T + \sin(\theta)(Rp)^\wedge \\
&  \overset{12.4}{=} (Rp)^\wedge
\end{aligned}
\tag {12}
$$

得证。



## 李代数的扰动公式

可以左扰动和右扰动，两个都是小量，都可以用。扰动公式需要结合具体的实例去看，比如说现有：

$$
f = Rq \tag {13}
$$

我们对$R$求右扰动：

$$
\begin{aligned}
\frac{\partial{e}}{\partial{R}} &\overset{14.1}{=}\lim_{\delta \phi \rightarrow 0} \frac{R\exp(\delta \phi^\wedge)q - Rq }{\delta \phi} \\
&\overset{14.2}{=}\lim_{\delta \phi \rightarrow 0} \frac{R(I + \delta \phi^\wedge)q_j  - Rq_j}{\delta \phi}\\
&\overset{14.3}{=}\lim_{\delta \phi \rightarrow 0}\frac{-Rq_j^\wedge\delta \phi}{\delta \phi} \\
&\overset{14.4}{=} -Rq_j^\wedge
\end{aligned}
\tag{14}
$$

其中$14.2$中在使用公式$(10)$展开使用到了$\lim_{\theta\rightarrow 0}\sin(\theta) = \theta$的性质，所以$\theta a^\wedge =\delta \phi^\wedge$，$14.4$中则公式$(3)$中的性质。



关于左右扰动的物理意义，可以从矩阵的左右乘以及李代数本身的含义去理解，某一坐标系相对于世界系的位姿为$R_{WC}$，从右向左进行左乘运算表示累积对局部系下向量的旋转，而从左向右的右乘在不断的去旋转坐标系，最终旋转向量。对于右扰动$R_{WC}\exp(\delta \phi^\wedge)$显然就是在局部系中作扰动。一般我们多使用右扰动，通过推导我们会发现右扰动少进行了一步$p^\wedge R$中利用伴随性质转化的步骤。



如此，常用的性质推导已经完成。

