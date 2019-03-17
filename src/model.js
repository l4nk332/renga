// TODO: Use import to validate model state
import { isPlainObject } from './utils/helpers.js'

class Model {
  constructor(state = {}) {
    this.subscribed = []
    this.stateProxy = new Proxy(state, this._handler())
  }

  _handler() {
    const { render, subscribed } = this

    return {
      set(obj, key, value, receiver) {
        obj[key] = value
        render(receiver, subscribed)
      }
    }
  }

  subscribe(mountNode, spec) {
    const subscription = [mountNode, spec]

    this.subscribed.push(subscription)
    this.render(this.stateProxy, [subscription])
  }

  unsubscribe(node) {
    // TODO: Add suport for...
  }

  render(stateProxy, subscriptions) {
    subscriptions.forEach(([mountNode, spec]) => {
      // TODO: Need a way to have unique id persist on both mounted nodes and spec nodes.
      // TODO: Generate spec tree from spec and stateProxy
      // TODO: Iterate through both trees commiting DOM updates as necessary to mounted tree.
      //         - If child exists in spec tree and not in mounted, create / append new node to mounted tree.
      //         - If child does not exist in spec tree but is in mounted, remove node from mounted tree.
      //         - If child exist in spec tree and is in mounted, replace mounted node's attributes with spec node's attributes.
    })
  }
}

const model = new Model({title: ''})

const mountNode = document.createElement('div')
document.body.appendChild(mountNode)

model.subscribe(mountNode, formSpec)

// const Main = state => {
//   const { title, items } = state

//   return (
//     main({class: 'mainContainer'}, [
//       h1({id: 'header'}, title),
//       aside({id: 'sidebar'}),
//       section({class: 'flexRow'}, items.map(({name, description}) => (
//         dl([
//           dt(name),
//           dd(description)
//         ])
//       ))),
//       input({
//         type: 'text',
//         events: {
//           input({target}) {
//             state.title = target.value
//           }
//         }
//       })
//     ])
//   )
// }
