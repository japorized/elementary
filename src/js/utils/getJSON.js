/**
 * Get JSON file from given path
 *
 * @param     {string}      path        Path to JSON file
 *
 * @return    {Promise}
 */
export default function getJSON(path) {
  return new Promise(function(resolve, reject) {
    const sessionKey = path.split("/")[1];

    if (window.sessionStorage.getItem(sessionKey) === null) {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", path, true);
      xhr.responseType = "json";
      xhr.onload = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            window.sessionStorage.setItem(
              sessionKey,
              JSON.stringify(xhr.response)
            );
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
