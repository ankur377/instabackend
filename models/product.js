const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    desc: {
        type: String,
        max: 500
    },
    img: {
        type: Array,
        default: [],
        require: true
    },
    likes: {
        type: Array,
        default: []
    },
},
    { timestamps: true }
);


const Product = mongoose.model('products', productSchema);


module.exports = {
    Product
}