import { renderPuzzleList } from "./PuzzleList.js";

//test
import { renderStage } from "./Stage.js";

export function fetchPuzzleData($main) {
  fetch("https://saemileee.github.io/nemmo-logic/public/puzzle.json")
    .then((res) => res.json())
    .then((puzzleDB) => {
      renderPuzzleList(puzzleDB, $main);

      //for test
      // renderStage(puzzleDB[0], puzzleDB, $main);
    });
}
