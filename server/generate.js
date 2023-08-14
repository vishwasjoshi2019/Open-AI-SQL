// Import the "openaiClient" module from "./api.js"
import openaiClient from "./api.js";

// Define an asynchronous function named "generate" that takes a "queryDescription" parameter
const generate = async (queryDescription) => {
    // Use the "openaiClient" to create a completion request to the OpenAI API
    const response = await openaiClient.createCompletion({
        // Specify the model to use for generating the completion (text-davinci-003)
        model: "text-davinci-003",
        // Set the prompt for the completion request, incorporating the given "queryDescription"
        prompt: `Convert the following natural language description into a SQL query:\n\n ${queryDescription}.`,
        // Set the maximum number of tokens for the response
        max_tokens: 100,
        // Set the temperature for randomness in the response generation (0 means deterministic)
        temperature: 0,
    });

    // Return the generated SQL query extracted from the OpenAI API response
    return response.data.choices[0].text;
};

// Export the "generate" function to be used in other parts of the application
export default generate;
