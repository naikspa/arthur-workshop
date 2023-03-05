const controller = {};

controller.index = async (req, res) => {
  const products = await Product.find().lean();
  res.render("index", { x: products });
};
controller.compra = (req, res) => {
  res.render("compra");
};

const Product = require("../model/Product");
const Clients = require("../model/client");
const cookie = require("cookie");

controller.createUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const newClient = new Clients(req.body);
    await newClient.save();
    res.redirect("/compra");
  } catch (error) {
    return console.log(error.message);
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
controller.loginPanel = (req, res) => {
  const cookies = req.cookies;
  if (cookies.isLogged == "y")res.redirect("/admin/panel");
  else{
    res.render("adminlogin");
  }
};
controller.loginSentPanel = (req, res) => {
  let info = req.body;
  console.log(info);
  if (
    info.username == process.env.ENV_WS_USER ||
    info.password == process.env.ENV_WS_PASSWORD
  ) {
    const isLoggedCookie = cookie.serialize("isLogged", "y", {
      maxAge: 86400, // tiempo de vida de la cookie en segundos
      httpOnly: true, // solo se puede acceder a la cookie a través de HTTP
    });
    res.setHeader("Set-Cookie", isLoggedCookie);
    res.redirect("/admin/panel");
  } else {
    console.log("LA CONTRASEÑA O EL USUARIO SON INCORRECTOS");
  }
};
controller.adminPanel = async (req, res) => {
  // Accede a las cookies de la solicitud HTTP
  const cookies = req.cookies;
  if (cookies.isLogged == "y") {
    const products = await Product.find().lean();
    const client = await Clients.find().lean();
    res.render("adminpanel", { x: products, y: client });
  } else {
    res.redirect("/admin");
  }
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

controller.orderDone = async (req, res) => {
const { id } = req.params;
await Clients.findByIdAndUpdate(id, { done: true });
res.redirect("/admin/panel");
};
controller.undoOrder = async (req, res) => {
const { id } = req.params;
await Clients.findByIdAndUpdate(id, { done: false });
res.redirect("/admin/panel");
};

controller.deleteProduct = async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect("/admin/panel");
};
controller.deleteOrder = async (req, res) => {
  const { id } = req.params;
  await Clients.findByIdAndDelete(id);
  res.redirect("/admin/panel");
};

// mongodb+srv:Enzo:UDRDRiI6l0NMmj0G@arthur-workshop.bwnuexp.mongodb.net/dbapi?retryWrites=true&w=majority

module.exports = controller;
