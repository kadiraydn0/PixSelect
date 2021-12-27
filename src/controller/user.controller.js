import { sessionCreate, sessionProfileUpdate, signJWTToken } from "../service/session.service.js";
import { createUser, deleteMyProfile, findandUpdate, findOneUserById, validatePassword } from "../service/user.service.js";
import _ from "lodash"

export async function createUserHandler(req, res) {
    try {
        const user = req.body
        await createUser({ ...user })
        res.send("User created.")
    } catch (e) {
        res.status(409).send(e.message)
    }
}


export async function signInHandler(req, res) {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ success: false, message: "Email or password not provided" })

    const user = await validatePassword({ email, password });
    if (!user) {
        return res.status(401).send("Wrong username or password");
    }
    const accessToken = signJWTToken(user)
    await sessionCreate(user._id, req.get("user-agent") || "")
    return res.json({ success: true, accessToken })
}


export async function getMyProfileHandler(req, res) {
    try {
        const userId = _.get(req, "user._id");
        const user = await findOneUserById(userId)
        if (!user) {
            return res.send("Yours profile is not found")
        }
        return res.json(user)
    } catch (e) {
        res.status(400).send(e.message)
    }
}


export async function editMyProfileHandler(req, res) {
    try {
        // const userId = req.user._id
        const userId = _.get(req, "user._id");
        const data = req.body;
        const user = await findandUpdate({ _id: userId }, data);
        if (!user) {
            return res.send("Yours profile is not found")
        }
        return res.json(user)
    } catch (e) {
        res.status(400).send(e.message)
    }
}


export async function deleteMyProfileHandler(req, res) {
    try {
        const userId = _.get(req, "user._id");
        await deleteMyProfile({ _id: userId });
        await sessionProfileUpdate(userId)
        return res.json({ success: true, message: "Your profile is deleted." })
    } catch (e) {
        res.status(400).send(e.message)
    }
}

