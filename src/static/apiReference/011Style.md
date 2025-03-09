# Style

`Style` 和 `TextStyle` 是用于定义图形对象和文本对象样式的类型。它们可以用于设置填充颜色、边框颜色、字体等属性。

## type Style

`Style` 类型用于定义图形对象（如 `Rect`、`Circle`、`Line` 等）的样式属性。

### Properties

| Property       | Type   | Description                              |
| -------------- | ------ | ---------------------------------------- |
| `fill?`        | string | 图形的填充颜色                           |
| `stroke?`      | string | 图形的边框颜色                           |
| `strokeWidth?` | number | 图形的边框宽度                           |
| `opacity?`     | number | 图形的不透明度。默认为 `1`（完全不透明） |

## type TextStyle

`TextStyle` 类型用于定义文本对象的样式属性。

### Properties

| Property      | Type   | Description                                         |
| ------------- | ------ | --------------------------------------------------- |
| `fontSize?`   | number | 文本的字体大小                                      |
| `fill?`       | string | 文本的填充颜色                                      |
| `textAnchor?` | string | 文本的对齐方式（如 `"start"`、`"middle"`、`"end"`） |
| `fontFamily?` | string | 文本的字体家族（如 `"Arial"`）                      |
| `fontWeight?` | string | 文本的字体粗细（如 `"normal"`、`"bold"`）           |
