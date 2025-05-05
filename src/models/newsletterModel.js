import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema({
    email: {
        type: String,
    },
});


const Newsletter = mongoose.models.newsletters || mongoose.model("newsletters", newsletterSchema);

export default Newsletter;