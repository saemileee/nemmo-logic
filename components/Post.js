import { renderStage } from "../../components/Stage.js";

export function renderPost($main) {
  let ROWS = 5;
  let COLS = 5;

  const styleEl = document.documentElement.style;

  const $gamePage = document.createElement("div");
  $gamePage.setAttribute("id", "game-page-container");
  $main.appendChild($gamePage);

  const $topInputsContainer = document.createElement("div");
  $topInputsContainer.setAttribute("class", "top-inputs-container");
  $gamePage.appendChild($topInputsContainer);

  const $titleLabel = document.createElement("label");
  $titleLabel.setAttribute("for", "title-input");
  $topInputsContainer.appendChild($titleLabel);
  $titleLabel.innerHTML = "제목";

  const $titleInput = document.createElement("input");
  $titleInput.setAttribute("id", "title-input");
  $titleInput.setAttribute("placeholder", "제목을 입력해 주세요.");
  $topInputsContainer.appendChild($titleInput);

  const $sizeLabel = document.createElement("label");
  $sizeLabel.setAttribute("for", "col-size-input");
  $topInputsContainer.appendChild($sizeLabel);
  $sizeLabel.innerHTML = "사이즈";

  const $sizeInputsDiv = document.createElement("div");
  $topInputsContainer.appendChild($sizeInputsDiv);

  const $colSizeLabel = document.createElement("label");
  $colSizeLabel.setAttribute("for", "col-size-input");
  $colSizeLabel.setAttribute("class", "size-label");
  $sizeInputsDiv.appendChild($colSizeLabel);
  $colSizeLabel.innerHTML = "가로";

  const $colSizeInput = document.createElement("input");
  $colSizeInput.setAttribute("id", "col-size-input");
  $colSizeInput.setAttribute("type", "number");
  $colSizeInput.setAttribute("name", "col-size");
  $colSizeInput.setAttribute("value", `${COLS}`);
  $colSizeInput.setAttribute("min", "5");
  $colSizeInput.setAttribute("max", "50");
  $sizeInputsDiv.appendChild($colSizeInput);

  const $rowSizeLabel = document.createElement("label");
  $rowSizeLabel.setAttribute("for", "row-size-input");
  $rowSizeLabel.setAttribute("class", "size-label");
  $sizeInputsDiv.appendChild($rowSizeLabel);
  $rowSizeLabel.innerHTML = "세로";

  const $rowSizeInput = document.createElement("input");
  $rowSizeInput.setAttribute("id", "row-size-input");
  $rowSizeInput.setAttribute("type", "number");
  $rowSizeInput.setAttribute("name", "row-size");
  $rowSizeInput.setAttribute("value", `${ROWS}`);
  $rowSizeInput.setAttribute("min", "5");
  $rowSizeInput.setAttribute("max", "50");
  $sizeInputsDiv.appendChild($rowSizeInput);

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

  createGameBoardByMatrixSize();
  $rowSizeInput.addEventListener("change", (e) => {
    sizeInputChangeHandler("ROWS", e);
  });

  $colSizeInput.addEventListener("change", (e) => {
    sizeInputChangeHandler("COLS", e);
  });

  function sizeInputChangeHandler(matrixName, e) {
    matrixName === "ROWS"
      ? (ROWS = parseInt(e.target.value))
      : (COLS = parseInt(e.target.value));
    $emptyCell.innerHTML = "";
    $colClues.innerHTML = "";
    $rowClues.innerHTML = "";
    $board.innerHTML = "";
    createGameBoardByMatrixSize();
  }

  let answerCells = [];
  function createGameBoardByMatrixSize() {
    let cells = [];
    let boardSizeW = ROWS * 30;
    let boardSizeH = COLS * 30;
    if (ROWS >= 25 || COLS >= 25) {
      boardSizeW = ROWS * 20;
      boardSizeH = COLS * 20;
      styleEl.setProperty("--clue-font-size", `75%`);
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
      answerCells = cells;
    }

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
      clueSetting();
    }

    //힌트 컨테이너 만들기
    createClue("row", ROWS);
    createClue("col", COLS);

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
        if (matrixName === "row" && cells[thisCell][i] === true) {
          taskCount += 1;
          if (i === size - 1) {
            clueArr.push(taskCount);
          }
        } else if (matrixName === "col" && cells[i][thisCell] === true) {
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
        clueContainer.innerHTML = "";
        clueArr.forEach((count) => {
          const pEl = document.createElement("p");
          pEl.innerHTML = count;
          // pEl.addEventListener("click", (e) => {
          //   e.target.classList.toggle("done");
          // });
          clueContainer.append(pEl);
        });
      }
    }
  }

  function renderPostSubmitBtn() {
    //포스팅 버튼
    async function submitPost() {
      const post = {
        title: $titleInput.value,
        answer: answerCells,
        status: true,
        size: `${COLS}*${ROWS}`,
        recommendation: 0,
        avgTime: 0,
        finishedCount: 0,
        show: true,
      };

      try {
        const response = await fetch(" /api/puzzles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(post),
        });
        if (response.ok) {
          // DB에 데이터가 성공적으로 삽입되면 성공 메시지를 출력합니다.
          alert("퍼즐이 성공적으로 저장되었습니다.");
          window.location.href = "/";
        } else {
          alert("내용을 입력해 주세요.");
        }
      } catch (err) {
        console.error(err);
        alert("예기치 못한 오류가 발생했습니다.");
      }
    }

    //포스팅 버튼
    const $submitBtn = document.createElement("button");
    $submitBtn.setAttribute("id", "submit");
    $submitBtn.addEventListener("click", submitPost);
    $submitBtn.innerHTML = "업로드";
    $gamePage.appendChild($submitBtn);
  }
  renderPostSubmitBtn();
}
