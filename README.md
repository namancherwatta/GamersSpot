# Gamers Spot

## Overview

Gamers Spot is a website to play mini IO games and also provides a platform for game developers to host their games. Built using the MERN (MongoDB, Express.js, React, Node.js) stack, it ensures a seamless experience for both players and game creators, featuring robust security measures and an intuitive user interface.

## Features

- **User Authentication & Security**: Secure login system with role-based access control for players and game developers.
- **Responsive UI**: Designed using Tailwind CSS to ensure accessibility across all devices and screen sizes.
- **Game & User Data Management**: Utilizes MongoDB for efficient storage and scalability of game data and user profiles.
- **RESTful API Integration**: Backend services powered by RESTful APIs for smooth communication between the front-end and back-end systems.
- **Engaging Gaming Experience**: Supports various mini browser-based IO games, providing an interactive and entertaining environment for users.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT), bcrypt

## Installation & Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/namancherwatta/GamersSpot
   cd gamersspot
   ```

2. **Install dependencies:**

   ```sh
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Set up environment variables:** Create a `.env` file in the backend directory and add the necessary environment variables:

   ```sh
   port="4001"
   mongoURI=""
   jwtSecretKey=""
   FrontendUrl="http://localhost:5173"

   CLOUD_NAME=""
   CLOUD_API_KEY=""
   CLOUD_SECRET_KEY=""
   ```

   - **MongoDB URI:**
     - If using MongoDB Atlas (Cloud): Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas), create a new cluster, and get your connection string.
     - If using a local MongoDB instance: Use `mongodb://localhost:27017/gamers-spot`.

   - **JWT Secret Key:**
     - Generate a secure key using:
       ```sh
       node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
       ```

   - **Cloudinary API Keys:**
     - Sign up at [Cloudinary](https://cloudinary.com/), go to the dashboard, and find `CLOUD_NAME`, `API Key`, and `API Secret`.

      CLOUD_NAME=""
      CLOUD_API_KEY=""
      CLOUD_SECRET_KEY=""

4. **Run the development server:**

   ```sh
   # Start backend
   cd backend
   npm run dev

   # Start frontend
   cd ../frontend
   npm start
   ```

5. **Access the platform:** Open `http://localhost:5173` in your browser.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests to enhance Gamers Spot.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries or suggestions, please reach out via namanherwatta@gmail.com.
