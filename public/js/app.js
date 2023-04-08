import Header from "../../components/Header.js";
import Main from "../../components/Main.js";
import { renderStage } from "../../components/Stage.js";
import { renderPost } from "../../components/Post.js";

const $root = document.createElement("div");
$root.setAttribute("id", "root");
document.body.appendChild($root);

const $header = document.createElement("header");
$root.appendChild($header);
Header();

//렌더링할 때마다 바뀌는 콘텐츠 영역
export function renderMain() {
  let currentPathname = location.pathname;

  const $main = document.createElement("main");
  $root.appendChild($main);
  if (currentPathname === "/") {
    Main();
  }
  if (Number(currentPathname.charAt(currentPathname.length - 1))) {
    fetch("../public/puzzle.json")
      .then((data) => data.json())
      .then((puzzleDB) => {
        const puzzleID = Number(currentPathname.split("/")[2]);
        const data = puzzleDB.find((puzzle) => puzzle.id === puzzleID);
        renderStage(data, puzzleDB, $main);
      });
  }
  if (currentPathname === "/puzzles/post") {
    renderPost($main);
  }
}

//뒤로가기, 앞으로가기
window.onpopstate = () => {
  const $main = document.getElementsByTagName("main")[0];
  $main.remove();
  renderMain();
};

//푸터 부분 추가 필요

renderMain();
