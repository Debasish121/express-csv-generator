# Express CSV Generator

This project is an Express.js application that integrates data from three API endpoints, processes the data, and generates a CSV file. The generated CSV file contains specific key values from the APIs and is saved to a local directory.

## Features

- Integrates three APIs:

  - [Users API](https://jsonplaceholder.typicode.com/users)
  - [Posts API](https://jsonplaceholder.typicode.com/posts)
  - [Comments API](https://jsonplaceholder.typicode.com/comments)

- Extracts specific keys from the responses:

  - `name` (from Users API)
  - `title` (from Posts API)
  - `body` (from Comments API)

- Combines extracted data and writes it into a CSV file.
- Responds with the file path of the generated CSV file.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- A package manager like npm or yarn.

### Steps to Set Up the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/Debasish121/express-csv-generator.git
   cd express-csv-generator
   ```

2. Install Dependencies

   ```bash
   npm install
   ```

3. Start the Express server:

   ```bash
   node run dev
   ```

4. The server will start on http://localhost:3000.

### Test

- To test the /generate-csv route:

  1. Open a browser or use a tool like Postman.

  2. Send a GET request to:

     ```bash
          http://localhost:3000/generate-csv
     ```

  3. If successful, you'll receive a response like this:

     ```json
     {
       "message": "CSV generated successfully",
       "filePath": "/path/to/your/project/output.csv"
     }
     ```

  4. The generated CSV file `(output.csv)` will be available in the project directory.

## Error Handling in the /generate-csv Route

The `/generate-csv` route of the application includes comprehensive error handling to ensure a smooth user experience and proper debugging in case of failures. Below are the key scenarios handled:

### 1. **File Already Exists**

- **Description**: If the `output.csv` file already exists in the directory, the server prevents overwriting it.
- **Response**:
  ```json
  {
    "error": "Output file already exists. Please check or delete it before generating again."
  }
  ```
- **HTTP Status**: 400 (Bad Request)

---

### 2. **API Response Errors**

- **Description**: If any of the API endpoints used for fetching data (`/users`, `/posts`, `/comments`) fail to respond or return an error, it is handled gracefully.
- **Response**:
  ```json
  {
    "error": "Failed to fetch data from {API_URL}. Status: {STATUS_CODE}"
  }
  ```
- **HTTP Status**: 500 (Internal Server Error)

---

### 3. **File System Permission Errors**

- **Description**: If the server lacks the necessary permissions to write the `output.csv` file to disk, the error is caught and logged.
- **Response**:
  ```json
  {
    "error": "Permission denied while writing the CSV file."
  }
  ```
- **HTTP Status**: 500 (Internal Server Error)

---

### 4. **Generic Errors**

- **Description**: Any unexpected errors not covered by specific scenarios are caught by a generic error handler.
- **Response**:
  ```json
  {
    "error": "An unexpected error occurred. Please try again later."
  }
  ```
- **HTTP Status**: 500 (Internal Server Error)

---

### Logging

All errors are logged to the server's console for debugging purposes, along with relevant information such as the stack trace or the specific API URL causing the failure.

---

### Recommendations for Errors Handling

- Ensure that the `output.csv` file is deleted or moved before attempting to regenerate it.
- Verify that the API endpoints are functional and accessible.
- Confirm that the server has appropriate file system permissions to write files in the working directory.

By implementing these error-handling mechanisms, the application ensures reliability and provides clear feedback to the user in case of failures.
