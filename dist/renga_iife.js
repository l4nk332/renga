/*
 * renga v1.0.1 (https://github.com/l4nk332/renga)
 * Copyright (c) 2019 Ian Jabour
 * Licensed under MIT (https://github.com/l4nk332/renga/blob/master/LICENSE)
*/
var renga = (function (exports) {
  'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _toArray(arr) {
    return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  // TODO: Possibly need to remove the ^ and $ to make less strict
  var KABOB_CASE = /^[a-z]+(-+[a-z]+)+$/i;
  var CAMEL_CASE = /^[a-z]+([A-Z][a-z]*)+$/;
  var CAPITALIZED_WORD = /([A-Z][a-z]*)/g;

  function isValidKabobCase(string) {
    return KABOB_CASE.test(string);
  }
  function kabob2Camel(string) {
    if (!isValidKabobCase(string)) return string;

    var _string$split = string.split('-'),
        _string$split2 = _toArray(_string$split),
        head = _string$split2[0],
        tail = _string$split2.slice(1);

    var capitalizedTail = tail.filter(function (word) {
      return word.length;
    }).map(function (word) {
      return "".concat(word[0].toUpperCase()).concat(word.slice(1).toLowerCase());
    }).join('');
    return "".concat(head).concat(capitalizedTail);
  }
  function isValidCamelCase(string) {
    return CAMEL_CASE.test(string);
  }
  function camel2Kabob(string) {
    return isValidCamelCase(string) ? string.split(CAPITALIZED_WORD).filter(function (v) {
      return v.length;
    }).map(function (v) {
      return v.toLowerCase();
    }).join('-') : string;
  }

  function scopeStyles(module, styles) {
    var hash = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var classNames = {};
    var scopedStyles = styles.replace(/\.([a-z-_]+)/gi, function (_, rawClassName) {
      var normalizedName = kabob2Camel(rawClassName);
      var hashFragment = hash ? "__".concat(hash) : hash;
      var scopedName = "".concat(module, "__").concat(normalizedName).concat(hashFragment);
      classNames[normalizedName] = scopedName;
      return ".".concat(scopedName);
    });
    return {
      classNames: classNames,
      styles: scopedStyles
    };
  }

  var FRAGMENT = 'fragment';
  var TEXT = 'text';
  var ELEMENT_TYPES = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'button', 'canvas', 'caption', 'cite', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'pre', 'progress', 'q', 'rb', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', TEXT, 'textarea', 'tfoot', 'th', 'thead', 'time', 'tr', 'track', 'u', 'ul', 'var', 'video', FRAGMENT];

  function coerceTrue(value) {
    return value && typeof value === 'boolean' ? '' : value;
  }
  function shouldNullify(child) {
    return child === null || child === false;
  }
  function isValidChild(child) {
    return isOneOfType(['string', 'number'], child) || child === false || child === null || isPlainObject(child) && 'nodeName' in child && 'nodeType' in child;
  }
  function areValidChildren(children) {
    return Array.isArray(children) ? children.every(isValidChild) : isValidChild(children);
  }
  function isPlainObject(value) {
    return _typeof(value) === 'object' && !Array.isArray(value) && value !== null;
  }
  function isOneOfType(types, value) {
    return types.some(function (type) {
      return _typeof(value) === type;
    });
  }

  function setEventHandlers(node, handlers) {
    Object.entries(handlers).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          eventName = _ref2[0],
          eventHandler = _ref2[1];

      node.addEventListener(eventName, eventHandler);
    });
  }
  function setStyles(node, styles) {
    Object.entries(styles).forEach(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          styleProp = _ref4[0],
          styleValue = _ref4[1];

      node.style[camel2Kabob(styleProp)] = styleValue;
    });
  }
  function setAttributes(node, attributes) {
    Object.entries(attributes).filter(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 2),
          attrName = _ref6[0],
          attrValue = _ref6[1];

      return attrValue !== false;
    }).map(function (_ref7) {
      var _ref8 = _slicedToArray(_ref7, 2),
          attrName = _ref8[0],
          attrValue = _ref8[1];

      return [camel2Kabob(attrName), coerceTrue(attrValue)];
    }).forEach(function (_ref9) {
      var _ref10 = _slicedToArray(_ref9, 2),
          attrName = _ref10[0],
          attrValue = _ref10[1];

      attrName === 'events' && isPlainObject(attrValue) ? setEventHandlers(node, attrValue) : attrName === 'style' && isPlainObject(attrValue) ? setStyles(node, attrValue) : node.setAttribute(attrName, attrValue);
    });
  }
  function appendChild(node, child) {
    if (!shouldNullify(child)) {
      node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
    }
  }
  function appendChildren(node, children) {
    Array.isArray(children) ? children.forEach(function (child) {
      return appendChild(node, child);
    }) : appendChild(node, children);
  }

  function template(type) {
    return function element() {
      var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (areValidChildren(attributes)) {
        children = attributes;
        attributes = null;
      }

      var node = type === FRAGMENT ? document.createDocumentFragment() : type === TEXT ? document.createTextNode(shouldNullify(children) ? '' : children) : document.createElement(type);
      if (![FRAGMENT, TEXT].includes(type) && attributes) setAttributes(node, attributes);
      if (type !== TEXT && children) appendChildren(node, children);
      return node;
    };
  }

  var element = ELEMENT_TYPES.reduce(function (collection, type) {
    return _objectSpread({}, collection, _defineProperty({}, type, template(type)));
  }, {});

  exports.element = element;
  exports.scopeStyles = scopeStyles;

  return exports;

}({}));
