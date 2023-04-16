import { renderPost } from "./Post.js";
import { renderPuzzleList } from "./PuzzleList.js";

export function renderPuzzle(data, $main) {
  const styleEl = document.documentElement.style;

  const $gamePage = document.createElement("div");
  $gamePage.setAttribute("id", "game-page-container");
  $main.appendChild($gamePage);

  //제목부분
  const $gamePageHeader = document.createElement("div");
  $gamePageHeader.setAttribute("id", "game-page-header");
  $gamePage.appendChild($gamePageHeader);

  const $puzzleId = document.createElement("span");
  $puzzleId.innerHTML = `${data.id}번`;
  $gamePageHeader.appendChild($puzzleId);

  const $puzzleTitle = document.createElement("span");
  $puzzleTitle.innerHTML = `${data.title}`;
  $gamePageHeader.appendChild($puzzleTitle);

  const $puzzleSize = document.createElement("span");
  $puzzleSize.innerHTML = `${data.size}`;
  $gamePageHeader.appendChild($puzzleSize);

  //게임보드 부분
  const $gameBoardContainer = document.createElement("div");
  $gameBoardContainer.setAttribute("id", "game-board-container");
  $gamePage.appendChild($gameBoardContainer);

  const $gameContainer = document.createElement("div");
  $gameContainer.setAttribute("id", "game-grid-container");
  $gameBoardContainer.appendChild($gameContainer);

  const $emptyCell = document.createElement("div");
  $emptyCell.setAttribute("id", "empty-cell");
  $emptyCell.setAttribute("class", "grid-box");
  $gameContainer.appendChild($emptyCell);

  const $colClues = document.createElement("div");
  $colClues.setAttribute("id", "col-clue");
  $colClues.setAttribute("class", "grid-box");
  $gameContainer.appendChild($colClues);

  const $rowClues = document.createElement("div");
  $rowClues.setAttribute("id", "row-clue");
  $rowClues.setAttribute("class", "grid-box");
  $gameContainer.appendChild($rowClues);

  const $board = document.createElement("div");
  $board.setAttribute("id", "board");
  $board.setAttribute("class", "grid-box");
  $gameContainer.appendChild($board);

  let answerArr = data.answer;

  const ROWS = answerArr.length;
  const COLS = answerArr[0].length;

  let boardSizeW = ROWS * 30;
  let boardSizeH = COLS * 30;

  let cells = [];

  if (ROWS >= 25 || COLS >= 25) {
    boardSizeW = ROWS * 20;
    boardSizeH = COLS * 20;
    styleEl.setProperty("--clue-font-size", `100%`);
  }
  if (ROWS >= 40 || COLS >= 40) {
    boardSizeW = ROWS * 15;
    boardSizeH = COLS * 15;
    styleEl.setProperty("--clue-font-size", `50%`);
  }

  if (ROWS >= 50 || COLS >= 50) {
    boardSizeW = ROWS * 13;
    boardSizeH = COLS * 13;
    styleEl.setProperty("--clue-font-size", `40%`);
  }

  styleEl.setProperty("--board-size-h", `${boardSizeW}px`);
  styleEl.setProperty("--board-size-w", `${boardSizeH}px`);
  styleEl.setProperty("--row-size", ROWS);
  styleEl.setProperty("--col-size", COLS);

  $gamePage.removeAttribute("style");
  //2차원 배열 만들기
  for (let i = 0; i < ROWS; i++) {
    cells.push([]);

    //로우 el생성
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    $board.appendChild(row);

    for (let j = 0; j < COLS; j++) {
      cells[i].push(false);
      //셀 el생성
      const cell = document.createElement("div");
      cell.setAttribute("data-row", `${i}`);
      cell.setAttribute("data-col", `${j}`);
      row.appendChild(cell);

      // cell.addEventListener("click", checkCellArr);
      // cell.addEventListener("click", clickHandler);
      cell.addEventListener("contextmenu", (e) => {
        e.preventDefault();
      });
      cell.addEventListener("mousedown", mouseDownOnCell);
      cell.addEventListener("mousemove", mouseOverOnCell);
      cell.addEventListener("mouseup", mouseUpOnCell);

      //5칸마다 굵은 border
      if (i % 5 === 4 && i > 0 && i !== ROWS - 1) {
        cell.style.borderBottomWidth = "1.5px";
        cell.style.borderBottomColor = "black";
      }

      if (j % 5 === 4 && j > 0 && j !== COLS - 1) {
        cell.style.borderRightWidth = "1.5px";
        cell.style.borderRightColor = "black";
      }
    }
  }

  $board.addEventListener("mouseleave", mouseUpOnCell);

  // ---------------------------
  //| status| L-click | R-click |
  //-----------------------------
  //| false |  true   | "block" |
  //-----------------------------
  //| true  |  false  | "block" |
  //-----------------------------
  //|"block"|  true   |  false  |
  //-----------------------------

  //드래그 시
  let fillMode = false;
  let isMouseDown = false;
  // let isFillMode = false;

  //클릭한 위치의 로우와 칼럼 셀들만 선택할 수 있도록 하기
  let firstClickedCellIdx = [];
  let selectedCellIdx = [];

  function mouseDownOnCell(e) {
    e.preventDefault();
    isMouseDown = true;

    const thisRow = parseInt(e.target.getAttribute("data-row"));
    const thisCol = parseInt(e.target.getAttribute("data-col"));
    const cellStatus = cells[thisRow][thisCol];

    //클릭한 위치의 로우와 칼럼 셀들만 선택할 수 있도록 하기
    firstClickedCellIdx = [thisRow, thisCol];

    //좌/우 클릭에 따라 fillMode 변경
    if (e.button === 0) {
      if (!cellStatus || cellStatus === "block") {
        fillMode = true;
      } else if (cellStatus) {
        fillMode = false;
      }
    }

    if (e.button === 2) {
      if (cellStatus === false || cellStatus === true) {
        fillMode = "block";
      } else if (cellStatus === "block") {
        fillMode = false;
      }
    }
  }

  // const hlRowEl = document.createElement("div");
  // const hlColEl = document.createElement("div");
  // hlRowEl.setAttribute("id", "hl_r");
  // hlColEl.setAttribute("id", "hl_c");

  // hlRowEl.style.width = `${boardSizeW - 3}px`;
  // hlRowEl.style.height = `${boardSizeH / ROWS}px`;
  // hlColEl.style.height = `${boardSizeH - 3}px`;
  // hlColEl.style.width = `${boardSizeW / COLS}px`;

  // $board.append(hlRowEl);
  // $board.append(hlColEl);

  // function moveHlEl(thisRow, thisCol) {
  //   const cellEl = document.querySelector(
  //     `[data-row="${thisRow}"][data-col="${thisCol}"]`
  //   );

  //   hlRowEl.style.top = `${thisRow * cellSize}px`;
  //   hlColEl.style.left = `${thisCol * cellSize}px`;
  // }

  function mouseOverOnCell(e) {
    const thisRow = parseInt(e.target.getAttribute("data-row"));
    const thisCol = parseInt(e.target.getAttribute("data-col"));
    //선택이 가능한 셀들 중 현재 마우스가 위치한 셀 인덱스 값을 기준으로 위치한 값듦 배열에 넣기
    selectedCellIdx = [];
    if (isMouseDown) {
      if (thisRow === firstClickedCellIdx[0]) {
        // 큰 인덱스에서 작은 인덱스 가는 경우도 생각해야함
        const twoPoints = [firstClickedCellIdx[1], thisCol].sort(
          (a, b) => a - b
        );
        for (let i = twoPoints[0]; i <= twoPoints[1]; i++) {
          selectedCellIdx.push([thisRow, i]);
        }
      } else if (thisCol === firstClickedCellIdx[1]) {
        const twoPoints = [thisRow, firstClickedCellIdx[0]].sort(
          (a, b) => a - b
        );
        for (let i = twoPoints[0]; i <= twoPoints[1]; i++) {
          selectedCellIdx.push([i, thisCol]);
        }
      }
    }
  }

  function mouseUpOnCell() {
    //만약 셀렉티드 셀인덱스 값이 없을 경우 firstClicked 친구로 반영
    //셀렉티드셀인덱스 값을 가지고 실제 셀 데이터에 반영

    isMouseDown ? changeCellStatus(fillMode) : null;
    function changeCellStatus(fillMode) {
      if (selectedCellIdx.length !== 0) {
        for (let cellIdx of selectedCellIdx) {
          cells[cellIdx[0]][cellIdx[1]] = fillMode;
          fillCell(cellIdx[0], cellIdx[1]);
        }
      } else {
        cells[firstClickedCellIdx[0]][firstClickedCellIdx[1]] = fillMode;
        fillCell(firstClickedCellIdx[0], firstClickedCellIdx[1]);
      }
    }
    isMouseDown = false;
    selectedCellIdx = [];
  }

  //배열을 바탕으로 셀 요소 채우기

  function fillCell(rIdx, cIdx) {
    const cellStatus = cells[rIdx][cIdx];
    const cellEl = document.querySelector(
      `[data-row="${rIdx}"][data-col="${cIdx}"]`
    );
    if (cellStatus === false) {
      cellEl.removeAttribute("class");
    } else if (cellStatus === true) {
      cellEl.setAttribute("class", "true");
    } else if (cellStatus === "block") {
      cellEl.setAttribute("class", "block");
    }
  }

  //힌트 컨테이너 만들기
  const rowClue = createClue("row", ROWS);
  const colClue = createClue("col", COLS);

  function createClue(matrixName, matrix) {
    const clue = document.getElementById(`${matrixName}-clue`);
    for (let i = 0; i < matrix; i++) {
      const clueContainer = document.createElement("div");
      clueContainer.setAttribute("class", `${matrixName}${i} clue-container`);
      clue.appendChild(clueContainer);
    }
    return clue;
  }

  //페인트 된 셀 카운트하기
  function countTasks(matrixName, size, thisCell) {
    let clueArr = [];
    let taskCount = 0;

    //셀 순회
    for (let i = 0; i < size; i++) {
      //셀 순회 중 현재 셀이 true인 경우 카운트가 1씩 증가, true가 아니라면 지금까지 카운트 된 셀은 clueArr에 담고 카운트 초기화, 마지막 인덱스의 셀이라면 현재 셀이 true이더라도 clueArr에 추가
      if (matrixName === "row" && answerArr[thisCell][i] === true) {
        taskCount += 1;
        if (i === size - 1) {
          clueArr.push(taskCount);
        }
      } else if (matrixName === "col" && answerArr[i][thisCell] === true) {
        taskCount += 1;
        if (i === size - 1) {
          clueArr.push(taskCount);
        }
      } else {
        taskCount && clueArr.push(taskCount);
        taskCount = 0;
      }
    }

    return clueArr;
  }

  //clue 세팅
  function clueSetting() {
    for (let i = 0; i < ROWS; i++) {
      const rowClueArr = countTasks("row", COLS, i);
      //clue콘테이너 만들고 clueArr 받아서 페인팅하기
      const rowClueContainer = document.querySelector(`#row-clue .row${i}`);
      createClueCell(rowClueArr, rowClueContainer);
      //5칸마다 굵은 border
      if (i % 5 === 4 && i > 0) {
        rowClueContainer.style.borderBottomWidth = "1.5px";
        rowClueContainer.style.borderBottomColor = "black";
      }
    }

    for (let i = 0; i < COLS; i++) {
      const colClueArr = countTasks("col", ROWS, i);
      //clue콘테이너 만들고 clueArr 받아서 페인팅하기
      const colClueContainer = document.querySelector(`#col-clue .col${i}`);
      createClueCell(colClueArr, colClueContainer);
      if (i % 5 === 4 && i > 0) {
        colClueContainer.style.borderRightWidth = "1.5px";
        colClueContainer.style.borderRightColor = "black";
      }
    }

    function createClueCell(clueArr, clueContainer) {
      clueArr.forEach((count) => {
        const pEl = document.createElement("p");
        pEl.innerHTML = count;
        pEl.addEventListener("click", (e) => {
          e.target.classList.toggle("done");
        });
        clueContainer.append(pEl);
      });
    }
  }

  clueSetting();

  //답안 제출
  function submitAnswer(e) {
    let incorrectCounter = 0;

    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        if (cells[i][j] === "block") {
          cells[i][j] = false;
        }
        cells[i][j] !== answerArr[i][j] ? incorrectCounter++ : null;
      }
    }
    incorrectCounter === 0
      ? alert("축하합니다!!")
      : alert(`다시 시도해 보세요.\n틀린개수: ${incorrectCounter}개`);
  }

  //제출버튼
  const $submitBtn = document.createElement("button");
  $submitBtn.setAttribute("id", "submit");
  $submitBtn.addEventListener("click", submitAnswer);
  $submitBtn.innerHTML = "제출하기";
  $gamePage.appendChild($submitBtn);

  if (location.host === "localhost:8080") {
    const $editBtn = document.createElement("button");
    $editBtn.setAttribute("id", "edit");
    $editBtn.addEventListener("click", () => {
      $main.innerHTML = "";
      renderPost($main);
      window.history.pushState(null, "", `/puzzles/posts/${data.id}`);
      //renderPost(data)
      //renderPost 에서 title, size value 보존,
    });
    $editBtn.innerHTML = "수정하기";
    $gamePage.appendChild($editBtn);
  }

  if (location.host === "localhost:8080") {
    const $deleteBtn = document.createElement("button");
    $deleteBtn.setAttribute("id", "delete");
    $deleteBtn.addEventListener("click", () => {
      const puzzleId = location.pathname.split("/")[2];
      fetch(`/api/puzzles/${puzzleId}`, { method: "DELETE" })
        .then((res) => {
          if (res.ok) {
            alert("삭제되었습니다.");
            window.location.href = "/puzzles";
          } else {
            alert("오류가 발생했습니다.");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("권한을 확인하세요.");
        });
    });
    $deleteBtn.innerHTML = "삭제하기";
    $gamePage.appendChild($deleteBtn);
  }
}
