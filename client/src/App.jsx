// Import necessary styles and assets.
import styles from './index.module.css';
import sqlLogo from './assets/sql-logo.png';
import { useState } from 'react';

// Define the main App component.
function App() {
  // State variables for query description and generated SQL query.
  const [queryDescription, setQueryDescription] = useState("");
  const [sqlQuery, setSqlQuery] = useState("");

  // Function to handle form submission.
  const onSubmit = async (e) => {
    e.preventDefault();
    // Call the generateQuery function to fetch and set the generated SQL query.
    const generatedQuery = await generateQuery();
    setSqlQuery(generatedQuery);
    console.log("Returned from server:", sqlQuery);
  };

  // Function to fetch and generate SQL query.
  const generateQuery = async () => {
    // Send a POST request to the server's "/generate" endpoint.
    const response = await fetch("http://localhost:3005/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ queryDescription: queryDescription }),
    });

    // Parse the response data as JSON and return the trimmed SQL query.
    const data = await response.json();
    return data.response.trim();
  };

  // Render the UI components.
  return (
    <main className={styles.main}>
      {/* Display the SQL logo */}
      <img src={sqlLogo} alt="" className={styles.icon} />
      <h3>Generate SQL with AI</h3>
      <form onSubmit={onSubmit}>
        {/* Input field to describe the query */}
        <input
          type="text"
          name="query description"
          placeholder="Describe your query"
          onChange={(e) => setQueryDescription(e.target.value)}
        />
        {/* Submit button */}
        <input type="submit" value="Generate Query" />
        {/* Display the generated SQL query */}
        <pre>{sqlQuery}</pre>
      </form>
    </main>
  );
}

// Export the App component.
export default App;
