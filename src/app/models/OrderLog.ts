// src/models/OrderLog.ts
import { Schema, model } from 'mongoose';

const OrderLogSchema = new Schema({
  orderId: String,
  table: String,
  status: String,
  createdAt: Date,
  processedAt: {
    type: Date,
    default: Date.now,
  },
});

export const OrderLog = model('OrderLog', OrderLogSchema);
