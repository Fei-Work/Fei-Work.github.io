---
title: "从高维高斯分布到最小二乘"

categories:
  - blogs
tags:
  - least squares
  - Mathematical Statistics
  - Math
lang: zh
header: 
  teaser: "./assets/images/Gauss_Newton.png"
---

对于高维高斯分布$X\sim N(\mu,\Sigma)$，有

$$
f(X) = \frac{1}{\sqrt{(2\pi)^N\det(\Sigma)}}\exp [-\frac{1}{2}(X-\mu)^T\Sigma^{-1}(X-\mu)], \ X \in \mathbb{R}^{N} \tag 1
$$

现有

$$
P(X|Y_k) = N(\mu_k,\Sigma_k) \tag 2
$$

求对于观测$X$参数$Y$最大似然估计：

$$
L(X_1,X_2,\cdots,X_n|Y_k) = \prod_if(X_i|Y) \tag 3
$$

$$
\ln(L) = -\sum_i\ln\sqrt{(2\pi)^N\det(\Sigma_k)} -\frac{1}{2}\sum_i(X_i-\mu_k)^T\Sigma_k^{-1}(X_i-\mu_k) \tag{4}
$$

显然第一项是个常数项，第二项才影响最终的结果

$$
(Y_k)^*=\arg\max\ln(L) \\
=\arg\min (- \ln(L)) \\
=\arg\min\sum_i(X_i-\mu_k)^T\Sigma_k^{-1}(X_i-\mu_k) \tag 5
$$

看起来是什么样子？最小二乘！

