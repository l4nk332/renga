export default class Spy {
  constructor() {
    this.callCount = 0
    this.call = this.call.bind(this)
  }

  call() {
    this.callCount++
  }
}

