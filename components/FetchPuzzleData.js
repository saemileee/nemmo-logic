import { renderPuzzleList } from "./PuzzleList.js";

//test
import { renderStage } from "./Stage.js";

export function fetchPuzzleData($main) {
  fetch("https://saemileee.github.io/nemmo-logic/public/puzzle.json")
    .then((res) => res.json())
    .then((puzzleDB) => {
      const $puzzleListCount = document.createElement("p");
      $puzzleListCount.setAttribute("id", "puzzle-count");
      $puzzleListCount.innerHTML = `${puzzleDB.length}개믜 문제`;
      $main.appendChild($puzzleListCount);
      renderPuzzleList(puzzleDB, $main);
      renderStage(puzzleTitle, puzzleArr, puzzleDB, $main);
    });
}
