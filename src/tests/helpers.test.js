import { Suite } from '../../browserrt.js'

import {
  coerceTrue,
  areValidChildren,
  isPlainObject
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

new Suite('areValidChildren')
  .tests([
    ['Should return true if provided with valid children', assert => {
      assert(areValidChildren('Person')).equalTo(true)
      assert(areValidChildren('')).equalTo(true)
      assert(areValidChildren([])).equalTo(true)
      assert(areValidChildren(['Person', 'is', 'good'])).equalTo(true)
      assert(areValidChildren(['Person', ['is', 'good']])).equalTo(true)
      assert(areValidChildren(['Person', ['is', ['good']]])).equalTo(true)

      const aTag = document.createElement('a')
      const pTag = document.createElement('p')
      const divTag = document.createElement('div')

      assert(areValidChildren(aTag)).equalTo(true)
      assert(areValidChildren([aTag, pTag])).equalTo(true)
      assert(areValidChildren([aTag, [pTag, divTag]])).equalTo(true)
      assert(areValidChildren([aTag, [pTag, divTag, 'Person']])).equalTo(true)
    }],
    ['Should return false if provided with invalid children', assert => {
      assert(areValidChildren({})).equalTo(false)
      assert(areValidChildren({name: 'Luke'})).equalTo(false)
      assert(areValidChildren(true)).equalTo(false)
      assert(areValidChildren(false)).equalTo(false)
      assert(areValidChildren(null)).equalTo(false)
      assert(areValidChildren(0)).equalTo(false)
      // assert(areValidChildren([
      //   0, null, true, 'Andy', document.createElement('b')
      // ])).equalTo(false)
    }]
  ])
