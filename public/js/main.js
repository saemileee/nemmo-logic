// import { paintStage } from "https://saemileee.github.io/nemmo-logic/public/js/paintStage.js";
import { renderPuzzleList } from "../../components/PuzzleList.js";
import { paintStage } from "../../components/Stage.js";

fetch("https://saemileee.github.io/nemmo-logic/public/puzzle.json")
  .then((res) => res.json())
  .then((puzzleDB) => {
    renderPuzzleList(puzzleDB);
    return puzzleDB;
  });
// .then((puzzleDB) => {
//   const puzzleListTitles = document.querySelectorAll("tbody tr td.title a");

//   puzzleListTitles.forEach((title) => {
//     title.addEventListener("click", puzzleListTitlesClickHandler);
//   });

//   function puzzleListTitlesClickHandler(e) {
//     e.preventDefault();

//     const $puzzleList = document.getElementById("puzzle-list");
//     const puzzleID = Number(e.target.parentElement.getAttribute("data-id"));
//     const puzzleArr = puzzleDB.filter((data) => data.id === puzzleID)[0]
//       .answer;
//     $puzzleList.style.display = "none";
//     paintStage(puzzleArr);

//     window.history.pushState(null, "", `puzzle/${puzzleID}`);

//     window.onpopstate = () => {
//       $puzzleList.style.display = "block";
//       const emptyArr = [];
//       paintStage();
//     };
//   }
// });
