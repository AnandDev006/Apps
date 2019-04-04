const router = require("express-promise-router")();
const passport = require("passport");
require("../passport");
const { validateBody, schemas } = require("../helpers/routerHelpers");
const UserController = require("../controllers/users");

const passportSignIn = passport.authenticate("local", { session: false });
const passportSecretJWT = passport.authenticate("jwt", { session: false });
const passportGoogle = passport.authenticate("googleToken", { session: false });
const passportFacebook = passport.authenticate("facebookToken", { session: false });

router
    .route("/signup")
    .post(validateBody(schemas.signUpSchema), UserController.signUp);

router
    .route("/signin")
    .post(
        validateBody(schemas.signInSchema),
        passportSignIn,
        UserController.signIn
    );

router.route("/oauth/google").post(passportGoogle, UserController.googleOAuth);

router.route("/oauth/facebook").post(passportFacebook, UserController.facebookOAuth);

router.route("/secret").get(passportSecretJWT, UserController.secret);

module.exports = router;
