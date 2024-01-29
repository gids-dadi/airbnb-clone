import mongoose from "mongoose";

const placeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    photos: {
      type: [String],
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    perks: {
      type: [String],
      required: true,
    },

    extraInfo: {
      type: String,
    },

    checkIn: {
      type: String,
    },
    checkOut: {
      type: String,
    },
    maxGuest: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Place = mongoose.model("Place", placeSchema);

export default Place;
