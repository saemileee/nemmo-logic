import { renderPuzzleList } from "./PuzzleList.js";

//test
import { renderStage } from "./Stage.js";

export function fetchPuzzleData($main) {
  fetch("/api/posts")
    .then((res) => res.json())
    .then((puzzleDB) => {
      renderPuzzleList(puzzleDB, $main);

      //for test
      // renderStage(puzzleDB[0], puzzleDB, $main);
    });
}
