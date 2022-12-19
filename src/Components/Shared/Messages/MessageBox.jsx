import React from "react";

function MessageBox() {
  return (
    <div class="message-box" onclick="openRoute()">
      <i class="fa-solid fa-bus-simple"></i>
      <div class="message-content">
        <div class="message-header">
          <div class="name">Medina Route</div>
        </div>
      </div>
    </div>
  );
}

export default MessageBox;
