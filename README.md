
# WebKiosk Data Retriever

This project retrieves data from the WebKiosk using login credentials and displays it in a more user-friendly interface. It tracks previously logged-in users via a mock JSON server and fetches requests for new users using web scraping techniques. Puppeteer is used for scraping and retrieving data in a Node.js environment. The frontend and backend are connected using an Express server, and the retrieved data is posted to a mock JSON server.

## Features
- Retrieves data from the WebKiosk using login credentials.
- Displays the data in a simplified, easy-to-use UI.
- Keeps track of previous users using a mock JSON server.
- Fetches requests for new users using Puppeteer for scraping.
- Uses Node.js for the backend (Express server).
- Integrates React for the frontend.
- Styling with Tailwind CSS and DaisyUI for enhanced UI components.

## Technologies Used
- **Node.js**: Backend server for scraping and API integration.
- **Puppeteer**: Web scraping tool for retrieving WebKiosk data.
- **Express.js**: Server framework to handle backend requests.
- **React**: Frontend library for building the user interface.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **DaisyUI**: Component library built on top of Tailwind CSS for easy UI components.
- **Mock JSON Server**: Simulates a backend for tracking users and storing data.

## Project Setup

### Backend (Node.js + Express)
To run the backend server, you need to execute the following commands:

1. Install the dependencies:
   ```bash
   npm install
   ```

2. Start the Express server:
   ```bash
   node server.js
   ```

   This will start the Express server that serves the backend and handles the requests.

### Frontend (React + Tailwind CSS + DaisyUI)
To run the frontend server, you need to execute the following commands:

1. Install the dependencies for the frontend:
   ```bash
   npm install
   ```

2. Start the React app:
   ```bash
   npm start
   ```

   This will start the development server and open the React app in your browser.

### Mock JSON Server
To start the mock JSON server for tracking users and storing data, you need to run the following command in a separate terminal window:

```bash
npm run server
```

This will start the mock JSON server.

## Folder Structure
```
├── backend/
│   └── server.js           # Express server for backend logic
├── frontend/
│   ├── src/                # React source files
│   ├── public/             # Public assets
│   └── tailwind.config.js  # Tailwind CSS configuration
└── mock-server/            # Mock JSON server for data storage
```

## Styling
We use **Tailwind CSS** for utility-first styling and **DaisyUI**, a Tailwind CSS plugin, for easily styled components. You can customize the UI components as needed using these libraries.
