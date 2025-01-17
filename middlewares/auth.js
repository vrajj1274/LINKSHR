const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  // const userUid = req.cookies?.uid; --- for checking when cookie is send 
  const userUid = req.headers["authorization"]; // for header
  if (!userUid || !userUid.startsWith("Bearer ")) {
    return res.redirect("/login");
  }

  // if (!userUid) return res.redirect("/login"); // This check is redundant since it's already covered above.

  const token = userUid.split("Bearer ")[1].trim(); // for splitting of header
  const user = getUser(token); // Corrected to use token instead of userUid

  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  // const userUid = req.cookies?.uid; // for cookies
  const userUid = req.headers["authorization"]; // for header

  if (!userUid || !userUid.startsWith("Bearer ")) {
    req.user = null; // Ensure user is set to null if the Authorization header is invalid
    return next();
  }

  const token = userUid.split("Bearer ")[1].trim(); // for splitting of header

  // const user = getUser(userUid); // Incorrect for cookies
  const user = getUser(token); // Corrected to use token instead of userUid

  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};
