require("dotenv").config();
const axios = require("axios");
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const getPostData = async post => {
  let response = await axios.get(`https://dev.to/api/articles/${post.id}`);
  return {
    id: post.id,
    slug: response.data.slug
  };
};

const getBlogPosts = async () => {
  try {
    let response = await axios.get(
      "https://dev.to/api/articles?username=cpustejovsky"
    );
    const blogPostData = Promise.all(
      response.data.map(item => getPostData(item))
    );

    console.log(blogPostData);
  } catch (e) {
    console.log(e);
    console.log("\n ERROR! \n");
  }
};

getBlogPosts();

// const updateBlogPost = async fileName => {
//   try {
//     let config = {
//       headers: {
//         "api-key": process.env.API_KEY
//       }
//     };
//     let data = {
//       article: {
//         title: "Test Post",
//         published: true,
//         body_markdown: await readFile(`posts/${fileName}.md`, "utf-8"),
//         tags: ["discuss", "help"],
//         series: "Test"
//       }
//     };
//     const response = await axios.put(
//       `https://dev.to/api/articles/${id}`,
//       data,
//       config
//     );
//     console.log(response);
//     console.log("\n SUCCESS! \n");
//   } catch (e) {
//     console.log(e);
//     console.log("\n ERROR! \n");
//   }
// };
