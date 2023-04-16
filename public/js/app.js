import Header from "../../components/Header.js";
import Main from "../../components/Main.js";
import { renderPuzzle } from "../../components/Puzzle.js";
import { renderPost } from "../../components/Post.js";

const $root = document.createElement("div");
$root.setAttribute("id", "root");
document.body.appendChild($root);

const $header = document.createElement("header");
$root.appendChild($header);
Header();

//렌더링할 때마다 바뀌는 콘텐츠 영역
export function renderMain() {
  let pathParts = location.pathname.split("/");

  const $main = document.createElement("main");
  $root.appendChild($main);

  if (location.pathname === "puzzles") {
    Main();
  } else if (pathParts[1] === "puzzles" && pathParts[2] === "posts") {
    renderPost($main);
  } else if (pathParts[1] === "puzzles" && !isNaN(Number(pathParts[2]))) {
    fetch(`/api/puzzles/${Number(pathParts[2])}`)
      .then((data) => data.json())
      .then((post) => {
        renderPuzzle(post, $main);
      });
  } else if (
    pathParts[1] === "puzzles" &&
    pathParts[2] === "posts" &&
    !isNaN(Number(pathParts[3]))
  ) {
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
