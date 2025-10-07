# Chat App with Socket.io

## 📋 Project Description
This is a real-time temporary chat application built using React (frontend) and Node.js with Socket.io (backend). Users can join chat rooms and communicate with each other in real time without requiring registration or login.

[Live Link](https://chat-app-rct.onrender.com/)

<img width="1895" height="899" alt="image" src="https://github.com/user-attachments/assets/a153594a-e45a-4800-8e2f-61ea7f9fa5aa" />

## 📁 Folder Structure
```
Chat-App-w-Socket.io/
├── client/                    # React frontend
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── README.md
├── server/                    # Node.js backend
│   ├── config/               # Configuration files
│   ├── controller/           # Route controllers
│   ├── model/               # Data models
│   ├── routes/              # API routes
│   ├── server.js            # Main server file
│   ├── package.json
│   ├── package-lock.json
│   └── .gitignore
└── README.md
```

#### Key Socket.io Events Used:
- `connection` - New user connects to the server
- `join-room` - User joins a specific chat room
- `send-message` - User sends a message to the room
- `receive-message` - Broadcast message to all room members
- `user-joined` - Notify when a new user joins the room
- `user-left` - Notify when a user leaves the room
- `disconnect` - User disconnects from the server

### Real-time Features:
- **Instant Messaging**: Messages appear immediately for all connected users
- **User Join/Leave Notifications**: Real-time notifications when users enter or exit rooms
- **Multiple Room Support**: Users can create or join different chat rooms
- **Connection Status**: Shows online/offline status of users
- **Message Persistence**: Messages remain visible during the session
- **Auto-scroll**: Chat automatically scrolls to show latest messages

## 💬 Temporary Chat App Features
- **🚀 No Registration Required**: Jump straight into chatting without account creation
- **🏠 Room-based Chat**: Create custom rooms or join existing ones with room codes
- **⚡ Real-time Communication**: Instant message delivery using WebSocket technology
- **📱 Responsive Design**: Optimized for both desktop and mobile devices
- **🔄 Temporary Sessions**: No permanent message storage - privacy focused
- **👥 User Count**: See how many people are currently in each room
- **🎨 Clean Interface**: Modern, intuitive chat interface built with React
- **⌨️ Keyboard Shortcuts**: Press Enter to send messages quickly
- **🌐 Cross-platform**: Works on all modern web browsers

## 🔧 Environment Variables (.env Requirements)

Create a `.env` file in the **server** directory with the following variables:

### Server Configuration:
```env
# Server Port
PORT=5000

# Client URL (for CORS configuration)
CLIENT_URL=http://localhost:3000

# Socket.io CORS Configuration
SOCKET_CORS_ORIGIN=http://localhost:3000

# Node Environment
NODE_ENV=development
```

### Client Configuration:
Create a `.env` file in the **client** directory:
```env
# Backend API URL
REACT_APP_SERVER_URL=http://localhost:5000

# App Configuration
REACT_APP_APP_NAME=Chat App
```

### Production Environment:
```env
# Production Server Settings
PORT=5000
NODE_ENV=production

# Production URLs (replace with your actual domains)
CLIENT_URL=https://chat-app-rct.onrender.com
SOCKET_CORS_ORIGIN=https://chat-app-rct.onrender.com

# Optional: Database URL (if you add message persistence)
# DATABASE_URL=your-database-connection-string
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+ recommended)
- npm package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/r8hitpatil/Chat-App-w-Socket.io.git
   cd Chat-App-w-Socket.io
   ```

2. **Set up environment variables**
   ```bash
   # Create .env file in server directory
   cd server
   touch .env
   # Add the server environment variables shown above
   
   # Create .env file in client directory
   cd ../client
   touch .env
   # Add the client environment variables shown above
   ```

3. **Install and start the server**
   ```bash
   cd server
   npm install
   npm start
   # Server will run on http://localhost:5000
   ```

4. **Install and start the client** (in a new terminal)
   ```bash
   cd client
   npm install
   npm run dev
   # Client will run on http://localhost:3000
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Create or join a chat room
   - Start chatting in real-time!

## 🛠️ Technologies Used

### Frontend:
- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Socket.io-client** - Real-time communication client library
- **CSS3** - Modern styling with responsive design
- **ESLint** - Code linting for consistent code quality

### Backend:
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **Socket.io** - Real-time bidirectional event-based communication
- **CORS** - Cross-origin resource sharing middleware

### Development Tools:
- **Vite** - Frontend tooling and hot module replacement
- **ESLint** - Code linting and formatting
- **Git** - Version control system
