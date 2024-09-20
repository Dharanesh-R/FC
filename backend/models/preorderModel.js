// // models/preorderModel.js
// const mongoose = require('mongoose');

// const preorderSchema = new mongoose.Schema({
//     username: { type: String, required: true },
//     role: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//     deliveryType: { type: String, required: true },
//     orderCode: { type: String, required: true },
//     cart: [
//         {
//             title: { type: String, required: true },
//             quantity: { type: Number, required: true },
//             price: { type: Number, required: true }
//         }
//     ],
//     totalWithGST: { type: Number, required: true }
// }, { timestamps: true });

// const Preorder = mongoose.model('Preorder', preorderSchema);

// module.exports = Preorder;


// models/preorderModel.js
const mongoose = require('mongoose');

const preorderSchema = new mongoose.Schema({
    username: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    deliveryType: { type: String, required: true },
    orderCode: { type: String, required: true },
    cart: [
        {
            title: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    totalWithGST: { type: Number, required: true },
    paymentStatus: { type: String, default: 'Successful' }, // New field
    orderStatus: { type: String, default: 'Not Completed' } // New field
}, { timestamps: true });

const Preorder = mongoose.model('Preorder', preorderSchema);

module.exports = Preorder;
