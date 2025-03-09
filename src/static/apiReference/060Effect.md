# Effect

`GraphicObject` 支持通过添加效果（`effect`）来增强图形的视觉表现

## GraphicObject.shadowEffect(dx, dy, blur, color): this

为图形对象添加阴影效果。

### Parameters

| Parameter | Type     | Description                            |
| --------- | -------- | -------------------------------------- |
| dx      | number | 阴影在水平方向上的偏移量。默认为 `0`。 |
| dy      | number | 阴影在垂直方向上的偏移量。默认为 `0`。 |
| blur    | number | 阴影的模糊半径。默认为 `15`。          |
| color   | string | 阴影的颜色。默认为 `"black"`。         |

### Returns

- 返回 `this`，支持链式调用。

## GraphicObject.edgeBlurEffect(blur): this

为图形对象的边缘添加模糊效果。

### Parameters

| Parameter | Type     | Description                   |
| --------- | -------- | ----------------------------- |
| blur    | number | 边缘模糊的半径。默认为 `15`。 |

### Returns

- 返回 `this`，支持链式调用。
