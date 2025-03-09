# 学习使用 duplicate

在本节教程中，我们将创建一个基于现金堆叠的图表。这个图表的特点是每个柱子由多个现金图片堆叠而成，堆叠的数量由数据决定，并且每个柱子顶部显示对应的数值标签。我们将逐步解析代码，并解释每一步的作用。

## 1. 准备数据

首先，我们定义了一组数据，表示不同类别的数值：

```typescript
const data = [
  { category: 'A', amount: 17 },
  { category: 'B', amount: 14 },
  { category: 'C', amount: 14 },
  { category: 'D', amount: 13 },
  { category: 'E', amount: 15 },
  { category: 'F', amount: 16 },
]
```

- `category`：表示类别。
- `amount`：表示数值，将用于确定现金图片的堆叠数量。

## 2. 创建现金图片

接下来，我们创建了一个现金图片对象 `cash`，并设置了其宽度和高度。

```typescript
const cash = new Picture({ url: 'examples/cash/cash.png', width: 100, height: 100 })
```

- `cash`：现金图片，宽度和高度均为 `100`。

## 3. 堆叠现金图片

使用 `duplicate` 操作符，将现金图片重复多次，堆叠的数量由数据的 `amount` 字段决定。

```typescript
const cashStack = duplicate(cash, 'amount')
  .stackLayout('y', -70) // 沿 y 轴堆叠，间距为 -70
  .encode('x', 'category') // 将 x 坐标与数据的 category 字段绑定
```

- `duplicate`：根据数据的 `amount` 字段重复现金图片。
- `stackLayout`：将现金图片沿 y 轴堆叠，间距为 `-70`（负值表示向上堆叠）。
- `encode`：将堆叠后的现金图片的 `x` 坐标与数据的 `category` 字段绑定。

## 4. 创建数值标签

我们创建了一个文本对象 `label`，用于显示每个柱子的数值。

```typescript
const label = new Text({ fontSize: 30, textAnchor: 'middle', fontWeight: 'bold' }).encode(
  'content',
  'amount',
) // 将文本内容与数据的 amount 字段绑定
```

- `label`：文本对象，字体大小为 `30`，居中对齐，字体加粗。
- `encode`：将文本内容与数据的 `amount` 字段绑定。

## 5. 组合现金堆叠和标签

我们将现金堆叠 `cashStack` 和标签 `label` 组合在一起，并设置它们之间的约束关系。

```typescript
const glyph = combine([cashStack, label]).connect(label, cashStack, { anchor: [0.5, 1] }) // 将标签连接到现金堆叠的顶部中心
```

- `combine`：将现金堆叠和标签合并为一个整体。
- `connect`：将标签连接到现金堆叠的顶部中心位置。

## 6. 重复图形

使用 `repeat` 操作符，将组合后的图形 `glyph` 重复多次，每个图形对应一个数据点。

```typescript
const collection = repeat(glyph)
```

- `repeat`：根据数据的数量生成多个图形。

## 7. 创建 x 轴

我们创建了 x 轴，用于显示类别。

```typescript
const xAxis = new Axis('x', { showTickLine: false }) // 不显示刻度线
```

- `xAxis`：x 轴，表示类别，不显示刻度线。

## 8. 组合图形并渲染

最后，我们将图形和 x 轴组合在一起，并使用 `show` 函数将其渲染到页面上。

```typescript
const chart = combine([collection, xAxis])

show([[chart, data]], document.body, {})
```

- `combine`：将图形和 x 轴合并为一个整体。
- `show`：将图形渲染到 `document.body` 中。

## 9. 最终效果

运行以上代码后，你将看到一个基于现金堆叠的图表：

- 每个柱子由多个现金图片堆叠而成，堆叠的数量由数据的 `amount` 字段决定。
- 每个柱子顶部显示对应的数值标签。
- x 轴显示类别。
