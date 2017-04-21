import path from 'path';
import Express from 'express';
import React from 'react';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server'

import todoApp from './src/reducers/todoApp';
import TodoApp from './src/components/TodoApp';

const app = Express();
const port = 3000;

const renderFullPage = (html, preloadedState) => {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Redux</title>

    <style type="text/css">

        .container {
            padding: 20px;
            box-sizing: border-box;
            margin-top: 30px;
            border: 4px dotted;
        }

        .purple-border {
            border-color: purple;
        }

        .green-border {
            border-color: green;
        }

    </style>

    <script>
      // WARNING: See the following for security issues around embedding JSON in HTML:
      // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
    </script>

</head>

<body>
    <div id='counter' class="container purple-border"></div>
    <div id='todo' class="container green-border">${html}</div>
</body>

<script src="dist/bundle.js"></script>

</html>`
};

const handleRender = (req, res) => {
    const store = createStore(todoApp, {
        "todos":[
            {
                "id":0,
                "text":"jklkjlkjkl",
                "completed":false
            },
            {
                "id":1,
                "text":"jklkj",
                "completed":false
            },
            {
                "id":2,
                "text":"kljlkjl",
                "completed":false
            }
        ],
        "visibilityFilter":"SHOW_ALL"
    });

    const html = renderToString(
        <Provider store={store}>
            <TodoApp />
        </Provider>
    );

    const preloadedState = store.getState();

    res.send(renderFullPage(html, preloadedState));
};

app.use('/dist', Express.static('dist'));
app.use(handleRender);

app.listen(port);