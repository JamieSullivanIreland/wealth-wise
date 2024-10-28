import { Schema, model, models } from 'mongoose';

const AssetSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    provider_name: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Asset = models.Asset || model('Asset', AssetSchema);

export default Asset;
