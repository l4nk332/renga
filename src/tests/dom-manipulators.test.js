import { Suite } from '../../browserrt.js'

import {
  appendChild,
  appendChildren,
  setAttributes
} from '../utils/dom-manipulators.js'

function generateAppendNodeTests(appendFn) {
  return [
    ['Should append a text node if string value is passed in', assert => {
      let div = document.createElement('div')
      assert(div.innerText).equalTo('')
      appendFn(div, 'This is a div element.')
      assert(div.innerText).equalTo('This is a div element.')

      appendFn(div, ' With another node added.')
      assert(div.innerText).equalTo('This is a div element. With another node added.')
    }],
    ['Should append a DOM node if a DOM node is passed in', assert => {
      let div = document.createElement('div')
      assert(div.innerHTML).equalTo('')

      let anchor = document.createElement('a')
      anchor.innerText = 'Link to Google'
      anchor.setAttribute('href', 'https://google.com')

      appendFn(div, anchor)
      assert(div.innerHTML).equalTo('<a href="https://google.com">Link to Google</a>')

      let span = document.createElement('span')
      span.innerText = ' will take you to Google search...'
      appendFn(div, span)
      assert(div.innerHTML).equalTo('<a href="https://google.com">Link to Google</a><span> will take you to Google search...</span>')
    }],
    ['Should append a either DOM node or text node passed in', assert => {
      let div = document.createElement('div')
      assert(div.innerHTML).equalTo('')

      let anchor = document.createElement('a')
      anchor.innerText = 'Link to Google'
      anchor.setAttribute('href', 'https://google.com')

      appendFn(div, anchor)
      assert(div.innerHTML).equalTo('<a href="https://google.com">Link to Google</a>')

      appendFn(div, ' will take you to Google search...')
      assert(div.innerHTML).equalTo('<a href="https://google.com">Link to Google</a> will take you to Google search...')
    }]
  ]
}

new Suite('appendChild').tests(generateAppendNodeTests(appendChild))

new Suite('appendChildren')
  .tests([
    ...generateAppendNodeTests(appendChildren),
    ['Should append a series of text nodes when provided with an array of them', assert => {
      let div = document.createElement('div')
      assert(div.innerText).equalTo('')

      appendChildren(div, ['This', ' is', ' a', ' test', '.'])
      assert(div.innerText).equalTo('This is a test.')
    }],
    ['Should append a series of DOM nodes when provided with an array of them', assert => {
      let div = document.createElement('div')
      assert(div.innerText).equalTo('')

      appendChildren(div, [
        document.createElement('a'),
        document.createElement('span'),
        document.createElement('address')
      ])
      assert(div.innerHTML).equalTo('<a></a><span></span><address></address>')
    }],
    ['Should append a series of DOM nodes and text nodes when provided with an array of them', assert => {
      let div = document.createElement('div')
      assert(div.innerText).equalTo('')

      appendChildren(div, [
        'This',
        document.createElement('a'),
        'is',
        document.createElement('span'),
        'a',
        document.createElement('address'),
        'test'
      ])
      assert(div.innerHTML).equalTo('This<a></a>is<span></span>a<address></address>test')
    }]
  ])

new Suite('setAttributes')
  .tests([
    ['Should return node passed in untouched if attributes are empty', assert => {
      let div = document.createElement('div')
      assert(div.outerHTML).equalTo('<div></div>')
      setAttributes(div, {})
      assert(div.outerHTML).equalTo('<div></div>')
    }],
    ['Should properly filter out attributes which are false', assert => {
      let div = document.createElement('div')
      assert(div.outerHTML).equalTo('<div></div>')
      setAttributes(div, {disabled: false, readonly: false})
      assert(div.outerHTML).equalTo('<div></div>')
    }],
    ['Should properly include attributes which are true as unary', assert => {
      let div = document.createElement('div')
      assert(div.outerHTML).equalTo('<div></div>')
      setAttributes(div, {
        disabled: false,
        checked: true,
        cols: 5,
        lang: 'English',
        alt: 'Tis an alt attribute',
        dataId: 789,
        dataModelName: 'invoice',
        class: 'button big default',
        id: 'fireTheMissiles'
      })

      assert(div.outerHTML).equalTo('<div checked="" cols="5" lang="English" alt="Tis an alt attribute" data-id="789" data-model-name="invoice" class="button big default" id="fireTheMissiles"></div>')
    }]
  ])
