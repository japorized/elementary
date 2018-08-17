# elementary startpage/homepage

A startpage for personal usage. Visit it [here](https://japorized.gitlab.io/elementary).

---

## About the page

#### Goals

* Clean codebase
* Minimal & aesthetically pleasing design
* Compatible with any vi-keybinding emulator for browsers (e.g. Vimium)
* Easy to navigate even with a mouse
* Mobile-friendly

#### Usage tips

* Auto-focus on search bar upon visit
* Hit '!' to focus on search bar if it is not already focused
* Search bar redirects to Duckduckgo; [bangs](https://duckduckgo.com/bang?q=) work!
* Hovering over tabs shows the categorized bookmarks
* In mobile view, click on tabs to show bookmarks; vertical scrolling of tabs is possible

#### Fonts used

* [Fontawesome](https://fontawesome.com/)
* [VT323](https://fonts.google.com/specimen/VT323)
* [KFhimaji](https://www.freejapanesefont.com/kf-himaji/)

---

If you want to launch your new tabs with this as your new tab page, on

* Firefox, install the [New Tab Homepage](https://addons.mozilla.org/en-US/firefox/addon/new-tab-homepage/) addon.

* Chrome, install [New Tab Redirect](https://chrome.google.com/webstore/detail/new-tab-redirect/icpgjfneehieebagbmdbhnlpiopdcmna).

* Safari, go to Preferences > General > New tabs open with: Homepage, and then set your homepage to the startpage.

It is possible to use this page locally on your machine and have the above addons/extensions/settings open up the page for you.

---

If you wish to clone/fork and then develop on your own, here's a quick summary of my work structure. Please read the entire section to decide on whether if you want to develop the page similarly.

I'm using gulp as my task runner.

```bash
gulp watch
```

Automatically converts scss into compressed css and minifies js as the files in `/src/` gets modified. This is convenient for development.

```bash
gulp build
```

Does what `gulp watch` does except that it does not watch the files, and runs only once. This is what I use if I'm just making one small change.

If you wish to use the same tools, make sure that you have `npm` installed, and then run this command in the root directory:

```bash
npm i -D
```

---

To deploy to your own repo so that you can access it via `https://<your gitlab username>.gitlab.io/elementary`, assuming that you still call the repo elementary, remember to add a `.gitlab-ci.yml` file that uses Plain HTML.

---

### Known Issues

Only dev issues

* Cannot get BrowserSync to work properly
