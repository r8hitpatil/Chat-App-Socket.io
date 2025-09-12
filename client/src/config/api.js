const API_CONFIG = {
    
    BASE_URL:import.meta.env.VITE_API_BASE_URL || 'https://chat-app-rect.onrender.com/chat',
    CREATE_ROOM:import.meta.env.VITE_API_CREATE_ROOM  || 'https://chat-app-rect.onrender.com/chat/create',
    JOIN_ROOM:import.meta.env.VITE_API_JOIN_ROOM || 'https://chat-app-rect.onrender.com/chat/join'
}

export default API_CONFIG;