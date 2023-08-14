// Import required modules: Express for creating the web application and handling routes, and CORS for enabling cross-origin requests.
const express = require("express");
const cors = require("cors");
const generate = require("./generate.js"); // Import the generate module for query generation.

// Create an instance of the Express application.
const app = express();

// Middleware: Parse incoming JSON data and enable CORS for cross-origin requests.
app.use(express.json());
app.use(cors());

// Define the port number to listen on. Use 3005 as default if PORT environment variable is not set.
const port = process.env.PORT || 3005;

// Define a route for the root URL ("/") that responds with a simple "Hello World" message.
app.get("/", (req, res) => {
    res.send("Hello World from our API");
});

// Define a route for handling POST requests to "/generate".
app.post("/generate", async (req, res) => {
    // Extract the query description from the request body.
    const queryDescription = req.body.queryDescription;

    try {
        // Generate an SQL query using the "generate" function from the imported module.
        const sqlQuery = await generate(queryDescription);
        
        // Respond with the generated SQL query as JSON.
        res.json({ response: sqlQuery });
    } catch (error) {
        // If an error occurs during query generation, handle the error.
        console.log("An error occurred:");
        console.error(error);
        
        // Respond with an internal server error status and message.
        res.status(500).send("Internal Server Error");
    }
});

// Start the server and listen on the specified port.
app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
});
