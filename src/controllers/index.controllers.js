const controller = {};
controller.index = async (req, res) => {
  const products = await Product.find().lean();
  res.render("index", { x: products });
};
controller.compra = (req, res) => {
  res.render("compra");
};

const Product = require("../model/Product");

const clientModel = require("../model/client");

controller.createUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const newClient = new clientModel(req.body);
    await newClient.save();
    res.redirect("/compra");
  } catch (error) {
    return res.render("error", { errorMessage: error.message });
  }
};

controller.newProduct = (req, res) => {
  res.render("newproduct");
};

controller.addProduct = async (req, res) => {
  try {
    const prod = Product(req.body);
    await prod.save();
    res.redirect("/admin/panel");
  } catch (error) {
    console.log(error);
  }
};

controller.adminPanel = async (req, res) => {
  const products = await Product.find().lean();
  res.render("adminpanel", { x: products });
};

controller.renderEdit = async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);
    res.render("edit", { x: prod });
  } catch (error) {
    console.log(error.message);
  }
};

controller.editProduct = async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndUpdate(id, req.body);
  res.redirect("/admin/panel");
};

controller.deleteProduct = async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect("/admin/panel");
};

// mongodb+srv:Enzo:UDRDRiI6l0NMmj0G@arthur-workshop.bwnuexp.mongodb.net/dbapi?retryWrites=true&w=majority

module.exports = controller;
