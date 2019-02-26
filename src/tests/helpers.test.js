import { Suite } from '../../browserrt.js'

import { coerceBoolean } from '../utils/helpers.js'

new Suite('coerceBoolean')
  .tests([
    ['Should return identity if typeof value is not boolean', assert => {
      assert(coerceBoolean(1)).equalTo(1)
      assert(coerceBoolean('test')).equalTo('test')
      assert(coerceBoolean({a: 1})).equalTo({a: 1})
      assert(coerceBoolean(['a', 'b'])).equalTo(['a', 'b'])
    }]
  ])
