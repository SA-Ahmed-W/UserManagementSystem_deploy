import {createServer} from "node:http";
import app from "./app.js";
import env from "./config/env.js";
import {connectDB} from "./config/db.js";

/**
 * Starts the server by connecting to the database and listening on a port.
 * If any errors occur during the process, they are logged to the console and the process is exited with a status code of 1.
 */
async function startServer() {
    try {
        // Connect to the database
        await connectDB();

        // Create the server
        const server = createServer(app);

        // Start the server
        server.listen(env.PORT, () => {
            console.log(`Server started on port ${env.PORT}`);
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

startServer();