import { element } from '../renga.js'
import { scopeStyles } from '../scope-styles.js'

const {
  button,
  canvas,
  div,
  form,
  fragment,
  h1,
  p,
  span,
  strong,
  style,
  text
} = element

new Suite('renga - elements')
  .tests([
    ['Should allow for empty elements to be created', assert => {
      assert(p().outerHTML).equalTo(document.createElement('p').outerHTML)
      assert(span().outerHTML).equalTo(document.createElement('span').outerHTML)
      assert(h1().outerHTML).equalTo(document.createElement('h1').outerHTML)
      assert(canvas().outerHTML).equalTo(document.createElement('canvas').outerHTML)
    }],
    ['Should allow for elements to be created conditionally', assert => {
      const DAY = 1

      assert(div([
        DAY === 0 && strong('Today'),
        DAY === 1 && strong('Tomorrow'),
        DAY === 2 && strong('The After Tomorrow'),
        DAY === 0 ? ' is' : null,
        (DAY === 1 || DAY === 2) && ' will be',
        ' your last chance to buy tickets.'
      ]).outerHTML)
        .equalTo('<div><strong>Tomorrow</strong> will be your last chance to buy tickets.</div>')
    }],
    ['Should allow for single text node child elements to be created', assert => {
      const testP = p('paragraph')

      const compareP = document.createElement('p')
      compareP.innerText = 'paragraph'

      assert(testP.outerHTML).equalTo(compareP.outerHTML)
    }],
    ['Should allow for single text node child elements to be created w/ attributes', assert => {
      const testP = p({class: 'content', id: 'main'}, 'paragraph')

      const compareP = document.createElement('p')
      compareP.setAttribute('class', 'content')
      compareP.setAttribute('id', 'main')
      compareP.innerText = 'paragraph'

      assert(testP.outerHTML).equalTo(compareP.outerHTML)
    }],
    ['Should allow for single DOM node child elements to be created', assert => {
      const testDiv = div(p())

      const compareDiv = document.createElement('div')
      compareDiv.appendChild(document.createElement('p'))

      assert(testDiv.outerHTML).equalTo(compareDiv.outerHTML)
    }],
    ['Should allow for single DOM node child elements to be created w/ attributes', assert => {
      const testDiv = div({class: 'container'}, p({class: 'content'}, 'paragraph'))

      const compareDiv = document.createElement('div')
      compareDiv.setAttribute('class', 'container')
      const compareP = document.createElement('p')
      compareP.setAttribute('class', 'content')
      compareP.innerText = 'paragraph'
      compareDiv.appendChild(compareP)

      assert(testDiv.outerHTML).equalTo(compareDiv.outerHTML)
    }],
    ['Should allow for mixed subtree of children', assert => {
      const testP = p([
        'This is some ', span('important'), ' text.'
      ])

      const compareP = document.createElement('p')
      const compareSpan = document.createElement('span')
      compareSpan.innerText = 'important'
      compareP.appendChild(document.createTextNode('This is some '))
      compareP.appendChild(compareSpan)
      compareP.appendChild(document.createTextNode(' text.'))

      assert(testP.outerHTML).equalTo(compareP.outerHTML)
    }],
    ['Should allow for mixed subtree of children w/ attributes', assert => {
      const testP = p({class: 'content'}, [
        'This is some ', span({class: 'highlight'}, 'important'), ' text.'
      ])

      const compareP = document.createElement('p')
      compareP.setAttribute('class', 'content')
      const compareSpan = document.createElement('span')
      compareSpan.setAttribute('class', 'highlight')
      compareSpan.innerText = 'important'
      compareP.appendChild(document.createTextNode('This is some '))
      compareP.appendChild(compareSpan)
      compareP.appendChild(document.createTextNode(' text.'))

      assert(testP.outerHTML).equalTo(compareP.outerHTML)
    }],
    ['Should allow for elements to be created with event listeners', assert => {
      let clickCount = 0
      const testButton = button({events: {click() { clickCount++ }}}, 'Button')

      const compareButton = document.createElement('button')
      compareButton.innerText = 'Button'

      assert(clickCount).equalTo(0)
      assert(testButton.outerHTML).equalTo(compareButton.outerHTML)
      testButton.click()
      testButton.click()
      testButton.click()
      assert(clickCount).equalTo(3)
    }],
    ['Should allow for elements to be created with inline style as string', assert => {
      const testButton = button({style: 'display: inline-block; margin-right: 1em;'}, 'Button')

      const compareButton = document.createElement('button')
      compareButton.innerText = 'Button'
      compareButton.setAttribute('style', 'display: inline-block; margin-right: 1em;')

      assert(testButton.outerHTML).equalTo(compareButton.outerHTML)
      assert(testButton.style.display).equalTo('inline-block')
      assert(testButton.style.marginRight).equalTo('1em')
    }],
    ['Should allow for elements to be created with inline style as object', assert => {
      const testButton = button({style: {display: 'inline-block', marginRight: '1em'}}, 'Button')

      const compareButton = document.createElement('button')
      compareButton.innerText = 'Button'
      compareButton.setAttribute('style', 'display: inline-block; margin-right: 1em;')

      assert(testButton.outerHTML).equalTo(compareButton.outerHTML)
      assert(testButton.style.display).equalTo('inline-block')
      assert(testButton.style.marginRight).equalTo('1em')
    }],
    ['Should properly handle setting boolean attributes on elements', assert => {
      const activeButton = button({disabled: false}, 'Active')
      const inactiveButton = button({disabled: true}, 'Inactive')

      assert(activeButton.outerHTML).equalTo('<button>Active</button>')
      assert(inactiveButton.outerHTML).equalTo('<button disabled="">Inactive</button>')
    }],
    ['Should allow for construction of DOM Fragments', assert => {
      const testFrag = fragment([div(), span(), button()])
      const testDiv = div()
      testDiv.appendChild(testFrag)

      const compareFrag = document.createDocumentFragment()
      compareFrag.append(document.createElement('div'))
      compareFrag.append(document.createElement('span'))
      compareFrag.append(document.createElement('button'))
      const compareDiv = document.createElement('div')
      compareDiv.appendChild(compareFrag)

      assert(testDiv.outerHTML).equalTo(compareDiv.outerHTML)
    }],
    ['Should allow for construction of solo TextNodes', assert => {
      const testText = text('Text Node')
      const compareText = document.createTextNode('Text Node')

      assert(testText.innerText).equalTo(compareText.innerText)
      assert(span(testText).outerHTML).equalTo('<span>Text Node</span>')
      assert(span(text(null)).outerHTML).equalTo('<span></span>')
      assert(span(text(false)).outerHTML).equalTo('<span></span>')
    }],
    ['Should work with scopeStyles', assert => {
      const styles = `
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .button {
          outline: none;
          border: 2px solid mediumseagreen;
        }
      `

      const { classNames } = scopeStyles('Form', styles)

      const testStyle = style(styles)
      assert(testStyle.innerHTML).equalTo(styles)
      const testForm = form({class: classNames.container}, button({class: classNames.button}))
      assert(testForm.outerHTML).equalTo('<form class="Form__container"><button class="Form__button"></button></form>')
    }],
  ])

// TODO: Add tests for scoped-styles
