require("dotenv").config();
const axios = require("axios");
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const updateBlogPost = async (postData) => {
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
      let update = await axios.put(`https://dev.to/api/articles/${postData.id}`, data, config)
      console.log(`successfully updated ${postData.slug}`)
    }
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
        body: post.data.body_markdown
      };
    });
    const postData = await Promise.all(postPromises)
    postData.forEach(data=>{
      updateBlogPost(data)
    })

  } catch (e) {
    console.log(e);
    console.log("\n ERROR! \n");
  }
};

getBlogPostData();


// updateBlogPost("209781", "solidity-and-smart-contracts-23a7")