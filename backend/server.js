const main = require("./db");
const app = require("./index");

const { logger } = require("./utils/logger");

const PORT = process.env.PORT || 5000;
main()
  .then(() => {
    app.listen(PORT, (err) => {
      logger.info(err || `Listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
