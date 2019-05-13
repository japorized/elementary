// Tabs
var btns = document.querySelectorAll('#right > div'),
	queryBar = document.querySelector('#left input');

for (var i = 0; i < btns.length; i++) {
	btns[i].addEventListener('click', function(e) {
		document.querySelector('#right > .active').classList.remove('active');
		this.classList += 'active';
		document.querySelector('#left > .active').classList.remove('active');
		document.querySelector('#left > #' + this.getAttribute('id') + '-content').classList += 'active';
	});
	btns[i].addEventListener('mouseover', function(e) {
		document.querySelector('#right > .active').classList.remove('active');
		this.classList += 'active';
		document.querySelector('#left > .active').classList.remove('active');
		document.querySelector('#left > #' + this.getAttribute('id') + '-content').classList += 'active';
	});
}

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
			  window.location.href = "https://duckduckgo.com/?q=" + $this.value;
		  }
		}
	} else if (e.keyCode == 9) {
		e.preventDefault();
		if ($this.value.indexOf('ht') == 0) {
			$this.value = 'https://';
		}
	}
};

// Fill in bookmarks
function bookmarks() {
  window.data = getJSON('/bookmarks.json').then(function(database) {
    for ( var data in database ) {
      var datakey = data;
      data = database[data];
      for ( var key in data ) {
        key = data[key];
        var str = "<a tabindex='-1' href='" + key.url + "'>" + key.title + "</a> ";
        var $box = document.querySelector('#' + datakey + '-content .content-container p');
        $box.innerHTML += str;
      }
    }
  });
}

function getJSON(path) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", path, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                resolve(xhr.response);
            } else {
              reject(xhr.status);
            }
        }
    };
    xhr.send();
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

bookmarks();
clock();
setInterval(clock, 1000);
