import{_ as o}from"./cash-odGR_bUe.js";import{c as t,B as d,o as a}from"./index-DN5s-H94.js";const l={class:"markdown-body"},u={__name:"04duplicate",setup(n,{expose:c}){return c({frontmatter:{}}),(i,e)=>(a(),t("div",l,e[0]||(e[0]=[d('<h1>学习使用 duplicate</h1><p>在本节教程中，我们将创建一个基于现金堆叠的图表。这个图表的特点是每个柱子由多个现金图片堆叠而成，堆叠的数量由数据决定，并且每个柱子顶部显示对应的数值标签。我们将逐步解析代码，并解释每一步的作用。</p><p><img src="'+o+`" alt=""></p><h2>1. 准备数据</h2><p>首先，我们定义了一组数据，表示不同类别的数值：</p><pre><code class="language-typescript">const data = [
  { category: &#39;A&#39;, amount: 17 },
  { category: &#39;B&#39;, amount: 14 },
  { category: &#39;C&#39;, amount: 14 },
  { category: &#39;D&#39;, amount: 13 },
  { category: &#39;E&#39;, amount: 15 },
  { category: &#39;F&#39;, amount: 16 },
]
</code></pre><ul><li><code>category</code>：表示类别。</li><li><code>amount</code>：表示数值，将用于确定现金图片的堆叠数量。</li></ul><h2>2. 创建现金图片</h2><p>接下来，我们创建了一个现金图片对象 <code>cash</code>，并设置了其宽度和高度。</p><pre><code class="language-typescript">const cash = new Picture({ url: &#39;examples/cash/cash.png&#39;, width: 100, height: 100 })
</code></pre><ul><li><code>cash</code>：现金图片，宽度和高度均为 <code>100</code>。</li></ul><h2>3. 堆叠现金图片</h2><p>使用 <code>duplicate</code> 操作符，将现金图片重复多次，堆叠的数量由数据的 <code>amount</code> 字段决定。</p><pre><code class="language-typescript">const cashStack = duplicate(cash, &#39;amount&#39;)
  .stackLayout(&#39;y&#39;, -70) // 沿 y 轴堆叠，间距为 -70
  .encode(&#39;x&#39;, &#39;category&#39;) // 将 x 坐标与数据的 category 字段绑定
</code></pre><ul><li><code>duplicate</code>：根据数据的 <code>amount</code> 字段重复现金图片。</li><li><code>stackLayout</code>：将现金图片沿 y 轴堆叠，间距为 <code>-70</code>（负值表示向上堆叠）。</li><li><code>encode</code>：将堆叠后的现金图片的 <code>x</code> 坐标与数据的 <code>category</code> 字段绑定。</li></ul><h2>4. 创建数值标签</h2><p>我们创建了一个文本对象 <code>label</code>，用于显示每个柱子的数值。</p><pre><code class="language-typescript">const label = new Text({ fontSize: 30, textAnchor: &#39;middle&#39;, fontWeight: &#39;bold&#39; }).encode(
  &#39;content&#39;,
  &#39;amount&#39;,
) // 将文本内容与数据的 amount 字段绑定
</code></pre><ul><li><code>label</code>：文本对象，字体大小为 <code>30</code>，居中对齐，字体加粗。</li><li><code>encode</code>：将文本内容与数据的 <code>amount</code> 字段绑定。</li></ul><h2>5. 组合现金堆叠和标签</h2><p>我们将现金堆叠 <code>cashStack</code> 和标签 <code>label</code> 组合在一起，并设置它们之间的约束关系。</p><pre><code class="language-typescript">const glyph = union([cashStack, label]).connect(label, cashStack, { anchor: [0.5, 1] }) // 将标签连接到现金堆叠的顶部中心
</code></pre><ul><li><code>union</code>：将现金堆叠和标签合并为一个整体。</li><li><code>connect</code>：将标签连接到现金堆叠的顶部中心位置。</li></ul><h2>6. 重复图形</h2><p>使用 <code>repeat</code> 操作符，将组合后的图形 <code>glyph</code> 重复多次，每个图形对应一个数据点。</p><pre><code class="language-typescript">const collection = repeat(glyph)
</code></pre><ul><li><code>repeat</code>：根据数据的数量生成多个图形。</li></ul><h2>7. 创建 x 轴</h2><p>我们创建了 x 轴，用于显示类别。</p><pre><code class="language-typescript">const xAxis = new Axis(&#39;x&#39;, { showTickLine: false }) // 不显示刻度线
</code></pre><ul><li><code>xAxis</code>：x 轴，表示类别，不显示刻度线。</li></ul><h2>8. 组合图形并渲染</h2><p>最后，我们将图形和 x 轴组合在一起，并使用 <code>show</code> 函数将其渲染到页面上。</p><pre><code class="language-typescript">const chart = union([collection, xAxis])

show([[chart, data]], document.body, {})
</code></pre><ul><li><code>union</code>：将图形和 x 轴合并为一个整体。</li><li><code>show</code>：将图形渲染到 <code>document.body</code> 中。</li></ul><h2>9. 最终效果</h2><p>运行以上代码后，你将看到一个基于现金堆叠的图表：</p><ul><li>每个柱子由多个现金图片堆叠而成，堆叠的数量由数据的 <code>amount</code> 字段决定。</li><li>每个柱子顶部显示对应的数值标签。</li><li>x 轴显示类别。</li></ul>`,38)])))}};export{u as default};
