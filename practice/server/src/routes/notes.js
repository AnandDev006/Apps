const router = require('express-promise-router')();
const passport = require('passport');
require('../passport');
const { validateBody, schemas } = require('../helpers/routerHelpers');
const NoteController = require('../controllers/notes');

const passportSecretJWT = passport.authenticate('jwt', { session: false });

router.route('/').get(passportSecretJWT, NoteController.getNotes);

router
  .route('/')
  .post(
    validateBody(schemas.noteInsertUpdateSchema),
    passportSecretJWT,
    NoteController.insertPost
  );

router
  .route('/')
  .delete(
    validateBody(schemas.noteDeleteSchema),
    passportSecretJWT,
    NoteController.deletePost
  );

module.exports = router;
