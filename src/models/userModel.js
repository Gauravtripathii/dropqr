import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
});


const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;