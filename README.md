```
chat-bot/
├── client/                  # React + Vite Frontend
│   ├── public/              # Static assets (favicons, images, etc.)
│   ├── src/                 
│   │   ├── components/      # Reusable UI components
│   │   │   ├── ChatWindow.jsx
│   │   │   ├── Message.jsx
│   │   │   ├── UserInput.jsx
│   │   │   └── ...
│   │   ├── hooks/           # Custom React hooks
│   │   │   ├── useChatLogic.js
│   │   │   ├── useWebSocket.js
│   │   │   └── ...
│   │   ├── context/         # Global state management (Context API)
│   │   │   ├── ChatContext.jsx
│   │   │   └── ...
│   │   ├── pages/           # Page components (React Router)
│   │   │   ├── Home.jsx
│   │   │   ├── ChatRoom.jsx
│   │   │   └── ...
│   │   ├── utils/           # Utility functions
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # Entry point
│   │   ├── index.css        # Global styles (Tailwind included)
│   │   └── ...
│   ├── tailwind.config.js   # Tailwind configuration
│   ├── postcss.config.js    # PostCSS configuration
│   ├── package.json         # Frontend dependencies
│   ├── vite.config.js       # Vite configuration
│   └── ...
├── server/                  # Node.js + Express + WebSocket Backend
│   ├── src/
│   │   ├── controllers/     # Business logic for handling messages, users
│   │   ├── models/         # User, message models (if using a database)
│   │   ├── routes/         # API endpoints
│   │   ├── utils/          # Helper functions
│   │   ├── websocket.js    # WebSocket server handling
│   │   ├── app.js          # Express app setup
│   │   ├── server.js       # Main server entry point
│   │   └── ...
│   ├── package.json        # Backend dependencies
│   ├── .env                # Environment variables
│   ├── README.md
│   └── ...
├── .gitignore               # Ignore files for Git
└── README.md

```