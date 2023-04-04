import { fetchPuzzleData } from "./FetchPuzzleData.js";

export default function renderMain() {
  const $main = document.getElementsByTagName("main")[0];
  fetchPuzzleData($main);
}
