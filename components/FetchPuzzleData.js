import { renderPuzzleList } from "./PuzzleList.js";

export function fetchPuzzleData($main) {
  fetch("/api/puzzles")
    .then((res) => res.json())
    .then((postDB) => {
      const { page, perPage, posts, totalPage, total } = postDB;
      renderPuzzleList(page, perPage, totalPage, posts, $main, total);
    });
}
