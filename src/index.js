const dotenv = require("dotenv");
dotenv.config();

const app = require("./app.js");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is runnig at http://localhost:${PORT}`);
});
