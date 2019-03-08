import { Suite } from '../../conssert/index.js'

import { scopeStyles } from '../scope-styles.js'

new Suite('scopeStyles')
  .tests([
    ['Should return identity if no class names are present to scope', assert => {
      const classFree = `
        #page {
          font-size: 16px;
        }

        [data-name] {
          font-weight: bolder;
        }

        input {
          padding: 2em;
        }

        table > thead > tr {
          border-bottom: 2px solid mediumseagreen;
        }
      `

      const scoped = scopeStyles('Module', classFree)
      assert(scoped.styles).equalTo(classFree)
      assert(scoped.classNames).equalTo({})
    }],
    ['Should return properly scoped styles', assert => {
      const withoutScope = `
        #page {
          font-size: 16px;
        }

        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-flow: row nowrap;
        }

        [data-name] {
          font-weight: bolder;
        }

        input {
          padding: 2em;
        }

        .inputWrapper {
          padding: 2em;
        }

        table > thead > tr {
          border-bottom: 2px solid mediumseagreen;
        }

        .modal-body {
          padding: 2em;
        }
      `

      const withScope = `
        #page {
          font-size: 16px;
        }

        .Modal__container {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-flow: row nowrap;
        }

        [data-name] {
          font-weight: bolder;
        }

        input {
          padding: 2em;
        }

        .Modal__inputWrapper {
          padding: 2em;
        }

        table > thead > tr {
          border-bottom: 2px solid mediumseagreen;
        }

        .Modal__modalBody {
          padding: 2em;
        }
      `

      const scoped = scopeStyles('Modal', withoutScope)
      assert(scoped.styles).equalTo(withScope)
      assert(scoped.classNames).equalTo({
        container: 'Modal__container',
        inputWrapper: 'Modal__inputWrapper',
        modalBody: 'Modal__modalBody'
      })
    }],
    ['Should return properly scoped styles with hash', assert => {
      const withoutScope = `
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-flow: row nowrap;
        }

        .inputWrapper {
          padding: 2em;
        }

        .modal-body {
          padding: 2em;
        }
      `

      const withScope = `
        .Modal__container__345 {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-flow: row nowrap;
        }

        .Modal__inputWrapper__345 {
          padding: 2em;
        }

        .Modal__modalBody__345 {
          padding: 2em;
        }
      `

      const scoped = scopeStyles('Modal', withoutScope, '345')
      assert(scoped.styles).equalTo(withScope)
      assert(scoped.classNames).equalTo({
        container: 'Modal__container__345',
        inputWrapper: 'Modal__inputWrapper__345',
        modalBody: 'Modal__modalBody__345'
      })
    }],
    ['Should return properly scoped styles given various lettering styles', assert => {
      const withoutScope = `
        .container__mask--big-map {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-flow: row nowrap;
        }

        .inputWrapper___45h {
          padding: 2em;
        }

        .Modal-body--mixed {
          padding: 2em;
        }

        .aBigOldDivElement {
          padding: 2em;
        }
      `

      const withScope = `
        .Modal__container__mask--big-map__345 {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-flow: row nowrap;
        }

        .Modal__inputWrapper_____34545h {
          padding: 2em;
        }

        .Modal__ModalBodyMixed__345 {
          padding: 2em;
        }

        .Modal__aBigOldDivElement__345 {
          padding: 2em;
        }
      `

      const scoped = scopeStyles('Modal', withoutScope, '345')
      assert(scoped.styles).equalTo(withScope)
      assert(scoped.classNames).equalTo({
        "container__mask--big-map": "Modal__container__mask--big-map__345",
        inputWrapper___: "Modal__inputWrapper_____345",
        ModalBodyMixed: "Modal__ModalBodyMixed__345",
        aBigOldDivElement: "Modal__aBigOldDivElement__345"
      })
    }]
  ])
