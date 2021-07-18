const jwt = require("jsonwebtoken");

function authentication(req, res, next) {
	const token = req.header("token");
	if (!token) return res.status(401).send("Access Denied.");
	try {
		req.authenticated = jwt.verify(token, process.env.TOKEN_SECRET);
		next();
	} catch (err) {
		return res.status(401).send("Access Denied.");
	}
}

module.exports = authentication;
