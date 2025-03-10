declare module 'PICCO' {
  class GraphicObject {
    constructor()
    setAttr(key: string, value: any): void
    encode(
      channel: string,
      field: string,
      {
        anchor,
        scale,
        palette,
      }?: {
        anchor?: number
        scale?: IScale
        palette?: string | string[]
      },
    ): this
    fix(channel: string, value: number, anchor?: number): this
    fixPosition(x: number, y: number): this
    shadowEffect(dx?: number, dy?: number, blur?: number, color?: string): this
    edgeBlurEffect(blur?: number): this
  }

  class Division extends GraphicObject {
    constructor(
      parent: GraphicObject,
      direction: string,
      key: string | undefined,
      sizeEncode: string | undefined,
      gap: number,
    )
    divide(
      direction: string,
      key: string | undefined,
      sizeEncode: string | undefined,
      gap: number,
    ): Division
    sort(field: string, descending?: boolean): this
  }
  class Rect extends GraphicObject {
    constructor({
      x,
      y,
      width,
      height,
      ...style
    }?: {
      x?: number
      y?: number
      width?: number
      height?: number
    } & Style)
  }
  class Circle extends GraphicObject {
    constructor({
      x,
      y,
      r,
      innerRadius,
      ...style
    }?: {
      x?: number
      y?: number
      r?: number
      innerRadius?: number
    } & Style)
  }
  class Point extends GraphicObject {
    constructor({
      x,
      y,
      size,
      shape,
      ...style
    }?: {
      x?: number
      y?: number
      size?: number
      shape?: string
    } & Style)
  }
  class Line extends GraphicObject {
    constructor({
      x1,
      y1,
      x2,
      y2,
      ...style
    }?: {
      x1?: number
      y1?: number
      x2?: number
      y2?: number
    } & Style)
  }
  class Text extends GraphicObject {
    constructor({
      x,
      y,
      content,
      ...style
    }?: {
      x?: number
      y?: number
      content?: string
    } & TextStyle)
  }
  class Axis extends GraphicObject {
    constructor(
      orientation: 'x' | 'y' | '-x' | '-y',
      {
        tickPosition,
        tickLength,
        labelOffset,
        fontSize,
        position,
        color,
        showBaseline,
        showTickLine,
        showTickLabel,
        numberTicks,
        scale,
      }?: {
        tickPosition?: 'left' | 'right' | 'top' | 'bottom'
        tickLength?: number
        labelOffset?: number
        fontSize?: number
        position?: number
        color?: string
        showBaseline?: boolean
        showTickLine?: boolean
        showTickLabel?: boolean
        numberTicks?: number
        scale?: IScale
      },
    )
  }
  class Picture extends GraphicObject {
    constructor({
      x,
      y,
      width,
      height,
      url,
      opacity,
      color,
      colorMode,
      keepRatio,
    }?: {
      x?: number
      y?: number
      width?: number
      height?: number
      url?: string
      opacity?: number
      color?: string
      colorMode?: string
      keepRatio?: boolean
    })
  }
  class Collection extends GraphicObject {
    sort(field: string, descending: boolean): this
    circularLayout(): this
    stackLayout(direction: string, gap: number): this
    alignLayout(orientation: string, anchor: number): this
    gridLayout(
      direction?: string,
      itemsInRow?: number,
      mainGap?: number,
      crossGap?: number,
      mainAnchor?: number,
      crossAnchor?: number,
    ): this
  }
  class Glyph extends GraphicObject {
    connect(
      source: GraphicObject,
      target: GraphicObject,
      {
        sourceAnchor,
        targetAnchor,
        anchor,
        offset,
      }?: {
        sourceAnchor?: [number | string, number | string] | number | string
        targetAnchor?: [number | string, number | string] | number | string
        anchor?: [number | string, number | string] | number | string
        offset?: [number, number]
      },
    ): this
    align(
      source: GraphicObject,
      target: GraphicObject,
      direction: string,
      {
        sourceAnchor,
        targetAnchor,
        anchor,
        offset,
      }?: {
        sourceAnchor?: number | string
        targetAnchor?: number | string
        anchor?: number | string
        offset?: number
      },
    ): this
    equal(
      source: GraphicObject,
      target: GraphicObject,
      {
        sourceChannel,
        targetChannel,
        channel,
      }?: {
        sourceChannel?: string
        targetChannel?: string
        channel?: string | undefined
      },
    ): this
    rotate(source: GraphicObject, target: GraphicObject, offset?: number): this
  }

  const union: (objects: GraphicObject[]) => Glyph
  const intersect: (object1: GraphicObject, object2: GraphicObject, ignore?: GraphicObject[]) => Glyph
  const substract: (object1: GraphicObject, object2: GraphicObject, ignore?: GraphicObject[]) => Glyph
  const xor: (object1: GraphicObject, object2: GraphicObject, ignore?: GraphicObject[]) => Glyph
  const repeat: (object: GraphicObject, key?: string) => Collection
  const duplicate: (object: GraphicObject, number: number | string) => Collection
  const divide: (
    object: GraphicObject,
    direction: string,
    {
      key,
      sizeEncode,
      gap,
    }: {
      key?: string
      sizeEncode?: string
      gap?: number
    },
  ) => Division
  const link: (
    object: GraphicObject,
    {
      filter,
      linkByData,
      endEdge,
      startEdge,
      type,
      shape,
      curveness,
      overlay,
      ...style
    }?: {
      filter?: string | GraphicObject
      linkByData?: boolean
      endEdge?: string
      startEdge?: string
      type?: 'band' | 'line'
      shape?: 'straight' | 'bezier' | 'arc'
      curveness?: number
      overlay?: 'front' | 'back'
    } & Style,
  ) => GraphicObject
  const show: (
    objects: (GraphicObject | [GraphicObject, any])[],
    container: HTMLElement,
    config: any,
  ) => Promise<void>

  interface IScale { }
  class LinearScale implements IScale {
    constructor({ domain, range }?: { domain?: [number, number]; range?: [number, number] })
  }
  class SquareRootScale implements IScale {
    constructor({ domain, range }?: { domain?: [number, number]; range?: [number, number] })
  }
  class CategoricalScale implements IScale {
    constructor({
      domain,
      range,
      interval,
    }?: {
      domain?: string[]
      range?: [number, number]
      interval?: number
    })
  }

  type Style = {
    fill?: string
    stroke?: string
    strokeWidth?: number
    opacity?: number
  }
  type TextStyle = {
    font?: string
    fontSize?: number
    fill?: string
    textAnchor?: string
    fontFamily?: string
    fontWeight?: string
  }
}
