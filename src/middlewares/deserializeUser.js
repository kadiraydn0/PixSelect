import { decode } from "../service/session.service.js";
import _ from "lodash"
export default async function deserializeUser(
    req,
    res,
    next
) {
    const accessToken = _.get(req, "headers.authorization", "").replace(
        /^Bearer\s/,
        ""
    );
    if (!accessToken) return next();
    const { decoded, expired } = decode(accessToken);
    if (decoded) {
        req.user = decoded;
        return next();
    }
    return next();
};
