const mongoose = require("mongoose");

const resignationSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lwd: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    reason: {
      type: String
    },
    exitDate: { type: Date },
    responses: [
      {
        questionText: { type: String},
        response: { type: String }
      }
    ]
  },
  { timestamps: true }
);

const Resignation = mongoose.model(
  "Resignation",
  resignationSchema,
  "resignation"
);
module.exports = { Resignation };
