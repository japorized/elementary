import getJSON from "./utils/getJSON";

export function populateBookmarks(bookmarks) {
  for (let data in bookmarks) {
    const datakey = data;
    const $box = document.querySelector(
      "#" + datakey + "-content .content-container p"
    );
    data = bookmarks[data];

    for (let key in data) {
      key = data[key];
      const str =
        "<a tabindex='-1' href='" + key.url + "'>" + key.title + "</a> ";
      $box.innerHTML += str;
    }
  }
}

export function getBookmarks() {
  if (window.location.href.includes("http://localhost")) {
    return getJSON("/bookmarks.json");
  } else {
    return getJSON("/elementary/bookmarks.json");
  }
}
