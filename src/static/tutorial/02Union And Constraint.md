# 学会使用 union 和 constraint

在本教程中，我们将创建一个基于铅笔图片的柱状图。这个柱状图的特点是每个柱子由三部分组成：铅笔的顶部、中部和底部。我们将逐步解析代码，并解释每一步的作用。

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
- `amount`：表示数值，将用于确定铅笔的高度。

## 2. 创建铅笔的各个部分

接下来，我们创建了铅笔的三个部分：顶部、中部和底部。每个部分都是一个 `Picture` 对象，表示一张图片。

```typescript
const pencilTop = new Picture({ url: 'examples/pencil/top.png', y: 600 }).encode('y', 'amount', {
  anchor: 1,
})

const pencilMiddle = new Picture({ url: 'examples/pencil/middle.png' })

const pencilBottom = new Picture({ url: 'examples/pencil/bottom.png', width: 100 })
```

- `pencilTop`：铅笔的顶部部分。我们通过 `encode` 方法将 `y` 坐标与数据的 `amount` 字段绑定，`anchor: 1` 表示锚点在顶部。
- `pencilMiddle`：铅笔的中部部分。
- `pencilBottom`：铅笔的底部部分，设置了固定的宽度为 `100`。

## 3. 组合铅笔的各个部分

我们将铅笔的顶部、中部和底部组合成一个完整的铅笔图形，并设置它们之间的约束关系。

```typescript
const pencil = union([pencilTop, pencilMiddle, pencilBottom])
  .equal(pencilTop, pencilBottom, { channel: 'width' }) // 顶部和底部宽度相等
  .equal(pencilMiddle, pencilBottom, { channel: 'width' }) // 中部和底部宽度相等
  .align(pencilMiddle, pencilTop, 'y', { sourceAnchor: 'top', targetAnchor: 'bottom' }) // 中部顶部与顶部底部对齐
  .align(pencilMiddle, pencilBottom, 'y', { sourceAnchor: 'bottom', targetAnchor: 'top' }) // 中部底部与底部顶部对齐
  .encode('x', 'category') // 将 x 坐标与数据的 category 字段绑定
```

- `union`：将铅笔的三个部分合并为一个整体。
- `equal`：确保顶部、中部和底部的宽度相等。
- `align`：设置中部与顶部、底部的对齐方式。
- `encode`：将铅笔的 `x` 坐标与数据的 `category` 字段绑定。

## 4. 重复铅笔图形

使用 `repeat` 操作符，将铅笔图形重复多次，每个铅笔对应一个数据点。

```typescript
const collection = repeat(pencil)
```

- `repeat`：根据数据的数量生成多个铅笔图形。

## 5. 创建坐标轴

我们创建了 x 轴和 y 轴，用于显示类别和数值。

```typescript
const xAxis = new Axis('x', { position: -10 })
const yAxis = new Axis('y', { position: -100 })
```

- `xAxis`：x 轴，表示类别。
- `yAxis`：y 轴，表示数值。

## 6. 组合图形并渲染

最后，我们将铅笔图形和坐标轴组合在一起，并使用 `show` 函数将其渲染到页面上。

```typescript
const chart = union([collection, xAxis, yAxis])

show([[chart, data]], document.body, {})
```

- `union`：将铅笔图形和坐标轴合并为一个整体。
- `show`：将图形渲染到 `document.body` 中。

## 7. 最终效果

运行以上代码后，你将看到一个基于铅笔图片的柱状图：

- 每个柱子由铅笔的顶部、中部和底部组成。
- 柱子的高度由数据的 `amount` 字段决定。
- x 轴显示类别，y 轴显示数值。
