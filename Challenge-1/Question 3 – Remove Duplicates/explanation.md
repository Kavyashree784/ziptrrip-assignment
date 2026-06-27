# Question 3 – Remove Duplicates from an Array

## Problem Statement

Given an array containing duplicate values, remove the duplicates while preserving the order of the first occurrence.

**Input**

```text
[1, 2, 3, 6, 4, 3, 7, 4, 2, 6, 8, 2, 5, 9, 0, 1]
```

**Output**

```text
[1, 2, 3, 6, 4, 7, 8, 5, 9, 0]
```

---

# Approaches

## Solution 1 – Using `Set` (Recommended)

### Approach

* Convert the array into a `Set`.
* A `Set` stores only unique values.
* Convert the `Set` back into an array using the spread operator (`...`).

### Time Complexity

**O(n)**

### Space Complexity

**O(n)**

### Why this solution?

* Simple and efficient.
* Preserves insertion order.
* Most commonly used in modern JavaScript.

---

## Solution 2 – Using `filter()` and `indexOf()`

### Approach

* Traverse the array using `filter()`.
* Keep only the first occurrence of each element by comparing the current index with `indexOf()`.

### Time Complexity

**O(n²)**

### Space Complexity

**O(n)**

### Why this solution?

* Does not require `Set`.
* Useful for understanding array traversal and filtering.

---

## Solution 3 – Using `reduce()`

### Approach

* Traverse the array using `reduce()`.
* Build a new array.
* Add an element only if it is not already present.

### Time Complexity

**O(n²)**

### Space Complexity

**O(n)**

### Why this solution?

* Demonstrates functional programming techniques.
* Shows how to accumulate results using `reduce()`.

---

# Recommended Solution

Using a `Set` is the preferred solution because it is concise, preserves the original order of elements, and has linear time complexity.
