import Harness from './harness.js'
import Suite from './suite.js'

new Suite('My First Test Suite...')
  .before(() => console.log('set up for test suite...'))
  .beforeEach(() => console.log('set up per test...'))
  .afterEach(() => console.log('tear down per test'))
  .after(() => console.log('tear down for test suite...'))
  .tests([
    ['Asserting Equal To', assert => {
      assert(1).equalTo(1)
      assert([2]).equalTo([2])
      assert([3, [4]]).equalTo([3, [4]])
      assert([3, [4, {a: 4, b: {}}]]).equalTo([3, [4, {a: 4, b: {}}]])
    }],
    ['Asserting Not Equal To', assert => {
      assert(1).not().equalTo(2)
      assert([2]).not().equalTo([2, 3])
      assert([3, [4, {a: 4, b: {}}]]).not().equalTo([3, [5, {a: 4, b: {}}]])
    }],
    ['Asserting Same As', assert => {
      const x = [1]
      const y = x
      assert(x).sameAs(y)
    }],

    ['Asserting Not Same', assert => {
      const x = [1]
      const y = [1]
      assert(x).not().sameAs(y)
    }]
  ])

Harness.run(console.log)
