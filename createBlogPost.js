require("dotenv").config()
const axios = require("axios")
const fs = require("fs")
const util = require("util")
const readFile = util.promisify(fs.readFile);

const createBlogPost = async (fileName) => {
  try {
    let config = {
      headers: {
        "api-key": process.env.API_KEY
      }
    };
    let data = {
      article: {
        title: "Post to Update",
        published: true,
        body_markdown: await readFile(`posts/${fileName}.md`, "utf-8")
      }
    };
    const response = await axios.post("https://dev.to/api/articles", data, config)
    console.log(response);
    console.log("\n SUCCESS! \n");
  } catch (e) {
    console.log(e);
    console.log("\n ERROR! \n");
  }
}

module.exports = createBlogPost