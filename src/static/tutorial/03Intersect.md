# 学习使用 intersect

在本节教程中，我们将创建一个基于水位的人体图。这个图的特点是每个柱子由人体形状和水位矩形组成，水位的高度由数据决定。我们将逐步解析代码，并解释每一步的作用。

## 1. 准备数据

首先，我们定义了一组数据，表示不同类别的数值：

```typescript
const data = [
  { category: 'A', amount: 70 },
  { category: 'B', amount: 40 },
  { category: 'C', amount: 40 },
  { category: 'D', amount: 30 },
  { category: 'E', amount: 50 },
  { category: 'F', amount: 60 },
]
```

- `category`：表示类别。
- `amount`：表示数值，将用于确定水位的高度。

## 2. 创建人体形状和水位矩形

接下来，我们创建了人体形状和水位矩形。人体形状由两张图片组成：`shape` 和 `border`，水位矩形是一个 `Rect` 对象。

```typescript
const shape = new Picture({ url: 'examples/human/human_shape.png' })
const border = new Picture({ url: 'examples/human/human_border.png' })
const water = new Rect({ fill: 'skyblue', height: 450 }).encode('height', 'amount')
```

- `shape`：人体形状的图片。
- `border`：人体边框的图片。
- `water`：水位矩形，填充颜色为 `skyblue`，初始高度为 `450`。通过 `encode` 方法将高度与数据的 `amount` 字段绑定。

## 3. 组合水位矩形和人体形状

我们将水位矩形与人体形状进行相交运算，并设置它们之间的约束关系。

```typescript
const g1 = intersect(water, shape)
  .align(water, shape, 'x') // 水位矩形与人体形状在 x 方向对齐
  .equal(water, shape, { channel: 'width' }) // 水位矩形与人体形状宽度相等
```

- `intersect`：对水位矩形和人体形状进行相交运算，生成一个新的图形对象 `g1`。
- `align`：将水位矩形与人体形状在 x 方向对齐。
- `equal`：确保水位矩形与人体形状的宽度相等。

## 4. 组合图形并添加边框

我们将相交后的图形 `g1` 与人体边框 `border` 组合在一起，并设置它们之间的约束关系。

```typescript
const g2 = union([g1, border])
  .align(border, g1, 'x') // 边框与 g1 在 x 方向对齐
  .encode('x', 'category') // 将 x 坐标与数据的 category 字段绑定
```

- `union`：将 `g1` 和 `border` 合并为一个整体。
- `align`：将 `border` 与 `g1` 在 x 方向对齐。
- `encode`：将图形的 `x` 坐标与数据的 `category` 字段绑定。

## 5. 重复图形

使用 `repeat` 操作符，将图形 `g2` 重复多次，每个图形对应一个数据点。

```typescript
const collection = repeat(g2)
```

- `repeat`：根据数据的数量生成多个图形。

## 6. 渲染图形

最后，我们使用 `show` 函数将图形渲染到页面上。

```typescript
show([[collection, data]], document.body, {})
```

- `show`：将图形渲染到 `document.body` 中。

## 7. 最终效果

运行以上代码后，你将看到一个基于水位的人体图：

- 每个柱子由人体形状和水位矩形组成。
- 水位的高度由数据的 `amount` 字段决定。
- 人体边框用于增强视觉效果。
