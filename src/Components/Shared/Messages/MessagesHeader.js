import React from "react";
function MessagesHeader() {
  return (
    <div class="projects-section-header">
      <p>Routes</p>
      <div class="d-flex">
        <button
          class="add-btn"
          title="Add New Project"
          onclick="openNewRoute()"
        >
          <i class="fa-solid fa-plus"></i>
        </button>
        <button class="messages-close">
          <i class="fa-regular fa-circle-xmark"></i>
        </button>
      </div>
    </div>
  );
}

export default MessagesHeader;
