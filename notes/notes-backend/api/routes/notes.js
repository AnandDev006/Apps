const router = require('express-promise-router')();
const passport = require('passport');

require('../passport');
const NotesController = require('../controller/notes');
const { validateBody, schemas } = require('../helper/routerHelpers');

const passportSecretJWT = passport.authenticate('jwt', { session: false });

router.route('/').get(passportSecretJWT, NotesController.getAllNotes);

router
  .route('/')
  .post(
    validateBody(schemas.noteInsertUpdateSchema),
    NotesController.insertNewNote
  );

router.route('/:noteId').get(NotesController.getNoteDetails);

router
  .route('/:noteId')
  .patch(
    validateBody(schemas.noteInsertUpdateSchema),
    NotesController.editNote
  );

router.route('/:noteId').delete(NotesController.deleteNote);

module.exports = router;
