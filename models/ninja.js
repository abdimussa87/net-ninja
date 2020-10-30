import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// *to be used inside NinjaSchema
const GeoSchema = new Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
})

const NinjaSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    rank: {
        type: String
    },
    available: {
        type: Boolean,
        default: false
    },
    geometry: GeoSchema
});

const NinjaModel = mongoose.model('ninja', NinjaSchema);

export default NinjaModel;