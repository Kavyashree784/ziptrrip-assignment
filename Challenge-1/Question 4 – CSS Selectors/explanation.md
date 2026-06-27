# Question 4 – CSS Selectors

## HTML

```html
01  <div id="container">
02    <div class="box"></div>
03
04    <div class="box-2"></div>
05    <div>
06      <div class="box"></div>
07    </div>
08  </div>
09
10  <div class="box"></div>
```

---

## 1. `.box`

### Selected Lines

* Line 2
* Line 6
* Line 10

### Explanation

The `.box` selector matches every element whose class is **box**.

**Why these lines are selected**

* **Line 2** → `<div class="box"></div>`
* **Line 6** → `<div class="box"></div>`
* **Line 10** → `<div class="box"></div>`

Each of these elements has `class="box"`.

**Why other lines are not selected**

* **Line 4** has `class="box-2"`, which is a different class.
* **Lines 1 and 5** do not have a `class="box"` attribute.

---

## 2. `div .box`

### Selected Lines

* Line 2
* Line 6

### Explanation

This selector matches any element with class **box** that is a **descendant** of a `<div>` element.

**Why these lines are selected**

* **Line 2** is inside the `<div id="container">`.
* **Line 6** is inside the `<div>` on line 5, which is itself inside the container.

**Why other lines are not selected**

* **Line 10** is not inside another `<div>`; it is a sibling of the outer container.
* **Line 4** does not have class `box`.

---

## 3. `div.box`

### Selected Lines

* Line 2
* Line 6
* Line 10

### Explanation

`div.box` is a **compound selector** that matches elements which are:

* a `<div>` element **and**
* have the class `box`.

**Why these lines are selected**

All three elements are `<div>` elements with `class="box"`.

**Why other lines are not selected**

* **Line 4** has class `box-2`, not `box`.
* **Lines 1 and 5** do not have class `box`.

---

## 4. `[class]`

### Selected Lines

* Line 2
* Line 4
* Line 6
* Line 10

### Explanation

The `[class]` attribute selector matches every element that has a **class** attribute, regardless of its value.

**Why these lines are selected**

Each of these elements contains a `class` attribute.

**Why other lines are not selected**

* **Line 1** only has an `id` attribute.
* **Line 5** has no attributes.

---

## 5. `#container .box`

### Selected Lines

* Line 2
* Line 6

### Explanation

This selector matches every `.box` element that is a descendant of the element with `id="container"`.

**Why these lines are selected**

* **Line 2** is directly inside `#container`.
* **Line 6** is nested inside another `<div>` within `#container`.

**Why other lines are not selected**

* **Line 10** is outside the container.
* **Line 4** does not have class `box`.

---

## 6. `#container > .box`

### Selected Lines

* Line 2

### Explanation

The `>` operator is the **child combinator**. It matches only **direct children** of the parent element.

**Why this line is selected**

* **Line 2** is a direct child of `#container`.

**Why other lines are not selected**

* **Line 6** is a grandchild of `#container`, not a direct child.
* **Line 10** is outside the container.
* **Line 4** is a direct child of `#container` but has class `box-2`, not `box`.

---

## Summary

| Selector            | Selected Lines |
| ------------------- | -------------- |
| `.box`              | 2, 6, 10       |
| `div .box`          | 2, 6           |
| `div.box`           | 2, 6, 10       |
| `[class]`           | 2, 4, 6, 10    |
| `#container .box`   | 2, 6           |
| `#container > .box` | 2              |
