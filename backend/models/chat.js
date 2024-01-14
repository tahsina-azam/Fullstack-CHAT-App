import mongoose from "mongoose";


const chatSchema = new mongoose.Schema({
    userA: {type:String, required: true},
    userB: {type:String, required: true},
    sender: {type:String, required: true},
    date:{type: String, required: true},
    time:{type:String, required: true},
    message: {type:String, required: true}
},{
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
});


 const Chat =  mongoose.models.chat || mongoose.model("chat", chatSchema);

export default Chat;