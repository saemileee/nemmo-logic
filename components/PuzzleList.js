import { renderStage } from "./Stage.js";

export function renderPuzzleList(puzzleDB, $main) {
  const $puzzleListCount = document.createElement("p");
  $puzzleListCount.setAttribute("id", "puzzle-count");
  $puzzleListCount.innerHTML = `${puzzleDB.length}개믜 문제`;
  $main.appendChild($puzzleListCount);

  const $puzzleTable = document.createElement("table");
  $puzzleTable.setAttribute("id", "puzzle-table");
  $main.appendChild($puzzleTable);

  const $thead = document.createElement("thead");
  $puzzleTable.appendChild($thead);

  const $tr = document.createElement("tr");
  $thead.appendChild($tr);

  const $thPuzzleId = document.createElement("th");
  $thPuzzleId.setAttribute("class", "id");
  $thPuzzleId.innerHTML = "번호";
  $tr.appendChild($thPuzzleId);

  const $thPuzzleTitle = document.createElement("th");
  $thPuzzleTitle.setAttribute("class", "title");
  $thPuzzleTitle.innerHTML = "제목";
  $tr.appendChild($thPuzzleTitle);

  const $thPuzzleSize = document.createElement("th");
  $thPuzzleSize.setAttribute("class", "size");
  $thPuzzleSize.innerHTML = "사미즈";
  $tr.appendChild($thPuzzleSize);

  const $tbody = document.createElement("tbody");
  $puzzleTable.appendChild($tbody);

  //퍼즐 리스트
  puzzleDB.forEach((data) => {
    const $tr = document.createElement("tr");
    $tbody.appendChild($tr);

    const $tdPuzzleId = document.createElement("td");
    $tdPuzzleId.setAttribute("class", "id");
    $tdPuzzleId.innerHTML = `${data.id}`;
    $tr.appendChild($tdPuzzleId);

    const $tdPuzzleTitle = document.createElement("td");
    $tdPuzzleTitle.setAttribute("class", "title");
    $tdPuzzleTitle.setAttribute("data-id", `${data.id}`);
    $tdPuzzleTitle.innerHTML = `<a href="#">${data.title}</a>`;
    $tr.appendChild($tdPuzzleTitle);

    function puzzleListTitlesClickHandler(e) {
      e.preventDefault();
      $puzzleTable.remove();
      $puzzleListCount.remove();
      renderStage(data, puzzleDB, $main);

      window.history.pushState(null, "", `puzzles/${data.id}`);
    }
    $tdPuzzleTitle.addEventListener("click", puzzleListTitlesClickHandler);

    const $tdPuzzleSize = document.createElement("td");
    $tdPuzzleSize.setAttribute("class", "size");
    $tdPuzzleSize.innerHTML = `${data.size}`;
    $tr.appendChild($tdPuzzleSize);
  });
}
