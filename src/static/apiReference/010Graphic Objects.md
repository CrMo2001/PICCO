# Graphic Objects

Graphic Object 是表示图形的对象。
Graphic Object 可以：

- 被手动创建
- 被 operator 操作，来创造新的 Graphic Object
- 设置 visual channel 和 data field 之间的关系，也就是 encoding
- 设置 constraint，定义 Graphic Object 之间的相对位置和尺寸关系
- 设置 layout，从而批量控制若干 Graphic Object 的布局
- 添加 effect，实现一些装饰性效果
- 最后，Graphic Object 可以和数据绑定，输出为图像

尽管 Glyph 和 Collection 也是 Graphic Object，但它们不能被主动创建，只能依靠 operator 产生，因此不在该章节中。Glyph 详情参考 Constraint 一章，而 Collection 详情参考 Layout 一章

## class Picture

`Picture` 表示图片对象，继承自 `GraphicObject`

### constructor ({x?, y?, width?, height?, url?, opacity?, color?, colorMode?, keepRatio?})

| parameter  | type   | description                                                    |
| ---------- | ------ | -------------------------------------------------------------- |
| x?         | number | 图片左下角的 x 坐标。默认为`0`                                 |
| y?         | number | 图片左下角的 y 坐标。默认为`0`                                 |
| width?     | number | 图片宽度。默认为图片原始宽度                                   |
| height?    | number | 图片高度。默认为图片原始高度                                   |
| url?       | number | 图片的url。                                                    |
| opacity?   | number | 图片的不透明度。默认为 `1`                                     |
| color?     | number | 图片被重新上色的颜色。默认为 `undefined`，也就是不进行重新上色 |
| colorMode? | number | 图片被重新上色的方式。默认为 `"hue"`                           |

其中，colorMode的可选项包括

- `"hue"`: 重新上色时只改变图片的色相，保留饱和度和明度
- `"darkness"`: 重新上色时按照暗度进行颜色映射，暗度从0到1将映射为白色到目标颜色

## class Rect

`Rect` 表示矩形对象，继承自 `GraphicObject`

### constructor ({x?, y?, width?, height?, ...style})

| parameter | type   | description                      |
| --------- | ------ | -------------------------------- |
| x?        | number | 矩形左下角的 x 坐标。默认为`0`   |
| y?        | number | 矩形左下角的 y 坐标。默认为`0`   |
| width?    | number | 矩形的宽度。默认为`100`          |
| height?   | number | 矩形的高度。默认为`100`          |
| ...style  | Style  | 矩形的样式属性，如填充色、边框等 |

此处 style 为对象展开写法，可以直接在矩形的构造函数中定义 style 的具体参数，例如

```javascript
const rect = new Rect({x = 0, y = 0, fill = "red", strokeWidth = 2})
// 此处 fill 和 strokeWidth 可以直接在矩形的构造函数里设置
```

## class Circle

`Circle` 表示圆形对象，继承自 `GraphicObject`

### constructor ({x?, y?, r?, innerRadius?, ...style})

| parameter    | type   | description                           |
| ------------ | ------ | ------------------------------------- |
| x?           | number | 圆心的 x 坐标。默认为`0`              |
| y?           | number | 圆心的 y 坐标。默认为`0`              |
| r?           | number | 圆的半径。默认为`50`                  |
| innerRadius? | number | 圆的内半径（用于绘制圆环）。默认为`0` |
| ...style     | Style  | 圆的样式属性，如填充色、边框等        |

## class Point

`Point` 表示点对象，继承自 `GraphicObject`

### constructor ({x?, y?, size?, shape?, ...style})

| parameter | type   | description                    |
| --------- | ------ | ------------------------------ |
| x?        | number | 点的 x 坐标。默认为`0`         |
| y?        | number | 点的 y 坐标。默认为`0`         |
| size?     | number | 点的大小。默认为`2`            |
| shape?    | string | 点的形状。默认为`"circle"`     |
| ...style  | Style  | 点的样式属性，如填充色、边框等 |

## class Line

`Line` 表示线段对象，继承自 `GraphicObject`

### constructor ({x1?, y1?, x2?, y2?, ...style})

| parameter | type   | description                    |
| --------- | ------ | ------------------------------ |
| x1?       | number | 线段起点的 x 坐标。默认为`0`   |
| y1?       | number | 线段起点的 y 坐标。默认为`0`   |
| x2?       | number | 线段终点的 x 坐标。默认为`100` |
| y2?       | number | 线段终点的 y 坐标。默认为`100` |
| ...style  | Style  | 线段的样式属性，如颜色、宽度等 |

## class Text

`Text` 表示文本对象，继承自 `GraphicObject`

### constructor ({x?, y?, content?, ...style})

| parameter | type      | description                    |
| --------- | --------- | ------------------------------ |
| x?        | number    | 文本左下角的 x 坐标。默认为`0` |
| y?        | number    | 文本左下角的 y 坐标。默认为`0` |
| content?  | string    | 文本内容。默认为空字符串`""`   |
| ...style  | TextStyle | 文本的样式属性，如字体、颜色等 |

## class Axis

`Axis` 表示坐标轴对象，继承自 `GraphicObject`

### constructor (orientation, {tickPosition?, tickLength?, labelOffset?, fontSize?, position?, color?, showBaseline?, showTickLine?, showTickLabel?, numberTicks?, scale?})

| parameter      | type    | description                                                                    |
| -------------- | ------- | ------------------------------------------------------------------------------ |
| orientation    | string  | 坐标轴的方向，可选值为`"x"`、`"y"`、`"-x"`、`"-y"`                             |
| tickPosition?  | string  | 刻度线的位置，可选值为`"left"`、`"right"`、`"top"`、`"bottom"`。默认为`"left"` |
| tickLength?    | number  | 刻度线的长度。默认为`5`                                                        |
| labelOffset?   | number  | 刻度标签与刻度线的偏移量。默认为`10`                                           |
| fontSize?      | number  | 刻度标签的字体大小。默认为`16`                                                 |
| position?      | number  | 坐标轴的位置。默认为`0`                                                        |
| color?         | string  | 坐标轴的颜色。默认为`"#000"`                                                   |
| showBaseline?  | boolean | 是否显示基线。默认为`true`                                                     |
| showTickLine?  | boolean | 是否显示刻度线。默认为`true`                                                   |
| showTickLabel? | boolean | 是否显示刻度标签。默认为`true`                                                 |
| numberTicks?   | number  | 刻度的数量。默认为`5`                                                          |
| scale?         | Scale   | 坐标轴对应的 scale                                                             |

### Orientation 参数说明

- `orientation` 用于指定坐标轴的方向：
  - `"x"`：水平轴，从左到右。
  - `"y"`：垂直轴，从下到上。
  - `"-x"`：反向水平轴，从右到左。
  - `"-y"`：反向垂直轴，从上到下。

---

### TickPosition 参数说明

- `tickPosition` 用于指定刻度线的位置：
  - 对于水平轴（`"x"` 或 `"-x"`），可选值为 `"top"` 或 `"bottom"`。
  - 对于垂直轴（`"y"` 或 `"-y"`），可选值为 `"left"` 或 `"right"`。
