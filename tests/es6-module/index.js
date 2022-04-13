import makeHtml from '../../dist/browser/es6-module/make-html.debug.js';

document.body.appendChild(
  makeHtml('HELLO WORLD')
);

document.body.appendChild(
  makeHtml({
    children: 'HELLO WORLD',
    callback: (textNode) => void console.log(textNode)
  })
);

document.body.appendChild(
  makeHtml({
    element: 'p', children: 'HELLO WORLD',
    callback: (element) => void console.log(element)
  })
);

document.body.appendChild(
  makeHtml({
    children: {
      element: 'p', children: 'HELLO WORLD',
      callback: (element) => void console.log(element)
    },
    callback: (element) => void console.log(element)
  })
);

document.body.appendChild(
  makeHtml([
    'HELLO',
    { element: 'p', children: 'WORLD' }
  ])
);

document.body.appendChild(
  makeHtml({
    children: [
      'HELLO',
      { element: 'p', children: 'WORLD' }
    ],
    callback: (fragment) => void console.log(fragment)
  })
);

const testComponent = function test({ text, children }) {
  return {
    element: 'div',
    attributes: { class: 'outer' },
    children: [
      text,
      {
        element: 'div',
        attributes: { class: 'inner' },
        children
      }
    ]
  };
};

makeHtml.register(testComponent);

document.body.appendChild(
  makeHtml({
    component: 'test',
    text: 'HELLO WORLD',
    children: 'HELLO TORONTO'
  })
);

document.body.appendChild(
  makeHtml({
    children: {
      component: 'test',
      text: 'HELLO WORLD',
      children: 'HELLO TORONTO'
    },
    callback: (node) => void console.log(node)
  })
);
