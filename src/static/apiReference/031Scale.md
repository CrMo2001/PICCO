# Scale

在设置 encoding 时，可能需要精确指定数据值到视觉通道属性值的换算关系。例如：

- 希望数据中 12000 对应图形上 700 像素的长度
- 希望数据中 "February" 这一个类别对应画布中坐标为 350 的位置
- ...

Scale 可以实现换算关系的精确定义

## class LinearScale

实现 domain 到 range 的线性映射。domain 代表映射前数据值所在的区间；range 代表映射后屏幕空间值所在的区间。输入数据值会根据定义域和值域的比例关系，将结果映射到对应的屏幕空间值。

### constructor({domain?, range?})

| parameter | type             | description                  |
| --------- | ---------------- | ---------------------------- |
| domain?   | [number, number] | 映射的定义域，默认为自动确定 |
| range?    | [number, number] | 映射的值域，默认为自动确定   |

## class SquareRootScale

实现 domain 到 range 的开平方映射。domain 代表映射前数据值所在的区间；range 代表映射后屏幕空间值所在的区间。输入数据值会先被进行开平方运算，然后根据定义域和值域的比例关系，将结果映射到对应的屏幕空间值。

### constructor({domain?, range?})

| parameter | type             | description                  |
| --------- | ---------------- | ---------------------------- |
| domain?   | [number, number] | 映射的定义域，默认为自动确定 |
| range?    | [number, number] | 映射的值域，默认为自动确定   |

## class CategoricalScale

实现分类属性到数值的映射。domain 为分类属性列表，这些分类属性会被映射到 range 代表的区间中，按照顺序等距排列。

### constructor({domain?, range?, interval?})

| parameter | type             | description                                                                          |
| --------- | ---------------- | ------------------------------------------------------------------------------------ |
| domain?   | [number, number] | 映射的定义域，默认为自动确定                                                         |
| range?    | [number, number] | 映射的值域，和 interval 只需要指定一个即可，若都不指定则自动确定 interval            |
| interval? | number           | 映射后相邻两个类别的间距。和 range 只需要指定一个即可，若都不指定则自动确定 interval |
