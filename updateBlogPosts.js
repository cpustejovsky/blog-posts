require("dotenv").config();
const axios = require("axios");
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

module.exports = async (postData) => {
  try {
    let config = {
      headers: {
        "api-key": process.env.API_KEY
      }
    };
    let data = {
      article: {
        published: true,
        body_markdown: await readFile(`posts/${postData.slug}.md`, "utf-8")
      }
    };
    if(data.article.body_markdown === postData.body){
      console.log(`${postData.slug} Does not need updating`)
    } else {
      await axios.put(`https://dev.to/api/articles/${postData.id}`, data, config)
      console.log(`successfully updated ${postData.slug}`)
    }
  } catch (e) {
    console.log("ERROR!");
    console.log(e);
  }
}