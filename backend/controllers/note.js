// const note = require("../models/note");
const Note = require("../models/note");

async function handleGetNotes(req, res) {
  const notes = await Note.find({ userId: req.user.id });
  res.json(notes);
}

async function handleCreateNote(req, res) {
  const { title, content } = req.body;
  const currentNote = await Note.create({
    title,
    content,
    userId: req.user.id,
  });
  res.status(201).json(currentNote);
}
module.exports = {
  handleCreateNote,
  handleGetNotes,
};
