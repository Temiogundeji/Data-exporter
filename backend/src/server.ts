const main = require("./db");
import { app } from "./index";
const mongoose = require("mongoose");
import { env } from "./config";
import { logger } from "./utils/logger";
import { AddressInfo } from 'net';


const PORT = env.PORT || 5000;
mongoose
  .connect(env.DATABASE_URI)
  .then(() => {
    const server: any = app.listen(PORT, () => {
      const { port, address } = server.address() as AddressInfo;
      logger.info(`Server is running on http://${address}:${port}`);
    });
  })
  .catch((err: Error) => {
    console.log(err);
    process.exit(1);
  });
