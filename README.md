# make-html

Version 1.0.0

## Install

```
npm install https://github.com/JamesNgo-CoT/make-html.git#1.0.0
```

## Signature

```
$simpleOptions: boolean | number | string | Node | object {
  children: $simpleOptions,
  callback: undefined | null | function (node) => void
}

$elementOptions: object {
  element: string,
  namespace: undefined | null | string,
  attributes: undefined | null | object {
    [key: string]: undefined | null | boolean | number | string
  },
  children: undefined | null | $simpleOptions | $elementOptions | $componentOptions | $fragmentOptions,
  callback: undefined | null | function (node) => void
} | object {
  children: $elementOptions,
  callback: undefined | null | function (node) => void
}

$componentOptions: object {
  component: string,
  ...
}

$fragmentOptions: array [
  undefined | null | $simpleOptions | $elementOptions | $componentOptions | $fragmentOptions1
] | object {
  children: $fragmentOptions,
  callback: undefined | null | function (node) => void
}

makeHtml: function (
  options: $simpleOptions | $elementOptions | $componentOptions | $fragmentOptions
) => Node
```

## Create Text Node

### Example 1

``` JavaScript
document.body.appendChild(
  makeHtml('HELLO WORLD')
);
```

HTML

``` HTML
HELLO WORLD
```

### Example 2

``` JavaScript
document.body.appendChild(
  makeHtml({
    children: 'HELLO WORLD',
    callback: (textNode) => void console.log(textNode)
  })
);
```

HTML

``` HTML
HELLO WORLD
```

Console Log

```
HELLO WORLD
```

## Create Element

### Example 1

``` JavaScript
document.body.appendChild(
  makeHtml({
    element: 'p', children: 'HELLO WORLD',
    callback: (element) => void console.log(element)
  })
);
```

HTML

``` HTML
<p>HELLO WORLD</p>
```

Console Log

```
<p>HELLO WORLD</p>
```

### Example 2

``` JavaScript
document.body.appendChild(
  makeHtml({
    children: {
      element: 'p', children: 'HELLO WORLD',
      callback: (element) => void console.log(element)
    },
    callback: (element) => void console.log(element)
  })
);
```

HTML

``` HTML
<p>HELLO WORLD</p>
```

Console Log

```
<p>HELLO WORLD</p>
```

## Create Document Fragment

### Example 1

``` JavaScript
document.body.appendChild(
  makeHtml([
    'HELLO',
    { element: 'p', children: 'WORLD' }
  ])
);
```

HTML

``` HTML
HELLO
<p>WORLD</p>
```

### Example 2

``` JavaScript
document.body.appendChild(
  makeHtml({
    children: [
      'HELLO',
      { element: 'p', children: 'WORLD' }
    ],
    callback: (fragment) => void console.log(fragment)
  })
);
```

HTML

``` HTML
HELLO
<p>WORLD</p>
```

Console Log

```
Document Fragment
```

## Component

### Declaration

``` JavaScript
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
```

### Registration

``` JavaScript
makeHtml.register(testComponent);
```

### Example 1

``` JavaScript
document.body.appendChild(
  makeHtml({
    component: 'test',
    text: 'HELLO WORLD',
    children: 'HELLO TORONTO'
  })
);
```

HTML

``` HTML
<div class="outer">HELLO WORLD<div class="inner">HELLO TORONTO</div></div>
```

### Example 2

``` JavaScript
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
```

HTML

``` HTML
<div class="outer">HELLO WORLD<div class="inner">HELLO TORONTO</div></div>
```

Console Log

```
<div class="outer">HELLO WORLD<div class="inner">HELLO TORONTO</div></div>
```
