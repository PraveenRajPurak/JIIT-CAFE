import mongoose from "mongoose";

const user = new mongoose.Schema({
    name: { type: String, required: true },
    enrollmentNo: { type: String, required: true },
});

const  orderItemSchema = new mongoose.Schema({
    coinCount: { type: Number, required: true },
    count: { type: Number, required: true },
    dishName: { type: String, required: true },
    id: { type: String, required: true },
    imageUrl: { type: Number, required: true },
    key: { type: String, required: true },
});


const pendingOrderSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    orderDate: { type: Date, default: Date.now },
    orderTime: { type: String, default: new Date().toLocaleTimeString() },
    orderedBy: { type: [user] },
    items: { type: [orderItemSchema] },
});

const PendingOrders = mongoose.model('PendingOrders', pendingOrderSchema);

export default PendingOrders;