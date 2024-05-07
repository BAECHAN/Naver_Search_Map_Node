const express = require("express");
const cors = require("cors");

const axios = require("axios");
require("dotenv").config();

const app = express();

/** 모든 도메인에서의 요청을 허용 */
app.use(
  cors({
    origin: `${process.env.CLIENT_URL}:${process.env.CLIENT_PORT}`,
    credentials: true,
  })
);

const port = process.env.PORT || 3000;

// 네이버 API 클라이언트 정보
const client_id = process.env.NAVER_MAP_CLIENT_ID;
const client_secret = process.env.NAVER_MAP_CLIENT_SECRET;

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.get("/search/local", async (req, res) => {
  try {
    const query = req.query.query;
    const display = req.query.display;
    const sort = req.query.sort;

    const api_url = `https://openapi.naver.com/v1/search/local.json?query=${encodeURI(
      query
    )}&display=${display}&sort=${sort}`;

    const response = await axios.get(api_url, {
      headers: {
        "X-Naver-Client-Id": client_id,
        "X-Naver-Client-Secret": client_secret,
      },
    });

    console.log("response ::: ", response);

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal server error");
  }
});

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
