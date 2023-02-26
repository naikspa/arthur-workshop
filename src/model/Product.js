const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    pImage: String,
    pPrice: String,
    pName: String,
    pColor: String,
    pID: {
      type: String,
      required: true,
      unique: true,
    },
    inCart: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
