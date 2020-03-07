export function hasName(val) {
  const names = [".com", ".org", ".io", ".net", ".ca", ".ink"];
  for (let i = 0; i < names.length; i++) {
    if (val.indexOf(names[i]) > 0) {
      return true;
    }
  }
  return false;
}

export function hasProtocol(url) {
  const protocols = ["http://", "https://", "file://"];
  for (let i = 0; i < protocols.length; i++) {
    if (url.indexOf(protocols[i]) == 0) {
      return true;
    }
  }
  return false;
}
