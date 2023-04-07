import Header from "../../components/Header.js";
import Main from "../../components/Main.js";
import { renderStage } from "../../components/Stage.js";

const currentPathname = location.pathname;

const $root = document.createElement("div");
$root.setAttribute("id", "root");
document.body.appendChild($root);

const $header = document.createElement("header");
$root.appendChild($header);
Header();

export function renderMain() {
  const $main = document.createElement("main");
  $root.appendChild($main);
  if (currentPathname === "/") {
    Main();
  }
  if (currentPathname.includes("/puzzle")) {
    fetch("../public/puzzle.json")
      .then((data) => data.json())
      .then((puzzleDB) => {
        const puzzleID = Number(currentPathname.split("/")[2]);
        const data = puzzleDB.find((puzzle) => puzzle.id === puzzleID);
        renderStage(data, puzzleDB, $main);
      });
  }
}

renderMain();
