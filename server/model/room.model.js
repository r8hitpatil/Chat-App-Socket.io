import mongoose from "mongoose";

const RoomSchema = await mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    roomId : {
        type : String,
        required : true
    }
})

const Rooms = mongoose.model('UserRoom',RoomSchema);

export default Rooms;