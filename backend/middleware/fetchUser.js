const jwt = require('jsonwebtoken');
const JWT_SECRET = 'meranameabhi@hai';

const fetchuser = (req, res, next) => {
    // Get the token from the request headers
    const token = req.header('auth-token');
    console.log(token);
    if (!token) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
        // Return the response to prevent further execution of the function
    }
    try {
        // Verify the token using the JWT_SECRET
        const decodedToken = jwt.verify(token, JWT_SECRET);
        // Append the user id to the req object
        req.user = decodedToken.user;
        return next();
    } catch (error) {
        return res.status(401).send({ error: "Please authenticate using a valid token" });
        // Return the response to prevent further execution of the function
    }
};

module.exports = fetchuser;

