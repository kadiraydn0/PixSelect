import User from "../model/user.model.js";
import _ from "lodash"


export function createUser(input) {
    return User.create(input);
}


export function findOneUserById(userId) {
    return User.findOne({ _id: userId }, { password: 0 });
}


export function findandUpdate(query, update) {
    return User.findByIdAndUpdate(query, update, {
        new: true
    })
}


export function deleteMyProfile(query) {
    return User.findOneAndDelete(query)
}





export async function validatePassword({ email, password }) {

    const user = await User.findOne({ email });
    if (!user) {
        return false;
    }
    const isValid = await user.comparePassword(password);
    if (!isValid) {
        return false;
    }
    return _.omit(user.toJSON(), ["password", "createdAt", "updatedAt", "__v"]);
}




