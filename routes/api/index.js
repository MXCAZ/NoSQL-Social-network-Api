const router = require("express").Router();
const userRoutes = require("./user-api");
const thoughtRoutes = require("./thought-api");

router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;
