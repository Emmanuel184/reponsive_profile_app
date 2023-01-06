const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {

    try {

        let token = req.header("Authorization");

        console.log(token);

        if (!token) {
            return res.status(403).send(`access denied`);
        }

        if (!token.startsWith("Bearer ")) {

            return res.status(400).json({ msg: `Invalid Auth` })

        }

        

        token = token.split(" ")[1];

        const verify = jwt.verify(token, process.env.JWT_SECRET);

        if (!verify) {
            return res.status(400).json({ msg: `Invalid credentials` })
        }

        req.user = verify;
        next();

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

module.exports = verifyToken;