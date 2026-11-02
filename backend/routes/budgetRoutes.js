const express = require("express");

const {
    getBudget,
    setBudget,
    deleteBudget
} = require("../controllers/budgetController");

const protect =
    require("../middleware/authMiddleware");

const router = express.Router();

router.get(
    "/",
    protect,
    getBudget
);

router.post(
    "/",
    protect,
    setBudget
);

router.delete(
    "/",
    protect,
    deleteBudget
);

module.exports = router;