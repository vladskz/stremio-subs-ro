// Vercel serverless entrypoint.
// The Express app is built in server.js and exported for use here.
const app = require("../server.js");

module.exports = app;
