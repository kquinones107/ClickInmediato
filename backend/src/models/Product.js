const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: String,
    price: {
        type: Number,
        required: true,
    },
    images: [String],
    category: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        default: 1,
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }    
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);