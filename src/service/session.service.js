import jwt from "jsonwebtoken"
import Session from "../model/session.model.js";

export function sessionCreate(userId, userAgent) {
    return Session.create({ user: userId, userAgent })
}

export function sessionProfileUpdate(userId) {
    return Session.updateMany({ user: userId }, {
        is_profile_deleted: true
    })
}

export function signJWTToken(data) {
    return jwt.sign(data, process.env.privateKey, { expiresIn: process.env.ACCESS_TOKEN_TTL });
}

export function decode(token) {
    try {
        const decoded = jwt.verify(token, process.env.privateKey);
        return { valid: true, expired: false, decoded };
    } catch (error) {
        return {
            valid: false,
            expired: error.message === "jwt expired",
            decoded: null,
        };
    }
}


