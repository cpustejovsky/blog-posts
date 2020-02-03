require("dotenv").config();
const axios = require("axios");
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const updateBlogPost = async () => {
  try {
    let response = await axios.get(
      "https://dev.to/api/articles?username=cpustejovsky"
    );
    let postPromises = response.data.map(async el => {
      let post = await axios.get(`https://dev.to/api/articles/${el.id}`);
      return {
        id: el.id,
        slug: post.data.slug,
        // body: post.data.body_markdown
      };
    });
    const postData = await Promise.all(postPromises)
    console.log(postData)

  } catch (e) {
    console.log(e);
    console.log("\n ERROR! \n");
  }
};

updateBlogPost();
