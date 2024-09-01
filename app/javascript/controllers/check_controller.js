import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="check"
export default class extends Controller {
  connect() {
    console.log("Check Controller Connected");
  }

  active(event) {
    console.log("Check Controller Active");
    console.log(event.target);
    const id = event.target.dataset.id;
    const csrtToken = document.querySelector('meta[name="csrf-token"]').content;

    fetch(`/tasks/${id}/active`, {
      method: "POST",
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrtToken
      },
      body: JSON.stringify({ completed: event.target.checked })
    })
    .then(response => response.text())
    .then(Turbo.renderStreamMessage)
  }
}
