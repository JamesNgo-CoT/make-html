"use strict";

var makeHtml = function () {
  var components = {};

  function makeHtml(options) {
    if (options instanceof Node) {
      return options;
    } // -----


    if (Array.isArray(options)) {
      var node = document.createDocumentFragment();

      for (var index = 0, length = options.length; index < length; index++) {
        if (options[index] == null) {
          continue;
        }

        node.appendChild(makeHtml(options[index]));
      }

      return node;
    } // -----


    if (options.component) {
      return makeHtml(components[options.component](options));
    } // -----


    if (options.element) {
      var namespace = options.namespace,
          element = options.element,
          attributes = options.attributes,
          children = options.children,
          callback = options.callback;

      var _node = namespace ? document.createElementNS(namespace, element) : document.createElement(element);

      if (attributes != null) {
        for (var key in attributes) {
          if (attributes[key] == null) {
            continue;
          }

          _node.setAttribute(key, attributes[key]);
        }
      }

      if (children != null) {
        _node.appendChild(makeHtml(children));
      }

      if (callback != null) {
        callback(_node);
      }

      return _node;
    } // -----


    if (options.children) {
      var _children = options.children,
          _callback = options.callback;

      var _node2 = makeHtml(_children);

      if (_callback != null) {
        _callback(_node2);
      }

      return _node2;
    } // -----


    return document.createTextNode(options);
  }

  makeHtml.register = function (component) {
    components[component.name] = component;
    return makeHtml;
  };

  return makeHtml;
}();
/* exported HtmlFactory */