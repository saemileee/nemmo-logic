export default function renderHeader() {
  const $header = document.getElementsByTagName("header")[0];
  const $h1 = document.createElement("h1");
  $h1.innerHTML = `<p>Welcome to</p><a href="https://saemileee.github.io/nemmo-logic/">넴모로직</a>`;
  $header.appendChild($h1);

  const $mainBanner = document.createElement("div");
  $mainBanner.setAttribute("id", "main-banner");
  $mainBanner.innerHTML = `<div>
<p>담신믄 넴모넴모 랜드믜</br> 넴모넴모 멈무미뫄 눈미 마주치고 말맜습니다.</p>
<p>
담신믄 미제 넴모넴모 멈무미믜 저주로 </br> 넴모넴모 퍼즐믈 풀머먀만
돔그란 글자를 칠수 밌습니다.</p>
<div>멈멈!</div></div>
<img src="public/img/neommo-dog.png">
`;
  $header.appendChild($mainBanner);
}
