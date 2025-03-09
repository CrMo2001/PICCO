import{c,z as n,o as l}from"./index-CvQra_Ej.js";const t={class:"markdown-body"},r={__name:"02Combine And Constraint",setup(i,{expose:o}){return o({frontmatter:{}}),(p,e)=>(l(),c("div",t,e[0]||(e[0]=[n(`<h1>学会使用 combine 和 constraint</h1><p>在本教程中，我们将创建一个基于铅笔图片的柱状图。这个柱状图的特点是每个柱子由三部分组成：铅笔的顶部、中部和底部。我们将逐步解析代码，并解释每一步的作用。</p><h2>1. 准备数据</h2><p>首先，我们定义了一组数据，表示不同类别的数值：</p><pre><code class="language-typescript">const data = [
  { category: &#39;A&#39;, amount: 70 },
  { category: &#39;B&#39;, amount: 40 },
  { category: &#39;C&#39;, amount: 40 },
  { category: &#39;D&#39;, amount: 30 },
  { category: &#39;E&#39;, amount: 50 },
  { category: &#39;F&#39;, amount: 60 },
]
</code></pre><ul><li><code>category</code>：表示类别。</li><li><code>amount</code>：表示数值，将用于确定铅笔的高度。</li></ul><h2>2. 创建铅笔的各个部分</h2><p>接下来，我们创建了铅笔的三个部分：顶部、中部和底部。每个部分都是一个 <code>Picture</code> 对象，表示一张图片。</p><pre><code class="language-typescript">const pencilTop = new Picture({ url: &#39;examples/pencil/top.png&#39;, y: 600 }).encode(&#39;y&#39;, &#39;amount&#39;, {
  anchor: 1,
})

const pencilMiddle = new Picture({ url: &#39;examples/pencil/middle.png&#39; })

const pencilBottom = new Picture({ url: &#39;examples/pencil/bottom.png&#39;, width: 100 })
</code></pre><ul><li><code>pencilTop</code>：铅笔的顶部部分。我们通过 <code>encode</code> 方法将 <code>y</code> 坐标与数据的 <code>amount</code> 字段绑定，<code>anchor: 1</code> 表示锚点在顶部。</li><li><code>pencilMiddle</code>：铅笔的中部部分。</li><li><code>pencilBottom</code>：铅笔的底部部分，设置了固定的宽度为 <code>100</code>。</li></ul><h2>3. 组合铅笔的各个部分</h2><p>我们将铅笔的顶部、中部和底部组合成一个完整的铅笔图形，并设置它们之间的约束关系。</p><pre><code class="language-typescript">const pencil = combine([pencilTop, pencilMiddle, pencilBottom])
  .equal(pencilTop, pencilBottom, { channel: &#39;width&#39; }) // 顶部和底部宽度相等
  .equal(pencilMiddle, pencilBottom, { channel: &#39;width&#39; }) // 中部和底部宽度相等
  .align(pencilMiddle, pencilTop, &#39;y&#39;, { sourceAnchor: &#39;top&#39;, targetAnchor: &#39;bottom&#39; }) // 中部顶部与顶部底部对齐
  .align(pencilMiddle, pencilBottom, &#39;y&#39;, { sourceAnchor: &#39;bottom&#39;, targetAnchor: &#39;top&#39; }) // 中部底部与底部顶部对齐
  .encode(&#39;x&#39;, &#39;category&#39;) // 将 x 坐标与数据的 category 字段绑定
</code></pre><ul><li><code>combine</code>：将铅笔的三个部分合并为一个整体。</li><li><code>equal</code>：确保顶部、中部和底部的宽度相等。</li><li><code>align</code>：设置中部与顶部、底部的对齐方式。</li><li><code>encode</code>：将铅笔的 <code>x</code> 坐标与数据的 <code>category</code> 字段绑定。</li></ul><h2>4. 重复铅笔图形</h2><p>使用 <code>repeat</code> 操作符，将铅笔图形重复多次，每个铅笔对应一个数据点。</p><pre><code class="language-typescript">const collection = repeat(pencil)
</code></pre><ul><li><code>repeat</code>：根据数据的数量生成多个铅笔图形。</li></ul><h2>5. 创建坐标轴</h2><p>我们创建了 x 轴和 y 轴，用于显示类别和数值。</p><pre><code class="language-typescript">const xAxis = new Axis(&#39;x&#39;, { position: -10 })
const yAxis = new Axis(&#39;y&#39;, { position: -100 })
</code></pre><ul><li><code>xAxis</code>：x 轴，表示类别。</li><li><code>yAxis</code>：y 轴，表示数值。</li></ul><h2>6. 组合图形并渲染</h2><p>最后，我们将铅笔图形和坐标轴组合在一起，并使用 <code>show</code> 函数将其渲染到页面上。</p><pre><code class="language-typescript">const chart = combine([collection, xAxis, yAxis])

show([[chart, data]], document.body, {})
</code></pre><ul><li><code>combine</code>：将铅笔图形和坐标轴合并为一个整体。</li><li><code>show</code>：将图形渲染到 <code>document.body</code> 中。</li></ul><h2>7. 最终效果</h2><p>运行以上代码后，你将看到一个基于铅笔图片的柱状图：</p><ul><li>每个柱子由铅笔的顶部、中部和底部组成。</li><li>柱子的高度由数据的 <code>amount</code> 字段决定。</li><li>x 轴显示类别，y 轴显示数值。</li></ul>`,29)])))}};export{r as default};
