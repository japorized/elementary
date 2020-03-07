import "./clock";
import * as bookmarks from "./bookmarks";
import "./tabs";
import "./queryBar";

// fill in bookmarks onload
bookmarks.getBookmarks().then(b => bookmarks.populateBookmarks(b));
