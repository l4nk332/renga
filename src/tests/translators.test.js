import { Suite } from '../../browserrt.js'

import {
  isValidKabobCase,
  isValidCamelCase
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
