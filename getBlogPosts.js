require("dotenv").config();
const axios = require("axios");
const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const exists = util.promisify(fs.exists);

const getBlogPosts = async () => {
  try {
    let response = await axios.get(
      "https://dev.to/api/articles?username=cpustejovsky"
    );
    response.data.forEach(async el => {
      let post = await axios.get(`https://dev.to/api/articles/${el.id}`);
      let fileExist = await exists(`posts/${post.data.slug}.md`)
      if (!fileExist) {
        await writeFile(`posts/${post.data.slug}.md`, post.data.body_markdown);
        console.log(`successfully saved ${post.data.title} to posts/${post.data.slug}.md`);
      } else {
        console.log(`posts/${post.data.slug}.md already exists. moving on...`)
      }
    });
  } catch (e) {
    console.log(e);
    console.log("\n ERROR! \n");
  }
};

getBlogPosts();
