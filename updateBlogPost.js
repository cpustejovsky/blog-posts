require("dotenv").config();
const axios = require("axios");
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const updateBlogPost = async (id, fileName) => {
  try {
    let config = {
      headers: {
        "api-key": process.env.API_KEY
      }
    };
    let data = {
      article: {
        published: true,
        body_markdown: await readFile(`posts/${fileName}.md`, "utf-8")
      }
    };
    let update = await axios.put(`https://dev.to/api/articles/${id}`, data, config)
    console.log(update)
    console.log(`successfully updated ${fileName}`)
  } catch (e) {
    console.log(e);
    console.log("\n ERROR! \n");
  }
}


const getBlogPostData = async () => {
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
    postData.forEach(el=>{
      updateBlogPost(el.id, el.slug)
    })

  } catch (e) {
    console.log(e);
    console.log("\n ERROR! \n");
  }
};

getBlogPostData();


// updateBlogPost("209781", "solidity-and-smart-contracts-23a7")