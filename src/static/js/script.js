document
  .querySelector(".sidebar-icon")
  .addEventListener("mouseover", function () {
    this.querySelector("i").classList.add("fas", "fa-info-circle"); // Change to info icon on hover
  });

document
  .querySelector(".sidebar-icon")
  .addEventListener("mouseout", function () {
    this.querySelector("i").classList.remove("fas", "fa-info-circle"); // Revert to original icon
    this.querySelector("i").classList.add("fas", "fa-home"); // Ensure the original icon class is added back
  });


  document.getElementById('')
