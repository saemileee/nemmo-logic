const express = require("express");
const router = express.Router();
const path = require("path");

router.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff"); // 기존 설정을 먼저 제거
  res.setHeader("X-Content-Type-Options", "none"); // Strict MIME 타입 검사 해제
  next(); // 다음 미들웨어로 이동
});

router.use("/public", express.static(path.join(__dirname, "../public")));
router.use(
  "/components",
  express.static(path.join(__dirname, "../components"))
);

router.use("/posts/public", express.static(path.join(__dirname, "../public")));
router.use(
  "/posts/components",
  express.static(path.join(__dirname, "../components"))
);

router.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

module.exports = router;
