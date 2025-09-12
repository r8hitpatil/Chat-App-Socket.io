const API_CONFIG = {
    
    BASE_URL:import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/chat',
    CREATE_ROOM:import.meta.env.VITE_API_CREATE_ROOM || 'http://localhost:3000/chat/create',
    JOIN_ROOM:import.meta.VITE_API_JOIN_ROOM || 'http://localhost:3000/chat/join/:roomId'

}

export default API_CONFIG;