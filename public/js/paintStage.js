export function paintStage(puzzleArr) {
  const styleEl = document.documentElement.style;

  const gamePage = document.getElementById("game-page-container");
  const gameBoard = document.getElementById("board");

  const answerArr = puzzleArr;

  const ROWS = answerArr.length;
  const COLS = answerArr[0].length;

  styleEl.setProperty("--board-size-h", `${ROWS * 0.5 * 100}px`);
  styleEl.setProperty("--board-size-w", `${COLS * 0.5 * 100}px`);
  styleEl.setProperty("--row-size", ROWS);
  styleEl.setProperty("--col-size", COLS);

  let cells = [];

  gamePage.removeAttribute("style");
  //2차원 배열 만들기
  for (let i = 0; i < ROWS; i++) {
    cells.push([]);

    //로우 el생성
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    gameBoard.appendChild(row);

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
      if (j % 5 === 0 && j > 0) {
        cell.style.borderLeftWidth = "1.5px";
        cell.style.borderLeftColor = "black";
      }
      if (i % 5 === 0 && i > 0) {
        cell.style.borderTopWidth = "1.5px";
        cell.style.borderTopColor = "black";
      }
    }
  }
  gameBoard.addEventListener("mouseleave", mouseUpOnCell);

  // ---------------------------
  //| state | L-click | R-click |
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

  function mouseDownOnCell(e) {
    e.preventDefault();
    isMouseDown = true;

    const thisRow = parseInt(e.target.getAttribute("data-row"));
    const thisCol = parseInt(e.target.getAttribute("data-col"));
    const cellStatus = cells[thisRow][thisCol];

    if (e.button === 0) {
      if (!cellStatus || cellStatus === "block") {
        fillMode = true;
      } else if (cellStatus) {
        fillMode = false;
      }
    }

    if (e.button === 2) {
      if (!cellStatus || cellStatus) {
        fillMode = "block";
      } else if (cellStatus === "block") {
        fillMode = false;
      }
    }
  }

  function mouseOverOnCell(e) {
    const thisRow = parseInt(e.target.getAttribute("data-row"));
    const thisCol = parseInt(e.target.getAttribute("data-col"));
    if (isMouseDown) {
      if (!fillMode) {
        cells[thisRow][thisCol] = false;
      } else if (fillMode === true) {
        cells[thisRow][thisCol] = true;
      } else if (fillMode === "block") {
        cells[thisRow][thisCol] = "block";
      }
    }

    paintCell(thisRow, thisCol, e);
  }

  function mouseUpOnCell() {
    isMouseDown = false;
    console.log("mouseup");
  }

  //배열을 바탕으로 셀 요소 채우기
  function paintCell(row, col, e) {
    const cellStatus = cells[row][col];
    if (cellStatus === false) {
      e.target.removeAttribute("class");
    } else if (cellStatus === true) {
      e.target.setAttribute("class", "true");
    } else if (cellStatus === "block") {
      e.target.setAttribute("class", "block");
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
      //5칸마다 굵은 border
      if (i % 5 === 0 && matrixName === "row") {
        clueContainer.style.borderTopWidth = "1.5px";
      } else if (i % 5 === 0 && matrixName === "col") {
        clueContainer.style.borderLeftWidth = "1.5px";
      }
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
      rowClueContainer.innerHTML = rowClueArr
        .map((count) => `<p>${count}</p>`)
        .join("");
    }

    for (let i = 0; i < COLS; i++) {
      const colClueArr = countTasks("col", ROWS, i);
      //clue콘테이너 만들고 clueArr 받아서 페인팅하기
      const colClueContainer = document.querySelector(`#col-clue .col${i}`);
      colClueContainer.innerHTML = colClueArr
        .map((count) => `<p>${count}</p>`)
        .join("");
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

  const submitBtn = document.querySelector("#submit");

  submitBtn.addEventListener("click", submitAnswer);
}
