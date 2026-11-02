const express = require("express");

const {
    getRecurring,
    createRecurring,
    toggleRecurring,
    deleteRecurring,
    processRecurring
} = require("../controllers/recurringController");

const protect =
    require("../middleware/authMiddleware");

const router = express.Router();

router.get(
    "/",
    protect,
    getRecurring
);

router.post(
    "/",
    protect,
    createRecurring
);

router.post(
    "/process",
    protect,
    processRecurring
);

router.put(
    "/:id/toggle",
    protect,
    toggleRecurring
);

router.delete(
    "/:id",
    protect,
    deleteRecurring
);

module.exports = router;