const mongoose = require("mongoose");

const bugSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true
    },
    issueTitle: {
      type: String,
      required: true
    },
    issueDescription: {
      type: String,
      required: true
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low"
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Closed"],
      default: "Open"
    },
    reportedBy: {
      id: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bug", bugSchema);