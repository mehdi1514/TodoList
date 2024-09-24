


# Todo List Application

A simple Todo List application built with React.js and a Node.js backend. This application allows users to add, edit, and delete todos, with persistent storage provided by a MongoDB database. Users can authenticate and manage their todos securely.

## Todo List Screenshot

![Todo List Screenshot](https://github.com/user-attachments/assets/94b66602-6de2-4958-b17b-c1ec9db3f47a)

## Features

- **User Authentication**: Users can register and log in to access their personal todo lists.
- **Add Todos**: Enter a new todo in the input field and click "Add" or press Enter.
- **Edit Todos**: Click on a todo to edit it directly.
- **Delete Todos**: Remove a todo by clicking the delete button next to it.
- **Persistent Storage**: Todos are stored in a MongoDB database, ensuring they persist across sessions.
- **Secure API**: The backend API uses JSON Web Tokens (JWT) for authorization, ensuring secure access to user data.

## Built With

- **Frontend**:
  - React.js: A JavaScript library for building user interfaces.
  - Vite: A modern build tool that provides a faster development experience and optimized production builds.

- **Backend**:
  - Node.js: JavaScript runtime for building the backend server.
  - Express.js: A web application framework for Node.js.
  - MongoDB: NoSQL database used for storing todos and user data.
  - Mongoose: ODM (Object Data Modeling) library for MongoDB and Node.js.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB instance (local or cloud) to store your todos and user data.

### Installing npm packages and running the app

1. **Clone the repository**:

   ```bash
   git clone your_repository_url
   cd your_project_directory

After cloning the repo install the required packages by running:
`npm i` or `npm install`

To run the app in dev mode:
`npm run dev`
