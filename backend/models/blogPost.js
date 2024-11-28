const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true } // Esto agrega `createdAt` y `updatedAt`
);

module.exports = mongoose.model("BlogPost", blogPostSchema);
