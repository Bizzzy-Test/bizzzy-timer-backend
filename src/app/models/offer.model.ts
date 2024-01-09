import mongoose from 'mongoose';

// Define an interface representing a document in MongoDB.
interface IOffer {
    freelencer_id: mongoose.Types.ObjectId;
    client_id: mongoose.Types.ObjectId;
    job_id: mongoose.Types.ObjectId;
    status: number;
    budget: string;
    created_at: Date;
    updated_at: Date;
}

// Create a Schema corresponding to the document interface.
const OfferSchema = new mongoose.Schema<IOffer>({
    freelencer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'freelencer_profiles',
        required: true,
    },
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client_profiles',
        required: true,
    },
    job_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'jobs',
        required: true,
    },
    status: {
        type: Number, // 0 - 
        default: 0
    },
    budget: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

// Create a Model.
const OfferModel = mongoose.model<IOffer>('offers', OfferSchema);

export default OfferModel;
