# Question 5 – CSS Layout

## Objective

Arrange three boxes horizontally while satisfying the following requirements:

- Left box should have a fixed width of **100px**.
- Right box should have a fixed width of **100px**.
- Middle box should automatically occupy the remaining available width.
- The layout should adapt when the container width changes.
- The contents of the three boxes should never overlap.

---

# Solution 1 – Flexbox

## CSS

```css
.container {
    display: flex;
    width: 100%;
}

.left,
.right {
    width: 100px;
    flex-shrink: 0;
}

.middle {
    flex: 1;
    min-width: 0;
}
```

### Explanation

- `display: flex` arranges all child elements in a single horizontal row.
- The left and right boxes are given a fixed width of **100px**.
- `flex-shrink: 0` prevents these fixed-width boxes from shrinking when the container becomes smaller.
- `flex: 1` allows the middle box to grow and occupy the remaining available width.
- `min-width: 0` ensures the middle content can shrink properly without causing overflow.

---

# Solution 2 – CSS Grid

## CSS

```css
.container {
    display: grid;
    grid-template-columns: 100px 1fr 100px;
}
```

### Explanation

- `display: grid` enables CSS Grid layout.
- `grid-template-columns: 100px 1fr 100px` creates three columns:
  - First column: fixed width of **100px**
  - Second column: takes the remaining available space (`1fr`)
  - Third column: fixed width of **100px**
- This ensures that the middle box expands automatically while the side boxes remain fixed.

---

# Comparison

| Feature | Flexbox | CSS Grid |
|----------|----------|----------|
| Horizontal Layout | ✅ | ✅ |
| Fixed Left & Right Width | ✅ | ✅ |
| Flexible Middle Section | ✅ | ✅ |
| Responsive | ✅ | ✅ |
| Simple for this use case | ⭐ Recommended | Good Alternative |

---

# Recommended Solution

Both approaches satisfy the requirements.

**Flexbox** is recommended because this is a one-dimensional layout (horizontal alignment), making the solution simpler and more intuitive.

**CSS Grid** is equally valid and is a good choice when designing more complex two-dimensional layouts.