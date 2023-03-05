const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const app = express();
const controller = require("../controllers/index.controllers");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.post("/form/data", controller.createUser);

router.get("/", controller.index);
router.get("/compra", controller.compra);

// ESTA SERIA PARA EL LOGIN
router.get("/admin", controller.loginPanel);
router.post("/admin", controller.loginSentPanel);

// ESTA ES LA RUTA DEL PANEL
router.get("/admin/panel", controller.adminPanel);
router.get("/admin/panel/new", controller.newProduct);
router.post("/admin/panel/new", controller.addProduct);
router.get("/admin/panel/:id/edit", controller.renderEdit);
router.post("/admin/panel/:id/edit", controller.editProduct);
router.get("/admin/panel/:id/delete", controller.deleteProduct);
router.get("/admin/panel/:id/done", controller.orderDone);
router.get("/admin/panel/:id/undoOrder", controller.undoOrder);
router.get("/admin/panel/:id/deleteOrder", controller.deleteOrder);

module.exports = router;
