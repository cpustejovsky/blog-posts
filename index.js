// const axios = require("axios");
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

console.clear();

const getBlogPosts = async () => {
  let response = await axios.get(
    "https://dev.to/api/articles?username=cpustejovsky"
  );
  console.log(response);
};

// getBlogPosts();

let config = {
  headers: {
    "api-key": process.env.API_KEY
  }
};

let data = {
  article: {
    title: "Hello, World!",
    published: true,
    body_markdown: "Hello DEV, this is my first post",
    tags: ["discuss", "help"],
    series: "Hello series",
    // canonical_url: "https://example.com/blog/hello"
  }
};



axios
  .post("https://dev.to/api/articles", data, config)
  .then(data => {
    console.log(data);
    console.log("\n SUCCESS! \n");
  })
  .catch(e => {
    console.log(e);
    console.log("\n ERROR! \n");
  });
