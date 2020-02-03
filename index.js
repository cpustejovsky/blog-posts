const getBlogPosts = require('./getBlogPosts');
const updateBlogPosts = require('./updateBlogPosts');

const getAndUpdateBlogPosts = async () => {
  await getBlogPosts();
  await updateBlogPosts();
}

getAndUpdateBlogPosts();