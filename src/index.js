import nx from '@jswork/next';

const defaults = {
  // templateId or template string.
  templateId: 'demo',
  // data object.
  data: {},
  // callback function.
  fn: (item) => item.value,
  // container selector.
  container: 'body',
  // data-key selector.
  dataKey: '[data-key]'
};


// <!-- 模板：data-key 写在哪个标签上，哪个标签内容就被替换 -->
// <template id="todo-template">
//   <p><strong>ID:</strong> <span data-key="id">[loading id]</span></p>
//   <p><strong>Title:</strong> <em data-key="title">[loading title]</em></p>
//   <p><strong>Completed:</strong> <span data-key="completed">[status]</span></p>
// </template>

nx.tpl = function (inOptions) {
  var options = nx.mix(null, defaults, inOptions);

  if (typeof $ === 'undefined') throw new Error('jQuery is required.');

  const template = document.getElementById(templateId);
  const clone = document.importNode(template.content, true);
  const $clone = $(clone);

  // 查找所有带 data-key 的元素
  $clone.find(options.dataKey).each(function () {
    const $elem = $(this);
    const key = $elem.attr('data-key');
    const value = nx.get(data, key);
    const fnValue = options.fn({ key, value });
    $elem.html(fnValue);
  });

  // 渲染到容器
  $(container).empty().append($clone);
};

if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = nx.tpl;
}

export default nx.tpl;
