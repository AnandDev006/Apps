const JWT = require('jsonwebtoken');
const Note = require('../models/Note');

module.exports = {
  getNotes: async (req, res, next) => {
    let notesList = [];
    try {
      // Get all notes made by this user
      notesList = await Note.find({ userID: req.user.id });
    } catch (error) {
      res.status(400).json({ msg: 'DB error' });
    }

    // Respond with notes list
    console.log('Notes retrieved succesfully');
    res.status(200).json({ notesList });
  },

  insertPost: async (req, res, next) => {
    const { postID, userID, title, body } = req.value.body;

    // Create new note
    const newNote = {
      userID,
      title,
      body,
    };

    try {
      if (postID) {
        await Note.findByIdAndUpdate(postID, newNote);
        console.log('Update successful');
      } else {
        await new Note(newNote).save();
        console.log('Save successful');
      }
    } catch (error) {
      res.status(400).json({ msg: 'DB error' });
    }

    // Respond with success message
    res.status(200).json({ msg: 'Save successful' });
  },

  deletePost: async (req, res, next) => {
    const { postID } = req.value.body;
    try {
      // Find note and delete
      await Note.findByIdAndDelete(postID);
    } catch (error) {
      res.status(400).json({ msg: 'DB error' });
    }

    // Respond with success message
    console.log('Note delete successful');
    res.status(200).json({ msg: 'Delete successful' });
  },
};
