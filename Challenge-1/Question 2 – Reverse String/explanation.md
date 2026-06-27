# Question 2 – Reverse String

## Problem Statement

Reverse the characters of a given string.

**Input**

```text
Bhaskara
```

**Output**

```text
araksahB
```

---

# Approaches

## Solution 1 – Using a `for` Loop (Recommended)

### Approach

* Traverse the string from the last character to the first.
* Append each character to a new string.
* Print the reversed string.

### Time Complexity

**O(n)**

### Space Complexity

**O(n)**

### Why this solution?

* Works in every JavaScript environment.
* Easy to understand.
* Frequently expected in interviews.

---

## Solution 2 – `split()`, `reverse()`, and `join()`

### Approach

* Convert the string into an array using `split("")`.
* Reverse the array using `reverse()`.
* Convert it back into a string using `join("")`.

### Time Complexity

**O(n)**

### Space Complexity

**O(n)**

### Why this solution?

* Short and readable.
* Uses built-in JavaScript methods.

---

## Solution 3 – `reduceRight()`

### Approach

* Convert the string into an array.
* Traverse the array from right to left using `reduceRight()`.
* Build the reversed string.

### Time Complexity

**O(n)**

### Space Complexity

**O(n)**

### Why this solution?

* Demonstrates knowledge of JavaScript array methods.
* Shows familiarity with functional programming concepts.

---

# Recommended Solution

The `for` loop approach is recommended because it clearly demonstrates the reversing logic without relying on built-in helper methods.
