const btns = document.querySelectorAll("#right > div");
const queryBar = document.querySelector("#left input");

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("mouseover", function() {
    document.querySelector("#right > .active").classList.remove("active");
    this.classList += "active";
    document.querySelector("#left > .active").classList.remove("active");
    document.querySelector(
      "#left > #" + this.getAttribute("id") + "-content"
    ).classList += "active";
  });
}

// switch to search tab on !
document.onkeyup = function(e) {
  if (e.shiftKey && e.keyCode == 49) {
    const curActive = document.querySelector("#right > .active");
    if (curActive.getAttribute("id") !== "search") {
      curActive.classList.remove("active");
      document.querySelector("#right > #search").classList += "active";
      document.querySelector("#left > .active").classList.remove("active");
      document.querySelector("#left > #search-content").classList += "active";
    }
    queryBar.focus();
  }
};
