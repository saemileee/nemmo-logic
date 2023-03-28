import { paintStage } from "./paintStage.js";

const puzzleTable = document.querySelector("#puzzle-table tbody");

fetch("puzzle.json")
  .then((res) => res.json())
  .then((puzzleDB) => {
    let puzzleListEl = "";
    puzzleDB.forEach((data) => {
      puzzleListEl += `<tr>
        <td class="id">${data.id}</td>
        <td class="status">${data.status}</td>
        <td class="title" data-id="${data.id}"><a href="#">${data.title}</a></td>
        <td class="size">${data.size}</td>
        <td class="finished-count">${data.finishedCount}</td>
        <td class="recommendation">${data.recommendation}</td>
        <td class="avg-time">${data.avgTime}</td>
    </tr>`;
      puzzleTable.innerHTML = puzzleListEl;
    });

    return puzzleDB;
  })
  .then((puzzleDB) => {
    const puzzleListTitles = document.querySelectorAll("tbody tr td.title a");

    puzzleListTitles.forEach((title) => {
      title.addEventListener("click", puzzleListTitlesClickHandler);
    });

    function puzzleListTitlesClickHandler(e) {
      e.preventDefault();

      // window.history.pushState(null, "", "puzzle");
      const puzzleList = document.getElementById("puzzle-list");

      const puzzleID = Number(e.target.parentElement.getAttribute("data-id"));
      const puzzleArr = puzzleDB.filter((data) => data.id === puzzleID)[0]
        .answer;
      puzzleList.style.display = "none";
      paintStage(puzzleArr);
    }
  });
