import { Controller } from "stimulus"
import consumer from "channels/consumer"

export default class extends Controller {

  connect() {
    this.subscription = consumer.subscriptions.create({ channel: "UnreadsChannel", id: this.data.get("id") }, {
      connected: this._connected.bind(this),
      disconnected: this._disconnected.bind(this),
      received: this._received.bind(this)
    })
  }


  _connected(){
  }

  _disconnected(){
  }

  _received(data){
    this.element.classList.add("font-weight-bold")
  }
}
