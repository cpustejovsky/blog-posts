require("dotenv").config();
const axios = require("axios");
const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);

const getBlogPosts = async () => {
  try {
    let response = await axios.get(
      "https://dev.to/api/articles?username=cpustejovsky"
    );
    response.data.forEach(async el => {
      let post = await axios.get(`https://dev.to/api/articles/${el.id}`);
      await writeFile(`posts/${post.data.slug}.md`, post.data.body_markdown);
      console.log(`successfully saved ${post.data.title} posts/${post.data.slug}.md`);
    });
  } catch (e) {
    console.log(e);
    console.log("\n ERROR! \n");
  }
};

getBlogPosts();
