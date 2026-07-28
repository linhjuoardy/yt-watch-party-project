

# YouTube Watch Party

A real-time watch party application that enables multiple users to watch YouTube videos together in synchronized playback while chatting live. The project demonstrates full-stack development with WebSockets, real-time state synchronization, and room-based collaboration.

---

##  Live Demo

**Frontend:** `https://yt-watch-party-project.vercel.app`

**Backend API:** `https://yt-watch-party-project-1.onrender.com/`

---

## Features

- Create and join watch rooms
    
- Real-time synchronized YouTube playback
    
- Live chat using WebSockets
    
- Participant list with active users
    
- Host controls for video playback
    
- Room-based communication
    
- Random username assignment for new users
    

---

##  Tech Stack

### Frontend

- React
    
- TypeScript
    
- Vite
    
- Tailwind CSS
    
- Socket.IO Client
    
- React Router
    
- React YouTube
    

### Backend

- Node.js
    
- Express
    
- TypeScript
    
- Socket.IO
    
- MongoDB
    
- Mongoose
    

### Deployment

- Frontend: Vercel
    
- Backend: Render
    
- Database: MongoDB Atlas
    

---

#  Local Setup

## 1. Clone the repository

```bash
git clone https://github.com/linhjuoardy/yt-watch-party-project.git
cd yt-watch-party-project
```

---

## 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=your_mongodb_connection_string
```

Run the backend:

```bash
npm run dev
```

---

## 3. Frontend Setup

Open another terminal.

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Run:

```bash
npm run dev
```

Open:

```
http://localhost:5173
```

---

#  Deployment

### Backend

Hosted on Render.

Required environment variables:

```env
PORT=5000
CLIENT_URL=<Frontend URL>
MONGODB_URI=<MongoDB Atlas Connection String>
```

---

### Frontend

Hosted on Vercel.

Required environment variable:

```env
VITE_API_URL=<Backend URL>
```

---

#  Architecture Overview

The application follows a client-server architecture using Socket.IO for real-time communication.

1. Users connect to the backend through a Socket.IO connection.
    
2. A room is created or joined using a unique room code.
    
3. Every connected user joins the corresponding Socket.IO room.
    
4. Video playback events (play, pause, seek, and synchronization) are emitted by the host.
    
5. The backend broadcasts these events to all participants in the same room.
    
6. Chat messages are also sent through WebSockets and instantly delivered to every participant.
    
7. Room state and participant information are maintained on the server to keep all clients synchronized.
    

```
React Client
      │
      │ Socket.IO
      ▼
Express + Socket.IO Server
      │
      ├── Room Management
      ├── Chat Events
      ├── Video Sync Events
      └── Participant Tracking
      │
      ▼
MongoDB Atlas
```

---

# 🔌 WebSocket Flow

```
User Connects
      │
      ▼
Socket.IO Connection
      │
      ▼
Join Room
      │
      ▼
Server Stores Participant
      │
      ├──────────────┐
      │              │
      ▼              ▼
Video Events     Chat Events
      │              │
      └──────Broadcast──────► All Participants
```

---

# 📦 Available Scripts

## Frontend

```bash
npm run dev
npm run build
npm run preview
```

## Backend

```bash
npm run dev
npm run build
npm start
```

---

# 📖 Code Walkthrough

The project demonstrates:

- React component architecture
    
- TypeScript for type safety
    
- Express REST API setup
    
- Socket.IO event-driven communication
    
- Room management logic
    
- Real-time chat implementation
    
- YouTube playback synchronization
    
- MongoDB integration
    
- Environment-based deployment configuration
    
- CORS configuration for production deployment
    


---

# 👨‍💻 Author

Om Kumar Giri
