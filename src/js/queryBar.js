import { hasName, hasProtocol } from "./utils/urlchecks";
import { getBookmarks } from './bookmarks';

import { bangs } from "./bangs";

const queryBar = document.querySelector("#left input");

// smart search
queryBar.onkeydown = function(e) {
  const $this = this;

  if (e.key == "Enter") {
    if (hasProtocol($this.value)) {
      window.location.href = $this.value;
    } else {
      if (hasName($this.value)) {
        window.location.href = "https://" + $this.value;
      } else if (
        $this.value.indexOf("/r/") == 0 ||
        $this.value.indexOf("r/") == 0
      ) {
        if ($this.value.indexOf("/") == 0) {
          window.location.href = "https://reddit.com" + $this.value;
        } else {
          window.location.href = "https://reddit.com/" + $this.value;
        }
      } else {
        if ($this.value.indexOf("qw ") == 0) {
          // escape default search to use qwant as search engine
          window.location.href =
            "https://lite.qwant.com/?q=" +
            $this.value.substring(3, $this.length);
        } else {
          // defaults to searching using ddg
          window.location.href = "https://duckduckgo.com/?q=" + $this.value;
        }
      }
    }
  } else if (e.keyCode == 9) {
    // tab key
    e.preventDefault();
    if ($this.value == "ht") {
      $this.value = "https://";
    } else {
      getBookmarks().then(function(database) {
        for (let data in database) {
          data = database[data];
          for (let key in data) {
            key = data[key];
            if (key.url.indexOf($this.value.toLowerCase()) > -1) {
              $this.value = key.url;
            }
          }
        }
      });
    }
  }
};

queryBar.onkeyup = function(e) {
  if (this.value === "") {
    cleanBangMatches();
  } else if (this.value.charAt(0) === "!") {
    const wantedBang = this.value.substring(1);
    const matches = checkbang(wantedBang);
    showBangMatches(matches);

    if (matches.length === 0) {
      cleanBangMatches();
    } else {
      makeBangMatchesClickable();
    }

    if (e.keyCode === 9) {
      this.value = "!" + matches[0].bang;
    }
  }
};

function checkbang(query) {
  return bangs.filter(item => item.bang.includes(query));
}

function showBangMatches(matches) {
  const searchWrapper = document.querySelector("#left > #search-content");
  let div = document.querySelector(".bang-matches");
  if (div === null) {
    div = document.createElement("div");
    div.classList.add("bang-matches");
    searchWrapper.appendChild(div);
  }
  let ul = document.querySelector(".bang-matches ul");
  if (ul === null) {
    ul = document.createElement("ul");
    div.appendChild(ul);
  } else {
    while (ul.hasChildNodes()) {
      ul.removeChild(ul.lastChild);
    }
  }
  matches.forEach(match => {
    const bang = document.createElement("b");
    bang.innerHTML = "!" + match.bang;
    const desc = document.createElement("span");
    desc.innerHTML = match.name;
    const li = document.createElement("li");
    li.appendChild(bang);
    li.appendChild(desc);
    ul.appendChild(li);
  });
}

function handleBangClick() {
  const bang = this.querySelector("b").innerHTML;
  queryBar.value = bang;
}

function makeBangMatchesClickable() {
  const lis = document.querySelectorAll(".bang-matches ul li");
  if (lis !== null) {
    lis.forEach(li => {
      li.addEventListener("click", handleBangClick);
    });
  }
}

function cleanBangMatches() {
  const div = document.querySelector(".bang-matches");
  if (div !== null) {
    div.querySelectorAll("ul li").forEach(bang => {
      bang.removeEventListener("click", handleBangClick);
    });
    div.parentNode.removeChild(div);
  }
}

// DISABLED and kept for reference
// REASON: CORS disallow reading of resource from different origin
// SOLUTION: Keep a personal list of bangs
// function getDDGBangs() {
//   const bangsSrc = "https://duckduckgo.com/bang.v253.js";
//   return new Promise(function(resolve, reject) {
//     const xhr = new XMLHttpRequest();
//     xhr.open("GET", bangsSrc, true);;
//     xhr.send();
//     xhr.onload = () => {
//       if (xhr.readyState === XMLHttpRequest.DONE) {
//         if (xhr.status === 200) {
//           window.localStorage("bang", xhr.response);
//           resolve(xhr.response);
//         } else {
//           reject(xhr.status);
//         }
//       }
//     };
//   });
// }

