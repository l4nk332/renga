import {
  appendChild,
  appendChildren,
  setAttributes,
  setEventHandlers,
  setStyles
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
    }],
    ['Should not append a value if the shouldNullify is true', assert => {
      let div = document.createElement('div')
      assert(div.innerText).equalTo('')
      appendFn(div, false && 'This is a div element.')
      assert(div.innerText).equalTo('')

      appendFn(div, null && ' With another node added.')
      assert(div.innerText).equalTo('')
    }],
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
    }],
    ['Should append only children that do not pass shouldNullify', assert => {
      let div = document.createElement('div')
      assert(div.innerText).equalTo('')

      appendChildren(div, [
        'This',
        Boolean(0) && document.createElement('hr'),
        ' is',
        false && ' not',
        ' a',
        ' test',
        true ? null : '?',
        '.'
      ])

      assert(div.innerText).equalTo('This is a test.')
    }],
  ])

new Suite('setEventHandlers')
  .tests([
    ['Should return node passed in untouched if events are empty', assert => {
      setEventHandlers(document.createElement('div'), {})
    }],
    ['Should return node with events provided added to it.', assert => {
      let spy = new Spy()
      let btn = document.createElement('button')

      document.body.appendChild(btn)
      assert(spy.callCount).equalTo(0)
      setEventHandlers(btn, {click: spy.call, focus: spy.call, blur: spy.call})
      btn.click()
      btn.click()
      btn.click()
      assert(spy.callCount).equalTo(3)
      btn.focus()
      assert(spy.callCount).equalTo(4)
      btn.blur()
      assert(spy.callCount).equalTo(5)
      document.body.removeChild(btn)
    }]
  ])

new Suite('setStyles')
  .tests([
    ['Should return node passed in untouched if events are empty', assert => {
      setStyles(document.createElement('div'), {})
    }],
    ['Should return node with styles provided applied to it.', assert => {
      let btn = document.createElement('button')
      setStyles(btn, {
        borderRight: '1px solid indianred',
        fontSize: '1.5em',
        'text-align': 'center',
        display: 'inline-flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        justifyContent: 'center'
      })

      assert(btn.style.borderRight).equalTo('1px solid indianred')
      assert(btn.style.fontSize).equalTo('1.5em')
      assert(btn.style.textAlign).equalTo('center')
      assert(btn.style.display).equalTo('inline-flex')
      assert(btn.style.flexFlow).equalTo('row nowrap')
      assert(btn.style.alignItems).equalTo('center')
      assert(btn.style.justifyContent).equalTo('center')
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
    }],
    ['Should properly set style / events as regular attribute if value is not plain object', assert => {
      let div = document.createElement('div')
      assert(div.outerHTML).equalTo('<div></div>')
      setAttributes(div, { style: 'display: flex; align-items: center;', events: 'active' })

      assert(div.outerHTML).equalTo('<div style="display: flex; align-items: center;" events="active"></div>')
    }],
    ['Should properly set event handlers / styles when key / object passed in.', assert => {
      let spy = new Spy()

      let div = document.createElement('div')
      assert(div.style.display).not().equalTo('flex')
      assert(div.style.alignItems).not().equalTo('center')

      setAttributes(div, {
        style: {
          display: 'flex',
          alignItems: 'center'
        },
        events: {
          click(event) { spy.call() }
        }
      })

      assert(div.style.display).equalTo('flex')
      assert(div.style.alignItems).equalTo('center')
      assert(spy.callCount).equalTo(0)
      div.click()
      assert(spy.callCount).equalTo(1)
    }],
  ])
