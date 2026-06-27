# Question 1 – Pattern Printing

## Problem Statement

Write a JavaScript function that takes an integer `n` as input and prints the following pattern.

**Example (`n = 4`)**

```text
1
21
321
4321
```

---

# Approaches

## Solution 1 – Nested `for` Loops (Recommended)

### Approach

* Use an outer loop to iterate through each row.
* Use an inner loop to print numbers from the current row number down to `1`.
* Print the completed row.

### Time Complexity

**O(n²)**

### Space Complexity

**O(1)**

### Why this solution?

* Easy to understand.
* Most commonly used in coding interviews.
* Requires constant extra space.

---

## Solution 2 – `Array.from()`

### Approach

* Create an array of length equal to the current row.
* Generate descending numbers using the array index.
* Convert the array into a string using `join("")`.

### Time Complexity

**O(n²)**

### Space Complexity

**O(n)**

### Why this solution?

* Demonstrates knowledge of modern JavaScript (ES6+).
* Produces concise and readable code.

---

## Solution 3 – Recursion

### Approach

* Use a recursive function to build one row.
* The recursion appends the current number and calls itself with `num - 1`.
* Stop when the number reaches zero.

### Time Complexity

**O(n²)**

### Space Complexity

**O(n)**

### Why this solution?

* Demonstrates understanding of recursion.
* Useful for learning recursive problem solving.

---

# Recommended Solution

The nested `for` loop approach is recommended because it is simple, efficient, and easy to explain during interviews.
