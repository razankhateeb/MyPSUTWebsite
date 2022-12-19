import React from "react";
import "./Messages.css";
import MessageBox from "./MessageBox";
import MessagesHeader from "./MessagesHeader";
function SideMenu() {
  return (
    <div class="messages-section">
      <MessagesHeader></MessagesHeader>
      <div class="messages">
        <MessageBox></MessageBox>
      </div>
    </div>
  );
}
export default SideMenu;
