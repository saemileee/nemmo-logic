export const render = () => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>넴모로직</title>
    <link
      rel="stylesheet"
      href="https://saemileee.github.io/nemmo-logic/public/css/reset.css"
    />
    <link
      rel="stylesheet"
      href="https://saemileee.github.io/nemmo-logic/public/css/main.css"
    />
    <link
      rel="stylesheet"
      href="https://saemileee.github.io/nemmo-logic/public/css/gameboard.css"
    />
  </head>
  <body>
    <div id="app-main">
      <header>
        <h1><a href="https://saemileee.github.io/nemmo-logic/">넴모로직</a></h1>
        <p>
          <img
            src="https://saemileee.github.io/nemmo-logic/public/img/nemmo-doggy.png"
          />
          담신믄 넴모넴모 랜드믜 넴모넴모 멈무미뫄 눈미 마주치고 말맜습니다.<br />
          담신믄 미제 넴모넴모 멈무미믜 저주로<br />넴모넴모 퍼즐믈 풀머먀만
          돔그란 글자를 칠수 밌습니다.<br />멈멈!
        </p>
      </header>
      <main>
        <div id="search">
          <input type="text" placeholder="문제를 검색해 보세요." /><button>
            검색
          </button>
        </div>
        <ul>
          <li>전체</li>
          <li>5*5</li>
          <li>10*10</li>
          <li>15*15</li>
          <li>20*20</li>
          <li>25*25</li>
        </ul>
        <!-- 게임 페이지 -->
        <div id="game-page-container"
          <div id="game-grid-container">
            <div id="empty-cell" class="grid-box"></div>
            <div id="col-clue" class="grid-box"></div>
            <div id="row-clue" class="grid-box"></div>
            <div id="board" class="grid-box"></div>
          </div>
        </div>
      </main>
      <!-- 푸터 -->
      <footer>
        <p>© 2023</p>
      </footer>
    </div>
    <script
      type="module"
      src="https://saemileee.github.io/nemmo-logic/public/js/main.js"
    ></script>
  </body>
</html>

`;
