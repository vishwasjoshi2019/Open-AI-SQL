// Importing necessary modules from external packages
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

// Load environment variables from a .env file
dotenv.config();

// Get the OpenAI API key from the environment variables
const openaiApiKey = process.env.OPENAI_API_KEY;
// Check if the OpenAI API key is provided
if (!openaiApiKey) {
    // Display an error message if the API key is missing
    console.log("OPENAI_API_KEY is not set");
    // Exit the application with an exit code of 1 (indicating an error)
    process.exit(1);
}

// Create a new Configuration instance with the OpenAI API key
const configuration = new Configuration({ apiKey: openaiApiKey });

// Create a new OpenAIApi instance using the configuration
const openai = new OpenAIApi(configuration);

// Export the openai instance to be used in other parts of the application
export default openai;
