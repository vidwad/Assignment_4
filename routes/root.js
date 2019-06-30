const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
  response.render("home");
});


// REMOVED FOR NOW BECAUSE NO COOKIES REQUIRED

// router.get("/signIn", (request, response) => {
//   console.log("URL Query:", request.query);
//   response.render("signIn");
// });


// const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;

// router.post("/sign_in", (request, response) => {
//   const cname = request.body.cname;
//   response.cookie("cname", cname, { maxAge: COOKIE_MAX_AGE });
//   response.redirect("cohorts/");
// });

// router.post("/sign_out", (request, response) => {
//   response.clearCookie("cname");
//   response.redirect("/");
// });

module.exports = router;
