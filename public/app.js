import Header from "../components/Header.js";
import Main from "../components/Main.js";

const $root = document.createElement("div");
$root.setAttribute("id", "root");
document.body.appendChild($root);

const $header = document.createElement("header");
$root.appendChild($header);
Header();

const $main = document.createElement("main");
$root.appendChild($main);
Main();
