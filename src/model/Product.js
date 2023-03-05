const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    pImage: String,
    pPrice: String,
    pDisc: String,
    pName: String,
    pColor: String,
    pSize: String,
    pID: {
      type: String,
      required: true,
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
