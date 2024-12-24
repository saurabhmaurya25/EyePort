import jwt from 'jsonwebtoken';

const JWT_KEY = "Saur";

const generateToken = (userId) => {
    return jwt.sign({user: {id: userId } }, JWT_KEY);
};

const verifyToken = (token) => {
    return jwt.verify(token,JWT_KEY);
};

const generateTempToken = (userId) => {
    return jwt.sign({ user: {id: userId} }, JWT_KEY, { expiresIn: "30m"});
};

export {generateToken,verifyToken,generateTempToken};