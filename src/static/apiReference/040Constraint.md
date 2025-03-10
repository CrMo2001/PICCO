# Constraint

约束（Constraint）用于定义由 `union` 或 `intersect` 操作生成的 `Glyph` 中，参与运算的图形对象（`GraphicObject`）之间的相对位置、尺寸或旋转关系。通过约束，可以实现图形之间的对齐、连接、等值或旋转等操作。以下是四种约束的详细说明：

## Glyph.connect(source, target, {sourceAnchor?, targetAnchor?, anchor?, offset?})

`connect` 用于将一个图形对象（`source`）连接到另一个图形对象（`target`）上。连接的位置由 `sourceAnchor` 和 `targetAnchor` 确定的锚点决定，并可以通过 `offset` 进行偏移。

### Parameters

| Parameter     | Type                                 | Description                                                  |
| ------------- | ------------------------------------ | ------------------------------------------------------------ |
| source        | GraphicObject                        | 源图形对象，即需要被连接的图形。                             |
| target        | GraphicObject                        | 目标图形对象，即连接的目标图形。                             |
| sourceAnchor? | [number, number] \| [string, string] | 源图形对象的锚点位置。默认为 `[0.5, 0.5]`（中心点）。        |
| targetAnchor? | [number, number] \| [string, string] | 目标图形对象的锚点位置。默认为 `[0.5, 0.5]`（中心点）。      |
| anchor?       | [number, number] \| [string, string] | 如果提供，则同时作为 `sourceAnchor` 和 `targetAnchor` 的值。 |
| offset?       | [number, number]                     | 连接后的偏移量。默认为 `[0, 0]`。                            |

### Returns

返回 `this`，支持链式调用。

### Anchor 参数说明

- `sourceAnchor` 和 `targetAnchor` 分别用于指定源图形和目标图形的锚点位置。
- 如果提供了 `anchor` 参数，则 `sourceAnchor` 和 `targetAnchor` 都会被设置为 `anchor` 的值。
- 锚点可以是数值（如 `0.5` 表示中心点）或字符串（如 `"left"`、`"right"`、`"top"`、`"bottom"`）。
- 左下角的锚点为 `[0, 0]`，右上角的锚点为 `[1, 1]`

## Glyph.align(source, target, direction, {sourceAnchor?, targetAnchor?, anchor?, offset?})

`align` 用于将一个图形对象（`source`）沿着指定方向（`direction`）与另一个图形对象（`target`）对齐。对齐的参考线由 `sourceAnchor` 和 `targetAnchor` 确定，并可以通过 `offset` 进行偏移。

### Parameters

| Parameter     | Type             | Description                                                              |
| ------------- | ---------------- | ------------------------------------------------------------------------ |
| source        | GraphicObject    | 源图形对象，即需要对齐的图形。                                           |
| target        | GraphicObject    | 目标图形对象，即对齐的目标图形。                                         |
| direction?    | string           | 对齐方向，可选值为 `"x"`（水平方向）或 `"y"`（垂直方向）。默认为 `"x"`。 |
| sourceAnchor? | number \| string | 源图形对象的参考线位置。默认为 `0.5`（中心点）。                         |
| targetAnchor? | number \| string | 目标图形对象的参考线位置。默认为 `0.5`（中心点）。                       |
| anchor?       | number \| string | 如果提供，则同时作为 `sourceAnchor` 和 `targetAnchor` 的值。             |
| offset?       | number           | 对齐后的偏移量。默认为 `0`。                                             |

### Returns

返回 `this`，支持链式调用。

### Anchor 参数说明

- `sourceAnchor` 和 `targetAnchor` 分别用于指定源图形和目标图形的参考线位置。
- 如果提供了 `anchor` 参数，则 `sourceAnchor` 和 `targetAnchor` 都会被设置为 `anchor` 的值。
- 参考线可以是数值（如 `0.5` 表示中心点）或字符串（如 `"left"`、`"right"`、`"top"`、`"bottom"`）。
- `0` 代表底部或左侧，`1` 代表顶部或右侧

## Glyph.equal(source, target, {sourceChannel?, targetChannel?, channel?})

`equal` 用于将一个图形对象（`source`）的某个属性（`sourceChannel`）设置为与另一个图形对象（`target`）的某个属性（`targetChannel`）相等。

### Parameters

| Parameter      | Type          | Description                                                    |
| -------------- | ------------- | -------------------------------------------------------------- |
| source         | GraphicObject | 源图形对象，即需要设置属性的图形。                             |
| target         | GraphicObject | 目标图形对象，即属性参考的目标图形。                           |
| sourceChannel? | string        | 源图形对象的属性名称（如 `"width"`、`"height"`）。             |
| targetChannel? | string        | 目标图形对象的属性名称（如 `"width"`、`"height"`）。           |
| channel?       | string        | 如果提供，则同时作为 `sourceChannel` 和 `targetChannel` 的值。 |

### Returns

返回 `this`，支持链式调用。

### Channel 参数说明

- `sourceChannel` 和 `targetChannel` 分别用于指定源图形和目标图形的属性名称。
- 如果提供了 `channel` 参数，则 `sourceChannel` 和 `targetChannel` 都会被设置为 `channel` 的值。

## Glyph.rotate(source, target, offset?)

`rotate` 用于将一个图形对象（`source`）旋转到与另一个图形对象（`target`）相同的角度，并可以额外增加一个偏移角度（`offset`）。旋转以角度为单位，顺时针方向为正方向。

### Parameters

| Parameter | Type          | Description                                                    |
| --------- | ------------- | -------------------------------------------------------------- |
| source    | GraphicObject | 源图形对象，即需要旋转的图形。                                 |
| target    | GraphicObject | 目标图形对象，即旋转参考的目标图形。                           |
| offset?   | number        | 旋转后的偏移角度（以角度为单位，顺时针为正方向）。默认为 `0`。 |

### Returns

返回 `this`，支持链式调用。
