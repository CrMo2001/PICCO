# Operator

operator 对 Graphic Objects 进行操作，并且返回新的 Graphic Object

## combine(objects): Glyph

将多个图形对象合并为一个整体，并返回合并后的图形对象。

### Parameters

| parameter | type            | description                                              |
| --------- | --------------- | -------------------------------------------------------- |
| objects   | GraphicObject[] | 参与合并的图形对象数组。数组中靠后的元素会遮挡靠前的元素 |

### returns

返回合并后的图形对象，类型为 `Glyph`。你可以在该对象上设置被合并元素之间的约束关系。

## intersect(object, mask, ignore): Glyph

对两个图形对象进行相交运算，并返回相交后的结果。相交后的结果颜色取决于第一个对象

### Parameters

| parameter | type            | description                                                                           |
| --------- | --------------- | ------------------------------------------------------------------------------------- |
| object    | GraphicObject   | 参与相交运算的第一个元素                                                              |
| mask      | GraphicObject   | 参与相交运算的第二个元素                                                              |
| ignore?   | GraphicObject[] | 相交运算中忽略的元素。被忽略的元素将直接叠加在最终结果上，不参与相交运算。默认值为 [] |

### returns

返回相交运算后的结果对象，类型为 `Glyph`。你可以在该对象上设置参与运算元素之间的约束关系。

## repeat(object, key?): Collection

将一个图形对象重复多次，并将结果作为一个整体返回。

每个重复的实例会被分配到不同的数据。如果 key 被指定，则按照 key 对数据进行分组，每一个实例会被分配到一个数据组

### Parameters

| parameter | type          | description                                            |
| --------- | ------------- | ------------------------------------------------------ |
| object    | GraphicObject | 被重复的图形对象                                       |
| key?      | string        | 数据分组的列名。如果指定，数据将按照该列的值进行分组。 |

### returns

返回一个包含所有重复实例的对象，类型为 `Collection`。你可以在该对象上设置多个重复实例的 `layout`

## duplicate(object, number): Collection

将一个图形对象重复指定次数，并将结果作为一个整体返回

重复产生的每个实例都是完全相同的。

### Parameters

| parameter | type             | description                                                                                                |
| --------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| object    | GraphicObject    | 被重复的图形对象                                                                                           |
| number    | number \| string | 重复的次数。如果为数字，则表示重复的具体次数；如果为字符串，则表示按照数据中该列的数值大小动态确定重复次数 |

### returns

返回一个包含所有重复实例的对象，类型为 `Collection`。你可以在该对象上设置多个重复实例的 `layout`

## divide(object, direction, {key?, sizeEncode?, gap?}): GraphicObject

将一个图形对象分割为若干块，并将原图形转化为包含所有分块的整体，返回分割产生的块。

每个分块会被分配到不同的数据。如果 key 被指定，则按照 key 对数据进行分组，每一个分块会被分配到一个数据组

### Parameters

| parameter   | type          | description                                                                                         |
| ----------- | ------------- | --------------------------------------------------------------------------------------------------- |
| object      | GraphicObject | 被分割的图形对象                                                                                    |
| direction   | string        | 分割图形的方向。对于矩形或图片，可以选择 "x" 或 "y"；对于圆形或圆弧，可以选择 "angular" 或 "radial" |
| key?        | string        | 数据分组的列名。如果指定，实例将按照该列的值进行分组。                                              |
| sizeEncode? | string        | 如果指定，则在分割时按照数据中该列的值确定分块大小                                                  |
| gap         | number        | 分块之间的间距。默认为 0                                                                            |

### returns

返回分割产生的分块。

## link(object, {filter?, linkByData?, inEdge?, outEdge?, type?, shape?, curveness?, overlay?, ...style?}): LinkResult

在原有图形的基础上添加连接，并和原有图形合并之后返回。

连接支持两种方式：顺次连接 或 成对连接。在连接之前，需要为被连接的元素设置 linkId。

- 顺次连接：linkId 相同的元素会被分成一组，并依次连接。
- 成对连接：需要提供独立的数据，按照数据中 "source_id" 和 "target_id" 两列的值，寻找 linkId 匹配的元素进行连接。

在对两个元素进行连接时，可以指定两个元素的哪两条边之间连接。对于link的起始元素，link从该元素出发，这条边被称为 outEdge；对于link的结束元素，link从这条边进入，这条边被称为 inEdge

### Parameters

| parameter   | type                    | description                                                                             |
| ----------- | ----------------------- | --------------------------------------------------------------------------------------- |
| object      | GraphicObject           | 被添加连接的对象                                                                        |
| filter?     | string \| GraphicObject | 如果设置，则只会对指定类型的图形对象进行连接。默认为 "\*"，表示对所有对象进行连接       |
| linkByData? | boolean                 | 如果设置为 true，则按照独立的数据选择连接的起始和结束元素；否则将顺次连接所有指定的元素 |
| inEdge?     | string                  | link 在起始位置连接到元素的哪一条边                                                     |
| outEdge?    | string                  | link 在结束位置连接到元素的哪一条边                                                     |
| type?       | string                  | link 的类型，可选 "link" 或 "band" ，默认为 "band"                                      |
| shape?      | string                  | link 的形状，可选 "straight", "arc" 或 "bezier"，默认为 "straight"选                    |
| curveness?  | number                  | 当shape 为 "bezier" 时，曲线的弯曲程度，默认为30                                        |
| overlay?    | string                  | link 与原图形叠加时，叠加在上方还是下方。可选 "back" 或 "top"，默认为 "back"            |
| style?      | Style                   | link 的样式                                                                             |

### returns

返回一个合并了原始图形和连接线的对象，类型为 LinkResult
