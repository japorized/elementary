// Tabs
var btns = document.querySelectorAll('#right > div'),
	queryBar = document.querySelector('#left input');

let bangs = [
  { "bang": "apkg", "name": "Archlinux packages" },
  { "bang": "archpkg", "name": "Archlinux packages" },
  { "bang": "arch", "name": "Archlinux wiki" },
  { "bang": "archwiki", "name": "Archlinux wiki" },
  { "bang": "archaur", "name": "Archlinux AUR" },
  { "bang": "aur", "name": "Archlinux AUR" },
  { "bang": "archlinux", "name": "Archlinux Forum" },
  { "bang": "archforum", "name": "Archlinux Forum" },
  { "bang": "w", "name": "Wikipedia" },
  { "bang": "wiki", "name": "Wikipedia" },
  { "bang": "bulba", "name": "Bulbapedia" },
  { "bang": "yt", "name": "YouTube" },
  { "bang": "youtube", "name": "YouTube" },
  { "bang": "ytor", "name": "YouTube on Repeat" },
  { "bang": "youtubeonrepeat", "name": "YouTube on Repeat" },
  { "bang": "gh", "name": "Github" },
  { "bang": "github", "name": "Github" },
  { "bang": "glab", "name": "Gitlab" },
  { "bang": "gitlab", "name": "Gitlab" },
  { "bang": "latexwb", "name": "LaTeX Wikibooks" },
  { "bang": "ctan", "name": "CTAN" },
  { "bang": "crates", "name": "Crates.io" },
  { "bang": "cargo", "name": "Crates.io" },
  { "bang": "rust", "name": "Rust stdlib docs" },
  { "bang": "rustdoc", "name": "Rust docs" },
  { "bang": "js", "name": "MDN JS Documentation" },
  { "bang": "css", "name": "MDN CSS Documentation" },
  { "bang": "csst", "name": "CSS Tricks" },
  { "bang": "r", "name": "Reddit" },
  { "bang": "subr", "name": "Subreddits" },
  { "bang": "subreddit", "name": "Subreddits" },
  { "bang": "dictionaryr", "name": "Dictionary.com (reference)" },
  { "bang": "thes", "name": "Thesaurus.com" },
  { "bang": "thesaurus", "name": "Thesaurus.com" },
  { "bang": "wa", "name": "Wolfram Alpha" },
  { "bang": "wolfram", "name": "Wolfram Alpha" },
  { "bang": "wolf", "name": "Wolfram Alpha" },
  { "bang": "math", "name": "Wolfram Mathworld" },
  { "bang": "mathworld", "name": "Wolfram Mathworld" }
];

if ( window.location.href.includes("http://localhost") ) {
  window.data = getJSON('/bookmarks.json');
} else {
  window.data = getJSON('/elementary/bookmarks.json');
}

for (var i = 0; i < btns.length; i++) {
	btns[i].addEventListener('mouseover', function() {
		document.querySelector('#right > .active').classList.remove('active');
		this.classList += 'active';
		document.querySelector('#left > .active').classList.remove('active');
		document.querySelector('#left > #' + this.getAttribute('id') + '-content').classList += 'active';
	});
}

// switch to search tab on !
document.onkeyup = function (e) {
	if (e.shiftKey && e.keyCode == 49) {
		var curActive = document.querySelector('#right > .active');
		if ( curActive.getAttribute('id') !== 'search' ) {
			curActive.classList.remove('active');
			document.querySelector('#right > #search').classList += 'active';
			document.querySelector('#left > .active').classList.remove('active');
			document.querySelector('#left > #search-content').classList += 'active';
		}
		queryBar.focus();
	}
};

// smart search
queryBar.onkeydown = function(e) {
  var $this = this;

	if (e.key == "Enter") {
		if (hasProtocol($this.value)) {
			  window.location.href = $this.value;
		} else {
      if (hasName($this.value)) {
        window.location.href = "https://" + $this.value;
      } else if ($this.value.indexOf('/r/') == 0 || $this.value.indexOf('r/') == 0) {
        if ( $this.value.indexOf('/') == 0 ) {
          window.location.href = "https://reddit.com" + $this.value;
        } else {
          window.location.href = "https://reddit.com/" + $this.value;
        }
      } else {
        if ( $this.value.indexOf('qw ') == 0 ) { // escape default search to use qwant as search engine
          window.location.href = "https://lite.qwant.com/?q=" + $this.value.substring(3, $this.length);
        } else { // defaults to searching using ddg
			    window.location.href = "https://duckduckgo.com/?q=" + $this.value;
        }
		  }
		}
	} else if (e.keyCode == 9) { // tab key
		e.preventDefault();
		if ($this.value == "ht") {
			$this.value = 'https://';
    } else {
      window.data.then(function(database) {
        for ( var data in database ) {
          data = database[data];
          for ( var key in data ) {
            key = data[key];
            if ( key.url.indexOf($this.value.toLowerCase()) > -1 ) {
              $this.value = key.url;
            }
          }
        }
      });
    }
	}
};

queryBar.onkeyup = function(e) {
  if ( this.value === "" ) {
    cleanBangMatches();
  } else if ( this.value.charAt(0) === "!" ) {
    const matches = checkbang(this.value.substring(1));
    showBangMatches(matches);
    if ( matches.length === 0 ) {
      cleanBangMatches();
    } else {
      makeBangMatchesClickable();
    }
    if ( e.keyCode === 9 ) {
      this.value = "!" + matches[0].bang;
    }
  }
}

// fill in bookmarks onload
function bookmarks() {
  window.data.then(function(database) {
    for ( var data in database ) {
      var datakey = data;
      var $box = document.querySelector('#' + datakey + '-content .content-container p');
      data = database[data];

      for ( var key in data ) {
        key = data[key];
        var str = "<a tabindex='-1' href='" + key.url + "'>" + key.title + "</a> ";
        $box.innerHTML += str;
      }
    }
  });
}

// Date & Time
var $datetime_day = document.querySelector('.datetime-day'),
    $datetime_time = document.querySelector('.datetime-time');

function clock() {
  var rawtime = new Date(),
      curHours = rawtime.getHours(),
      curMinutes = rawtime.getMinutes(),
      curSeconds = rawtime.getSeconds(),
      curDay = rawtime.getDay(),
      daystr;

  curHours = ( curHours < 10 ? "0" : "" ) + curHours;
  curMinutes = ( curMinutes < 10 ? "0" : "" ) + curMinutes;
  curSeconds = ( curSeconds < 10 ? "0" : "" ) + curSeconds;

  switch (curDay) {
    case 0:
      daystr = "日";
      break;
    case 1:
      daystr = "月";
      break;
    case 2:
      daystr = "火";
      break;
    case 3:
      daystr = "水";
      break;
    case 4:
      daystr = "木";
      break;
    case 5:
      daystr = "金";
      break;
    case 6:
      daystr = "土";
      break;
    default:
      daystr = " ";
  }

  if (curSeconds % 2 == 0)
    var curTimeString = curHours + ":" + curMinutes + ":" + curSeconds;
  else
    var curTimeString = curHours + " " + curMinutes + " " + curSeconds;

  $datetime_time.innerHTML = curTimeString;
  $datetime_day.innerHTML = daystr;
}

/* 
 * UTILITIES
 */
function hasName(val) {
  var names = [ '.com', '.org', '.io', '.net', '.ca', '.ink' ];
  for ( var i = 0 ; i < names.length ; i++ ) {
    if ( val.indexOf(names[i]) > 0 ) {
      return true;
    }
  }
  return false;
}

function hasProtocol(url) {
  var protocols = [ 'http://', 'https://', 'file://' ];
  for ( var i = 0 ; i < protocols.length ; i++ ) {
    if ( url.indexOf(protocols[i]) == 0 ) {
      return true;
    }
  }
  return false;
}

function getJSON(path) {
  return new Promise(function(resolve, reject) {
    const sessionKey = path.split('/')[1];
    if ( window.sessionStorage.getItem(sessionKey) === null ) {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", path, true);
      xhr.responseType = 'json';
      xhr.onload = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            window.sessionStorage.setItem(sessionKey, JSON.stringify(xhr.response));
            resolve(xhr.response);
          } else {
            reject(xhr.status);
          }
        }
      };
      xhr.send();
    } else {
      const json = JSON.parse(window.sessionStorage.getItem(sessionKey));
      resolve(json);
    }
  });
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

function checkbang(query) {
  return bangs.filter(item => item.bang.includes(query));
}

function showBangMatches(matches) {
  const searchWrapper = document.querySelector('#left > #search-content');
  let div = document.querySelector('.bang-matches');
  if ( div === null ) {
    div = document.createElement("div");
    div.classList.add('bang-matches');
    searchWrapper.appendChild(div);
  }
  let ul = document.querySelector('.bang-matches ul');
  if ( ul === null ) {
    ul = document.createElement("ul");
    div.appendChild(ul);
  } else {
    while (ul.hasChildNodes()) {
      ul.removeChild(ul.lastChild);
    }
  }
  matches.forEach((match) => {
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

function makeBangMatchesClickable() {
  const lis = document.querySelectorAll('.bang-matches ul li');
  if ( lis !== null ) {
    lis.forEach((li) => {
      li.addEventListener('click', () => {
        const bang = li.querySelector('b').innerHTML;
        queryBar.value = bang;
      });
    });
  }
};

function cleanBangMatches() {
  const div = document.querySelector('.bang-matches');
  if ( div !== null ) {
    div.parentNode.removeChild(div);
  }
}

bookmarks();
clock();
setInterval(clock, 1000);
