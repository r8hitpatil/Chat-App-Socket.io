import Rooms from "../model/room.model.js";

export const createRoom = async (req, res) => {
  try {
    const { name, roomId } = req.body;
    if (!name || !roomId) {
      return res.status(400).json({ message: "Please enter complete details" });
    }
    const newRoom = new Rooms({
      name,
      roomId,
    });
    await newRoom.save();
    return res.status(201).json({ message: "New user created" });
  } catch (error) {
    return res.status(500).json({ message: `Server error : ${error.message}` });
  }
};

export const joinRoomId = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { name } = req.body;
    if (!name || !roomId) {
      return res.status(400).json({ message: "Room not found" });
    }
    const enterRoom = await Rooms.findOne({ roomId });
    if (!enterRoom) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    return res.status(200).json({ message : `Entered room ${roomId} successfully`, data : enterRoom});
  } catch (error) {
    return res.status(500).json({ message : `Server error : ${error.message}` });
  }
};
