// ==UserScript==
// @name        .zip link validator
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       none
// @version     1.0
// @author      shovon668
// @run-at      document-end
// @description Check all links in the current webpage and check if any .zip link is suspicious. Then, mark that link red, add a warning and turn off the clicking.
// ==/UserScript==

const toMark = [];
const links = document.getElementsByTagName("a");
for (let i = 0, max = links.length; i < max; i++) {
  if (links[i].href.includes(".zip") && (links[i].href.includes("∕") || links[i].href.includes("%E2%88%95")) && links[i].href.includes("@")) {
    toMark.push(links[i].href);
    links[i].style.background = "#FF0000";
    links[i].style.color = "#FFFFFF";
    let p = document.createElement("p");
    let s = document.createElement("small");
    s.textContent = "[Malicious .zip link; DO NOT VISIT]";
    s.style.fontWeight = "bold";
    s.style.color = "#FF0000";
    p.appendChild(s);
    links[i].parentNode.insertBefore(p, links[i].nextSibling);
    links[i].onclick = function () {
      return false;
    };
  }
}
