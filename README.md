# next-tpl
> Render template with data-key binding.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
yarn add @jswork/next-tpl
```

## usage
```html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <title>Template + data-key 安全解析</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://unpkg.com/@jswork/next-website-toolkits@1.0.3/dist/index.min.js"></script>
    <style>
      .loading {
        color: #666;
        font-style: italic;
      }
    </style>
  </head>
  <body>
    <h1>获取的 JSON 数据：</h1>
    <div id="result"></div>

    <button id="changeBtn">Change It</button>

    <!-- 模板：多个同级元素，用 template 标签包裹 -->
    <template id="todo-template">
      <p><strong>ID:</strong> <span data-key="id">[loading id]</span></p>
      <p><strong>Title:</strong> <em data-key="title">[loading title]</em></p>
      <p>
        <strong>Completed:</strong> <span data-key="completed">[status]</span>
      </p>
    </template>

    <script>
      let currentId = 1;

      // 加载数据
      function loadTodo(id, showLoading = false) {
        if (showLoading) {
          $("#result").html('<p class="loading">Loading...</p>');
        }

        $.getJSON(`https://jsonplaceholder.typicode.com/todos/${id}`)
          .done(function (json) {
            // renderTemplate(json, 'todo-template', '#result');
            $("#result")
              .empty()
              .append(nx.tpl({ templateId: "todo-template", data: json }));
            console.log("Loaded:", json);
          })
          .fail(function () {
            $("#result").html('<p style="color: red;">数据加载失败！</p>');
            console.error("请求失败，ID:", id);
          });
      }

      // 初始化
      $(document).ready(function () {
        loadTodo(currentId);
      });

      // 按钮点击
      $("#changeBtn").on("click", function () {
        currentId = (currentId % 10) + 1;
        loadTodo(currentId, true);
      });
    </script>
  </body>
</html>
```

## license
Code released under [the MIT license](https://github.com/afeiship/next-tpl/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/next-tpl
[version-url]: https://npmjs.org/package/@jswork/next-tpl

[license-image]: https://img.shields.io/npm/l/@jswork/next-tpl
[license-url]: https://github.com/afeiship/next-tpl/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/next-tpl
[size-url]: https://github.com/afeiship/next-tpl/blob/master/dist/next-tpl.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/next-tpl
[download-url]: https://www.npmjs.com/package/@jswork/next-tpl
