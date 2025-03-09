# Layout

`Collection` 是由 `repeat` 或 `duplicate` 运算生成的一组图形对象的集合。通过设置布局（`layout`），可以控制集合中图形对象的排列方式。以下是常用的布局方法：

## Collection.circularLayout(): this

将集合中的图形对象按照圆形排列。

### Parameters

无。

### Returns

返回 `this`，支持链式调用。

## Collection.stackLayout(direction, gap): this

将集合中的图形对象按照指定方向堆叠排列，并可以设置间距。向上是正方向。

### Parameters

| Parameter | Description                                                |
| --------- | ---------------------------------------------------------- |
| direction | 堆叠方向，可选值为 `"x"`（水平方向）或 `"y"`（垂直方向）。 |
| gap       | 图形对象之间的间距。                                       |

### Returns

返回 `this`，支持链式调用。

## Collection.alignLayout(orientation, anchor): this

将集合中的图形对象按照指定方向对齐，并可以设置对齐的参考线位置。向上是正方向。

### Parameters

| Parameter   | Description                                                                                             |
| ----------- | ------------------------------------------------------------------------------------------------------- |
| orientation | 对齐方向，可选值为 `"x"`（水平方向）或 `"y"`（垂直方向）。                                              |
| anchor      | 对齐的参考线位置，取值范围为 `[0, 1]`。例如，`0` 表示左/下对齐，`0.5` 表示中心对齐，`1` 表示右/上对齐。 |

### Returns

返回 `this`，支持链式调用。

## Collection.gridLayout(direction, itemsInRow, mainGap, crossGap, mainAnchor, crossAnchor): this

将集合中的图形对象按照网格排列，支持自定义行数、列数、间距和对齐方式。向上是正方向。

### Parameters

| Parameter   | Description                                                                              |
| ----------- | ---------------------------------------------------------------------------------------- |
| direction   | 网格排列方向，可选值为 `"lrtd"`（从左到右，从上到下）或 `"tdlr"`（从上到下，从左到右）。 |
| itemsInRow  | 每行的图形对象数量。                                                                     |
| mainGap     | 主方向（行或列）的间距。                                                                 |
| crossGap    | 交叉方向（列或行）的间距。                                                               |
| mainAnchor  | 主方向的对齐参考线位置，取值范围为 `[0, 1]`。                                            |
| crossAnchor | 交叉方向的对齐参考线位置，取值范围为 `[0, 1]`。                                          |

### Returns

返回 `this`，支持链式调用。

通过合理使用这些布局方法，可以快速实现复杂的图形排列效果。
