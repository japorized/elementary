var w,btns=document.querySelectorAll("#right > div"),queryBar=document.querySelector("#left input");window.data=(w="/elementary/bookmarks.json",new Promise(function(e,t){var r=new XMLHttpRequest;r.open("GET",w,!0),r.responseType="json",r.onload=function(){r.readyState===XMLHttpRequest.DONE&&(200===r.status?e(r.response):t(r.status))},r.send()}));for(var i=0;i<btns.length;i++)btns[i].addEventListener("click",function(e){document.querySelector("#right > .active").classList.remove("active"),this.classList+="active",document.querySelector("#left > .active").classList.remove("active"),document.querySelector("#left > #"+this.getAttribute("id")+"-content").classList+="active"}),btns[i].addEventListener("mouseover",function(e){document.querySelector("#right > .active").classList.remove("active"),this.classList+="active",document.querySelector("#left > .active").classList.remove("active"),document.querySelector("#left > #"+this.getAttribute("id")+"-content").classList+="active"});document.onkeyup=function(e){if(e.shiftKey&&49==e.keyCode){var t=document.querySelector("#right > .active");"search"!==t.getAttribute("id")&&(t.classList.remove("active"),document.querySelector("#right > #search").classList+="active",document.querySelector("#left > .active").classList.remove("active"),document.querySelector("#left > #search-content").classList+="active"),queryBar.focus()}},queryBar.onkeydown=function(e){var a=this;"Enter"==e.key?!function(e){for(var t=["http://","https://","file://"],r=0;r<t.length;r++)if(0==e.indexOf(t[r]))return!0;return!1}(a.value)?!function(e){for(var t=[".com",".org",".io",".net",".ca",".ink"],r=0;r<t.length;r++)if(0<e.indexOf(t[r]))return!0;return!1}(a.value)?0==a.value.indexOf("/r/")||0==a.value.indexOf("r/")?0==a.value.indexOf("/")?window.location.href="https://reddit.com"+a.value:window.location.href="https://reddit.com/"+a.value:window.location.href="https://duckduckgo.com/?q="+a.value:window.location.href="https://"+a.value:window.location.href=a.value:9==e.keyCode&&(e.preventDefault(),"ht"==a.value?a.value="https://":window.data.then(function(e){for(var t in e)for(var r in t=e[t])-1<(r=t[r]).url.indexOf(a.value.toLowerCase())&&(a.value=r.url)}))};var $datetime_day=document.querySelector(".datetime-day"),$datetime_time=document.querySelector(".datetime-time");function clock(){var e,t=new Date,r=t.getHours(),a=t.getMinutes(),n=t.getSeconds();switch(r=(r<10?"0":"")+r,a=(a<10?"0":"")+a,n=(n<10?"0":"")+n,t.getDay()){case 0:e="日";break;case 1:e="月";break;case 2:e="火";break;case 3:e="水";break;case 4:e="木";break;case 5:e="金";break;case 6:e="土";break;default:e=" "}if(n%2==0)var i=r+":"+a+":"+n;else i=r+" "+a+" "+n;$datetime_time.innerHTML=i,$datetime_day.innerHTML=e}window.data.then(function(e){for(var t in e){var r=t,a=document.querySelector("#"+r+"-content .content-container p");for(var n in t=e[t]){var i="<a tabindex='-1' href='"+(n=t[n]).url+"'>"+n.title+"</a> ";a.innerHTML+=i}}}),clock(),setInterval(clock,1e3);