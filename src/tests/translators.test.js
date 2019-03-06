import { Suite } from '../../browserrt.js'

import {
  isValidKabobCase,
  isValidCamelCase,
  camel2Kabob,
  kabob2Camel
} from '../utils/translators.js'

new Suite('isValidKabobCase')
  .tests([
    ['Should return false for invalid kabob cased inputs', assert => {
      assert(isValidKabobCase('invalid')).equalTo(false)
      assert(isValidKabobCase('invalidKabob')).equalTo(false)
      assert(isValidKabobCase('')).equalTo(false)
      assert(isValidKabobCase('-')).equalTo(false)
      assert(isValidKabobCase('invalid-')).equalTo(false)
      assert(isValidKabobCase('-invalid-')).equalTo(false)
      assert(isValidKabobCase('-invalid-kabob')).equalTo(false)
      assert(isValidKabobCase('invalid-kabob-')).equalTo(false)
      assert(isValidKabobCase('invalid_kabob')).equalTo(false)
      assert(isValidKabobCase('invalid_kabob-case')).equalTo(false)
      assert(isValidKabobCase('invalid kabob-case')).equalTo(false)
    }],
    ['Should return true for valid kabob cased inputs', assert => {
      assert(isValidKabobCase('valid-kabob')).equalTo(true)
      assert(isValidKabobCase('validKabob-case')).equalTo(true)
      assert(isValidKabobCase('valid----kabob')).equalTo(true)
      assert(isValidKabobCase('valid-kabob--case')).equalTo(true)
      assert(isValidKabobCase('valid-kabob-case')).equalTo(true)
      assert(isValidKabobCase('VALID-kabob-case')).equalTo(true)
    }],
  ])

new Suite('isValidCamelCase')
  .tests([
    ['Should return false for invalid camel cased inputs', assert => {
      assert(isValidCamelCase('invalid')).equalTo(false)
      assert(isValidCamelCase('')).equalTo(false)
      assert(isValidCamelCase('-')).equalTo(false)
      assert(isValidCamelCase('Invalid-')).equalTo(false)
      assert(isValidCamelCase('_InValid')).equalTo(false)
      assert(isValidCamelCase('I_nvalid')).equalTo(false)
      assert(isValidCamelCase('invalid-camel-')).equalTo(false)
      assert(isValidCamelCase('CapitalCase')).equalTo(false)
    }],
    ['Should return true for valid camel cased inputs', assert => {
      assert(isValidCamelCase('isValid')).equalTo(true)
      assert(isValidCamelCase('isValidAgain')).equalTo(true)
      assert(isValidCamelCase('stillisValid')).equalTo(true)
      assert(isValidCamelCase('stillisValid')).equalTo(true)
      assert(isValidCamelCase('iTgoEsOn')).equalTo(true)
      assert(isValidCamelCase('withAT')).equalTo(true)
      assert(isValidCamelCase('iTTestsFalse')).equalTo(true)
    }]
  ])

new Suite('camel2Kabob')
  .tests([
    ['Should return identity of value passed in if not camel case', assert => {
      assert(camel2Kabob('value')).equalTo('value')
      assert(camel2Kabob('_value')).equalTo('_value')
      assert(camel2Kabob('is_value')).equalTo('is_value')
      assert(camel2Kabob('is-value')).equalTo('is-value')
      assert(camel2Kabob('is-value-again')).equalTo('is-value-again')
      assert(camel2Kabob('is-value_again')).equalTo('is-value_again')
      assert(camel2Kabob('is-value--again')).equalTo('is-value--again')
      assert(camel2Kabob('IsCapitalCase')).equalTo('IsCapitalCase')
    }],
    ['Should return value translated to kabob case if camel cased value passed in', assert => {
      assert(camel2Kabob('isValue')).equalTo('is-value')
      assert(camel2Kabob('isValueAgain')).equalTo('is-value-again')
      assert(camel2Kabob('isValueAGain')).equalTo('is-value-a-gain')
    }]
  ])

new Suite('kabob2Camel')
  .tests([
    ['Should return identity of value passed in if not kabob case', assert => {
      assert(kabob2Camel('value')).equalTo('value')
      assert(kabob2Camel('valueIs')).equalTo('valueIs')
      assert(kabob2Camel('valueIsSame')).equalTo('valueIsSame')
      assert(kabob2Camel('value_Is_Same')).equalTo('value_Is_Same')
      assert(kabob2Camel('__value_')).equalTo('__value_')
    }],
    ['Should return value translated to camel case if kabob case value passed in', assert => {
      assert(kabob2Camel('value-is')).equalTo('valueIs')
      assert(kabob2Camel('value-is-same')).equalTo('valueIsSame')
      assert(kabob2Camel('value-Is-Same')).equalTo('valueIsSame')
      assert(kabob2Camel('value-iS-sAme')).equalTo('valueIsSame')
      assert(kabob2Camel('value---iS----sAme')).equalTo('valueIsSame')
    }],
  ])
