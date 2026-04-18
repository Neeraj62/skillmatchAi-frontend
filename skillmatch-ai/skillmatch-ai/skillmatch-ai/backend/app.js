import app from "./src/index.js";
import connectDb from "./src/config/connectDb.js";
import envConfig from "./src/config/envConfig.js";


const startServer = async () => {
  try {
    await connectDb();
    app.listen(envConfig.PORT, () => {
      console.log(`✅ server is listening on port ${envConfig.PORT}`)
    })
  } catch (error) {
    console.log(`❌ Failed to connect db on port ${envConfig.PORT}`);
  }
}
startServer();