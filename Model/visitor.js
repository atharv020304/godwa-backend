import mongoose from "mongoose";
import Event from "./event.js";


const visitorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, "Name must be at least 3 characters"]
    },
    organizationName: {
        type: String,
    },
    designation: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    city: {
        type: String,
    },
    source: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                const allowedSources = ['LinkedIn', 'WhatsApp', 'Facebook', 'Other'];
                return allowedSources.includes(value) || value !== '';
            },
            message: "Invalid source. Provide a valid option or specify your custom source."
        }
    },
    otherSourceDetails: {
        type: String,
        required: function () {
            return this.source === 'Other';
        }
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event", 
        required: true,
    },
});

const Visitor = mongoose.model("Visitor", visitorSchema);

export default Visitor;
