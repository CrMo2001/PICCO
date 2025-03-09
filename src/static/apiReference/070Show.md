# show

`show` 是一个用于将图形对象（`GraphicObject`）或图形对象与数据绑定的组合（`[GraphicObject, Data]`）渲染到指定容器中的函数。

## show(objects, container, config)

将图形对象或图形对象与数据的组合渲染到指定的 HTML 元素容器中。

### Parameters

| Parameter | Type                                       | Description                                    |
| --------- | ------------------------------------------ | ---------------------------------------------- |
| objects   | (GraphicObject \| [GraphicObject, Data])[] | 需要渲染的图形对象或图形对象与数据的组合数组。 |
| container | HTMLElement                                | 渲染的目标 HTML 元素容器。                     |
| config    | any                                        | 渲染配置项                                     |

### Returns

- 无返回值。

### 参数说明

1. `objects`

   - 可以是一个 `GraphicObject` 对象，表示直接渲染该图形。
   - 也可以是一个 `[GraphicObject, Data]` 元组，表示将图形对象与数据绑定后再渲染。

2. `container`

   - 目标 HTML 元素容器，图形将被渲染到该容器中。

3. `config`
   - 渲染配置项，支持自定义 `background`, `padding` 等选项
