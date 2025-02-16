import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
    },
    downloadLink: {
        type: String,
    },
    plan: {
        type: String,
        // lite, pro, elite
    }
});


const File = mongoose.models.files || mongoose.model("files", fileSchema);

export default File;