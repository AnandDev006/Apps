const mongoose = require('mongoose');

module.exports = {
  getAllNotes: async (req, res, next) => {
    console.log(req.headers['x-user-auth']);
    console.log(req.user);

    res.status(200).json({ msg: 'msg' });
  },

  insertNewNote: async (req, res, next) => {
    console.log('insert notes');
    res.status(200).json({ msg: 'msg' });
  },

  getNoteDetails: async (req, res, next) => {
    const { noteId } = req.params;
    console.log('get note details ', noteId);
    res.status(200).json({ msg: 'msg' });
  },

  editNote: async (req, res, next) => {
    const { noteId } = req.params;
    console.log('edit note', noteId);
    res.status(200).json({ msg: 'msg' });
  },

  deleteNote: async (req, res, next) => {
    const { noteId } = req.params;
    console.log('delete note', noteId);
    res.status(200).json({ msg: 'msg' });
  },
};
