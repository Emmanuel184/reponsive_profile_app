const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {

    try {

        let token = req.header("Authorization");

        if (!token) {
            return res.status(403).send(`access denied`);
        }

        if (token.startsWith("Bearer ")) {
            token = token.split(" ")[1];
        }


        const verify = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verified;
        next();

    } catch (error) {
        res.statis(500).json({ msg: error })
    }

}