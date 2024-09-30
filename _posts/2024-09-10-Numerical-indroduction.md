---
title: "Numerical Analysis: Introduction"

categories:
  - blogs
tags:
  - numerical analysis
  - math

header: 
  teaser: "./assets/images/NA:indro.jpg"
---

To study a subject and understand a field, it's essential to explore its background and the issues it aims to address. In the case of **numerical analysis**, which focuses on **scientific and engineering computation**, the main concern is how to achieve faster computation and less storage usage in the context of **computer calculations**. The issues it addresses include, but are not limited to, **solving nonlinear equations and systems of equations**, **solving linear systems of equations**, **interpolation and approximation**, **numerical integration**, **ordinary differential equations**, and **computing matrix eigenvalues and eigenvectors**. In the field of engineering, numerical analysis is considered a mandatory course as it helps solve many problems.

To study numerical analysis, it's important not only to focus on classical algorithms but also on these key points:

### Errors

Numerical analysis deals with numerical solutions, primarily focusing on the errors between computed results and true values. Errors can be categorized into **inherent errors** and **computational errors**.

**Inherent Errors** arise from the limitations of the chosen **model** and the provided **data** before the computation step. These are not controllable within numerical computation. Since the task of numerical computation is to process the given model data to obtain results, we do not focus on inherent errors in numerical analysis.

**Computational Errors** have two main sources: **truncation** errors and **rounding** errors. These can be understood with examples:

- A Taylor series is infinite, but we take the first N terms, truncating the rest, leading to **truncation errors**, which occur when a finite process approximates an infinite one.
- Computers have limited precision. For instance, when representing fractions like $\frac{1}{3}$ , keeping only three decimal places results in 0.333, introducing **rounding errors**.

In addition, regarding errors, there is an interesting counterintuitive example. *Which result is more accurate - when the precise value is 1 but the computed result is 0, or when the precise value is 100 but the computed result is 99?*

Therefore, we introduce two different error measurement standards：

- **Absolute Error**：$\varepsilon=x-\widetilde{x}$
- **Relative Error**：$\varepsilon= \frac{x-\widetilde{x}}{x}$

### Time Complexity

Time complexity primarily focuses on the number of calculations required to achieve the ideal result in numerical computations, which is easy to understand - the fewer, the better. There's a well-known and interesting example, the **Qin Jiushao** (1208－1268) algorithm for calculating polynomials, also known as the **Horner** (1786-1837) Method in the English-speaking community."

For a polynomial of degree$(1)$，directly computing the value of the polynomial using $x$ requires $n$ additions and  $\frac{n(n+1)}{2}$ multiplications.

$$
P_n(x) = a_nx^n + a_{n-1}x^{n-1} + \dots + a_1x + a_0 \tag 1
$$

However, if we rewrite the polynomial $(1)$ in the form of $(2)$, the computation only requires $n$ additions and $n$ multiplications.

$$
P_n(x) = ((a_nx + a_{n-1})x + \dots + a_1)x + a_0 \tag 2
$$

### Stability

Numerical computations often involve iterative and approximative processes. If there is an amplification of **rounding errors** during the calculation, the final result will be extremely inaccurate."





