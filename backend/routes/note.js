const express = require("express");
const { handleCreateNote, handleGetNotes } = require("../controllers/note");

const router = express.Router();

const { checkForAuthentication } = require("../middlewares/auth");

router.get("/", handleGetNotes);
router.post("/", handleCreateNote);
module.exports = router;
