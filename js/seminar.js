function generateToken(length) {
  var token = "";
  while (token.length < length) {
    token += (Math.random() * new Date().getTime())
      .toString(36)
      .replace(/\./g, "");
  }
  return token.substr(0, length);
}

function getParameterByName(name, url) {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function addParam(url, param, value) {
  var a = document.createElement("a"),
    regex = /(?:\?|&amp;|&)+([^=]+)(?:=([^&]*))*/g;
  var match,
    str = [];
  a.href = url;
  param = encodeURIComponent(param);
  while ((match = regex.exec(a.search))) {
    if (param != match[1])
      str.push(match[1] + (match[2] ? "=" + match[2] : ""));
  }
  str.push(param + (value ? "=" + encodeURIComponent(value) : ""));
  a.search = str.join("&");
  return a.href;
}

function logger(event) {
document.getElementById("seminar-status").innerHTML = event;
document.getElementById("room").style.display = "block";
  console.log(event);
}

var room = getParameterByName("room") || generateToken(32);
// var link = addParam(window.location.href, "room", room);
var link = "https://github.com/vagelisp/Thessaloniki-WordPress-Meetup-Block-Theme";
document.getElementById("room").innerHTML = link;
document.getElementById("room").href = link;
var qrcode = new QRious({
  element: document.getElementById("qrcode"),
  level: "H",
  padding: 25,
  size: 500,
  value: link,
});

var qrcode = new QRious({
  element: document.getElementById("qrcodeSecond"),
  level: "H",
  padding: 25,
  size: 500,
  value: link,
});