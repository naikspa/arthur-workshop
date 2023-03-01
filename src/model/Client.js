const { Schema, model } = require("mongoose");
const cli = require("nodemon/lib/cli");

const clientSchema = new Schema(
  {
    nameClient: String,
    products: String,
    telNumber: Number,
    adress: String,
  },
  { timestamps: true, versionKey: false }
);

const Clients = model("Clients", clientSchema);

module.exports = Clients;
