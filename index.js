const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { parse } = require("json2csv");

const app = express();
const PORT = 3000;

// Route to generate CSV
app.get("/generate-csv", async (req, res) => {
  const filePath = path.join(__dirname, "output.csv");

  try {
    // Check if the output file already exists
    if (fs.existsSync(filePath)) {
      return res.status(400).json({
        error:
          "Output file already exists. Please check or delete it before generating again.",
      });
    }

    // Fetch data from the APIs asynchronously
    const [usersResponse, postsResponse, commentsResponse] = await Promise.all([
      axios.get("https://jsonplaceholder.typicode.com/users"),
      axios.get("https://jsonplaceholder.typicode.com/posts"),
      axios.get("https://jsonplaceholder.typicode.com/comments"),
    ]);

    const users = usersResponse.data;
    const posts = postsResponse.data;
    const comments = commentsResponse.data;

    // Map data by 'id' and extract the required fields
    const maxRows = Math.max(users.length, posts.length, comments.length);
    const rows = Array.from({ length: maxRows }, (_, i) => ({
      name: users[i]?.name || "",
      title: posts[i]?.title || "",
      body: comments[i]?.body || "",
    }));

    // Define CSV headers
    const csvHeaders = ["name", "title", "body"];
    const csvData = parse(rows, { fields: csvHeaders });

    // Write the CSV file to disk
    fs.writeFileSync(filePath, csvData);

    // Respond with the path to the generated CSV
    res.json({ message: "CSV generated successfully", filePath });
  } catch (error) {
    console.error("Error generating CSV:", error);

    // Handle specific errors
    if (error.response) {
      // API response error
      res.status(500).json({
        error: `Failed to fetch data from ${error.config.url}. Status: ${error.response.status}`,
      });
    } else if (error.code === "EACCES") {
      // File permission error
      res.status(500).json({
        error: "Permission denied while writing the CSV file.",
      });
    } else {
      // Generic error
      res.status(500).json({
        error: "An unexpected error occurred. Please try again later.",
      });
    }
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
