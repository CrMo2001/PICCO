import{c,z as d,o as t}from"./index-CvQra_Ej.js";const a={class:"markdown-body"},i={__name:"03Intersect",setup(n,{expose:o}){return o({frontmatter:{}}),(r,e)=>(t(),c("div",a,e[0]||(e[0]=[d(`<h1>学习使用 intersect</h1><p>在本节教程中，我们将创建一个基于水位的人体图。这个图的特点是每个柱子由人体形状和水位矩形组成，水位的高度由数据决定。我们将逐步解析代码，并解释每一步的作用。</p><h2>1. 准备数据</h2><p>首先，我们定义了一组数据，表示不同类别的数值：</p><pre><code class="language-typescript">const data = [
  { category: &#39;A&#39;, amount: 70 },
  { category: &#39;B&#39;, amount: 40 },
  { category: &#39;C&#39;, amount: 40 },
  { category: &#39;D&#39;, amount: 30 },
  { category: &#39;E&#39;, amount: 50 },
  { category: &#39;F&#39;, amount: 60 },
]
</code></pre><ul><li><code>category</code>：表示类别。</li><li><code>amount</code>：表示数值，将用于确定水位的高度。</li></ul><h2>2. 创建人体形状和水位矩形</h2><p>接下来，我们创建了人体形状和水位矩形。人体形状由两张图片组成：<code>shape</code> 和 <code>border</code>，水位矩形是一个 <code>Rect</code> 对象。</p><pre><code class="language-typescript">const shape = new Picture({ url: &#39;examples/human/human_shape.png&#39; })
const border = new Picture({ url: &#39;examples/human/human_border.png&#39; })
const water = new Rect({ fill: &#39;skyblue&#39;, height: 450 }).encode(&#39;height&#39;, &#39;amount&#39;)
</code></pre><ul><li><code>shape</code>：人体形状的图片。</li><li><code>border</code>：人体边框的图片。</li><li><code>water</code>：水位矩形，填充颜色为 <code>skyblue</code>，初始高度为 <code>450</code>。通过 <code>encode</code> 方法将高度与数据的 <code>amount</code> 字段绑定。</li></ul><h2>3. 组合水位矩形和人体形状</h2><p>我们将水位矩形与人体形状进行相交运算，并设置它们之间的约束关系。</p><pre><code class="language-typescript">const g1 = intersect(water, shape)
  .align(water, shape, &#39;x&#39;) // 水位矩形与人体形状在 x 方向对齐
  .equal(water, shape, { channel: &#39;width&#39; }) // 水位矩形与人体形状宽度相等
</code></pre><ul><li><code>intersect</code>：对水位矩形和人体形状进行相交运算，生成一个新的图形对象 <code>g1</code>。</li><li><code>align</code>：将水位矩形与人体形状在 x 方向对齐。</li><li><code>equal</code>：确保水位矩形与人体形状的宽度相等。</li></ul><h2>4. 组合图形并添加边框</h2><p>我们将相交后的图形 <code>g1</code> 与人体边框 <code>border</code> 组合在一起，并设置它们之间的约束关系。</p><pre><code class="language-typescript">const g2 = combine([g1, border])
  .align(border, g1, &#39;x&#39;) // 边框与 g1 在 x 方向对齐
  .encode(&#39;x&#39;, &#39;category&#39;) // 将 x 坐标与数据的 category 字段绑定
</code></pre><ul><li><code>combine</code>：将 <code>g1</code> 和 <code>border</code> 合并为一个整体。</li><li><code>align</code>：将 <code>border</code> 与 <code>g1</code> 在 x 方向对齐。</li><li><code>encode</code>：将图形的 <code>x</code> 坐标与数据的 <code>category</code> 字段绑定。</li></ul><h2>5. 重复图形</h2><p>使用 <code>repeat</code> 操作符，将图形 <code>g2</code> 重复多次，每个图形对应一个数据点。</p><pre><code class="language-typescript">const collection = repeat(g2)
</code></pre><ul><li><code>repeat</code>：根据数据的数量生成多个图形。</li></ul><h2>6. 渲染图形</h2><p>最后，我们使用 <code>show</code> 函数将图形渲染到页面上。</p><pre><code class="language-typescript">show([[collection, data]], document.body, {})
</code></pre><ul><li><code>show</code>：将图形渲染到 <code>document.body</code> 中。</li></ul><h2>7. 最终效果</h2><p>运行以上代码后，你将看到一个基于水位的人体图：</p><ul><li>每个柱子由人体形状和水位矩形组成。</li><li>水位的高度由数据的 <code>amount</code> 字段决定。</li><li>人体边框用于增强视觉效果。</li></ul>`,29)])))}};export{i as default};
