import { signUp, logIn } from "../services/authService.js";

export async function signUpHandler(req, res) {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({
                error: 'Email and password are required',
            });
        }
        const newUser = await signUp(email, password);
        res.status(201).json(newUser);
    }
    catch (error) {
        next(error);
    }
}

export async function loginHandler(req, res, next) {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({
                error: 'Email and password are required',
            });
        }
        const token = await logIn(email, password);
        res.status(200).json({ token });
    }
    catch (error) {
        next(error);
    }
}