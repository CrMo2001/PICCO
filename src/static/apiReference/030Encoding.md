# Encoding

encoding 即设置 Graphic Object 的 visual channel 和 data field 之间的关系。换句话说，让 Graphic Object 的某个 visual channel 表示数据中一个 field 的值，例如:

- 让矩形的高度表示数据中 "amount" 一列的值
- 让一个图形的颜色表示数据中 "category" 一列的值
- ...

设置 encoding 时，需要调用相关对象的 encode 成员方法，指定 visual channel 与 data field，以及相关的详细选项

## GraphicObject.encode(channel, field, {scale?, palette?, anchor?})

### Parameters

| parameter | type               | description                                                                                                                                                   |
| --------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| channel   | string             | 用于映射数据的 visual channel                                                                                                                                 |
| field     | string             | 映射的数据 field                                                                                                                                              |
| scale?    | Scale              | 将数据值映射到 visual channel 属性的换算关系，默认自动确定                                                                                                    |
| palette?  | string \| string[] | 将数据映射到颜色时的调色板，如果为 string 则为调色板的 scheme，如果为 string[] 则为颜色列表                                                                   |
| anchor    | number             | 如果旋选择的 visual channel 和位置相关，则该属属性用于设置具体的位置锚点，取值范围 0 到 1，代表锚点相对图形的比例位置。`0` 代表底部或左侧，`1` 代表顶部或右侧 |

### Returns

返回 `this`，支持链式调用。

## Visual Channels

下面的表格列举了每种 Graphic Object 可以使用的 visual channel

其中，linkId 这一属性不会影响图形的渲染，但可以决定 link 的连接方式，详情参考 operator 一章

| type       | visual channels                           |
| ---------- | ----------------------------------------- |
| Rect       | x, y, width, height, fill, stroke, linkId |
| Circle     | x, y, width, height, fill, stroke, linkId |
| Picture    | x, y, width, height, url, color, linkId   |
| Point      | x, y, linkId                              |
| Line       | x, y, length, linkId                      |
| Text       | x, y, content                             |
| Glyph      | x, y, width, height                       |
| Collection | x, y, width, height                       |
| LinkResult | x, y, width, height, linkWidth            |
