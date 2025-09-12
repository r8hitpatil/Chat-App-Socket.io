import express from 'express';
import { createRoom, joinRoomId } from '../controller/room.controller.js';

const route = express.Router();

// route.get('/:roomId',getRoomId);
route.post('/create',createRoom);
route.post('/join/:roomId',joinRoomId);
route.get('/',(req,res)=>{
    res.send('Hello');
});

const roomRoutes = route;

export default roomRoutes;