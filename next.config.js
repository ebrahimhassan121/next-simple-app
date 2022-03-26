module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    BASE_URL: process.env.BACKEND_URL,
  },
};
