const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const cli = require("nodemon/lib/cli");

const clientSchema = new Schema(
  {
    nameClient: String,
    products: String,
    telNumber: Number,
    adress: String,
    done: { type: Boolean, default: false }
  },
  { timestamps: true, versionKey: false }
);

const clientModel = model("clients", clientSchema);

module.exports = clientModel;
