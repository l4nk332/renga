import {
  coerceTrue,
  isValidChild,
  areValidChildren,
  isPlainObject,
  isOneOfType,
  extractClassNames,
  unique,
  deepEquals
} from '../utils/helpers.js'

new Suite('coerceTrue')
  .tests([
    ['Should return identity if typeof value is not boolean true', assert => {
      assert(coerceTrue(1)).equalTo(1)
      assert(coerceTrue('test')).equalTo('test')
      assert(coerceTrue({a: 1})).equalTo({a: 1})
      assert(coerceTrue(['a', 'b'])).equalTo(['a', 'b'])
      assert(coerceTrue(false)).equalTo(false)
    }],
    ['Should return empty string if boolean true is passed in', assert => {
      assert(coerceTrue(true)).equalTo('')
    }]
  ])

new Suite('isPlainObject')
  .tests([
    ['Should return false for values that are not plain objects', assert => {
      assert(isPlainObject('Person')).equalTo(false)
      assert(isPlainObject(['a'])).equalTo(false)
      assert(isPlainObject()).equalTo(false)
      assert(isPlainObject(NaN)).equalTo(false)
      assert(isPlainObject(null)).equalTo(false)
      assert(isPlainObject(true)).equalTo(false)
      assert(isPlainObject(false)).equalTo(false)
      assert(isPlainObject(20)).equalTo(false)
    }],
    ['Should return true for values that are plain objects', assert => {
      assert(isPlainObject({})).equalTo(true)
      assert(isPlainObject({a: 1})).equalTo(true)
      assert(isPlainObject({a: {b: 2}})).equalTo(true)
      assert(isPlainObject(new Date())).equalTo(true)
      assert(isPlainObject(document.createElement('a'))).equalTo(true)
    }]
  ])

new Suite('isValidChild')
  .tests([
    ['Should return true if provided with a valid child', assert => {
      assert(isValidChild('Person')).equalTo(true)
      assert(isValidChild('')).equalTo(true)
      assert(isValidChild(0)).equalTo(true)
      const aTag = document.createElement('a')
      assert(isValidChild(aTag)).equalTo(true)
    }],
    ['Should return false if provided with an invalid child', assert => { }]
  ])

new Suite('areValidChildren')
  .tests([
    ['Should return true if provided with valid children', assert => {
      assert(areValidChildren('Person')).equalTo(true)
      assert(areValidChildren('')).equalTo(true)
      assert(areValidChildren([])).equalTo(true)
      assert(areValidChildren(['Person', 'is', 'good'])).equalTo(true)

      const aTag = document.createElement('a')
      const pTag = document.createElement('p')

      assert(areValidChildren(aTag)).equalTo(true)
      assert(areValidChildren([aTag, pTag])).equalTo(true)
      assert(areValidChildren(['Person', pTag])).equalTo(true)
    }],
    ['Should return false if provided with invalid children', assert => {
      assert(areValidChildren({})).equalTo(false)
      assert(areValidChildren({name: 'Luke'})).equalTo(false)
      assert(areValidChildren(true)).equalTo(false)
      assert(areValidChildren(false)).equalTo(false)
      assert(areValidChildren(null)).equalTo(false)
      assert(areValidChildren([
        0, null, true, 'Andy', document.createElement('b')
      ])).equalTo(false)
      assert(areValidChildren(['Person', ['is', 'good']])).equalTo(false)
      assert(areValidChildren(['Person', ['is', ['good']]])).equalTo(false)

      const aTag = document.createElement('a')
      const pTag = document.createElement('p')
      const divTag = document.createElement('div')

      assert(areValidChildren([aTag, [pTag, divTag]])).equalTo(false)
      assert(areValidChildren([aTag, [pTag, divTag, 'Person']])).equalTo(false)
    }]
  ])

new Suite('isOneOfType')
  .tests([
    ['Should return true if type of value is one of types provided', assert => {
      assert(isOneOfType(['string'], 'Person')).equalTo(true)
      assert(isOneOfType(['string', 'object'], {})).equalTo(true)
      assert(isOneOfType(['string', 'object'], [])).equalTo(true)
      assert(isOneOfType(['boolean'], true)).equalTo(true)
    }],
    ['Should return false if type of value is not one of types provided', assert => {
      assert(isOneOfType(['string'], [])).equalTo(false)
      assert(isOneOfType(['string', 'object'], true)).equalTo(false)
      assert(isOneOfType(['string', 'boolean'], [])).equalTo(false)
      assert(isOneOfType(['object'], 'Person')).equalTo(false)
    }]
  ])

new Suite('extractClassNames')
  .tests([
    ['Should return empty array no css class selectors are found', assert => {
      assert(extractClassNames('')).equalTo([])
      assert(extractClassNames('#name')).equalTo([])
      assert(extractClassNames('[name="Alan"]')).equalTo([])
      assert(extractClassNames('h1 > p')).equalTo([])
      assert(extractClassNames(`
        #id {
          color: mediumseagreen;
        }

        div + div {
          border: 3px solid grey;
        }

        [type='text'] {
          background: white;
        }
      `)).equalTo([])
    }],
    ['Should return an array of the class names extracted from the css class selectors found', assert => {
      assert(extractClassNames('.input')).equalTo(['input'])
      assert(extractClassNames('.input.input-success.input_lg.cleanUI'))
        .equalTo(['input', 'input-success', 'input_lg', 'cleanUI'])
      assert(extractClassNames('.input .input-error .input_lg .cleanUI'))
        .equalTo(['input', 'input-error', 'input_lg', 'cleanUI'])
      assert(extractClassNames('.input--nameIsBig__classy'))
        .equalTo(['input--nameIsBig__classy'])
      assert(extractClassNames(`
        .input {}

        .input.input-success.input_lg.cleanUI {}

        .input .input-error .input_lg .cleanUI {}

        .input--nameIsBig__classy {}

        #id > .saucy + .alpha > [type='text'] {}
      `)).equalTo([
        'input',
        'input-success',
        'input_lg',
        'cleanUI',
        'input-error',
        'input--nameIsBig__classy',
        'saucy',
        'alpha'
      ])
    }]
  ])

new Suite('unique')
  .tests([
    ['Should return a unique set of values given an containing duplicates', assert => {
      assert(unique([1, 1, 1])).equalTo([1])
      assert(unique([1, 2, 2, 1, 3, 1, 4, 2, 1])).equalTo([1, 2, 3, 4])
      assert(unique([1, 2, [1, 2], 1, {a: 1}, 1, [1, 2], 2, {a: 1}]))
        .equalTo([1, 2, [1, 2], {a: 1}])
    }],
    ['Should return identity when empty array passed in', assert => {
      assert(unique([])).equalTo([])
    }],
    ['Should return identity when array with no duplicates passed in', assert => {
      assert(unique([1, 2, 3])).equalTo([1, 2, 3])
      assert(unique([1, 2, [1, 2], {a: 1}])).equalTo([1, 2, [1, 2], {a: 1}])
    }]
  ])

new Suite('deepEquals')
  .tests([
    ['Should return true for equal primitive values', assert => {
      assert(deepEquals(1, 1)).equalTo(true)
      assert(deepEquals(true, true)).equalTo(true)
      assert(deepEquals(false, false)).equalTo(true)
      assert(deepEquals(null, null)).equalTo(true)
      assert(deepEquals(undefined, undefined)).equalTo(true)
      assert(deepEquals('Person', 'Person')).equalTo(true)
    }],
    ['Should return true for equal reference values', assert => {
      assert(deepEquals([1], [1])).equalTo(true)
      assert(deepEquals([1, 'Person'], [1, 'Person'])).equalTo(true)
      assert(deepEquals([1, ['Person']], [1, ['Person']])).equalTo(true)
      assert(deepEquals({}, {})).equalTo(true)
      assert(deepEquals({a: 1}, {a: 1})).equalTo(true)
      assert(deepEquals({a: 1, b: [{c: 4}, 14]}, {a: 1, b: [{c: 4}, 14]}))
        .equalTo(true)
    }],
    ['Should return false for primitives that are not equal', assert => {
      assert(deepEquals(1, 2)).equalTo(false)
      assert(deepEquals(1, true)).equalTo(false)
      assert(deepEquals(0, false)).equalTo(false)
      assert(deepEquals('', false)).equalTo(false)
      assert(deepEquals('', 0)).equalTo(false)
      assert(deepEquals('Person', 1)).equalTo(false)
      assert(deepEquals(null, 0)).equalTo(false)
      assert(deepEquals(undefined, null)).equalTo(false)
    }],
    ['Should return false for reference values that are not equal', assert => {
      assert(deepEquals([1], [2])).equalTo(false)
      assert(deepEquals([1, 'Person'], [1, 'person'])).equalTo(false)
      assert(deepEquals([1, ['Person']], [1, ['Person', 3]])).equalTo(false)
      assert(deepEquals({}, [])).equalTo(false)
      assert(deepEquals({a: 2}, {a: 1})).equalTo(false)
      assert(deepEquals({0: 1}, [1])).equalTo(false)
      assert(deepEquals({a: 1, b: [{c: 4}, [14]]}, {a: 1, b: [{c: 4}, 14]}))
        .equalTo(false)
    }],
  ])
