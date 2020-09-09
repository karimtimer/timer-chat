import { Controller } from "stimulus"
import consumer from "channels/consumer"

export default class extends Controller {
static targets = ["mentions"]

  connect() {
    this.username = document.querySelector("meta[name='username']").getAttribute("content")
    this.subscription = consumer.subscriptions.create({ channel: "UnreadsChannel", id: this.data.get("id") }, {
      connected: this._connected.bind(this),
      disconnected: this._disconnected.bind(this),
      received: this._received.bind(this)
    })
  }

  disconnect(){
    consumer.subscriptions.remove(this.subscription)
  }

  _connected(){
  }

  _disconnected(){
  }

  _received(data){
    this.element.classList.add("font-weight-bold")

    if (data.mentions && data.mentions.includes(this.username)){
      let count = parseInt(this.mentionsTarget.textContent)
      this.mentionsTarget.textContent = count + 1
      this.mentionsTarget.removeAttribute("hidden")
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
