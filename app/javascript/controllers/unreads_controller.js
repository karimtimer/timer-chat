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

    if (data.mentions){
      console.log("shoulafsdfsdgo");
      this.notify(data.body)
    }
  }

  notify(message) {

    if(!("Notification" in window)) {
      console.error("This browser does not support desktop notification");
    }

    else if (Notification.permission === "default" || "granted" ){
      var notification = new Notification(message);
    }
  }
}
