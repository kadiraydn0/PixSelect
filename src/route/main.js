import { Router } from "express";
// import { startStreamHandler } from "../controller/stream.controller.js";
import { createUserHandler, deleteMyProfileHandler, editMyProfileHandler, getMyProfileHandler, signInHandler } from "../controller/user.controller.js";
import requiresUser from "../middlewares/requiresUser.js";


const router = Router();

router.post("/signup", createUserHandler)
router.post("/signin", signInHandler)
router.get("/profile", [requiresUser], getMyProfileHandler)
router.put("/editmyprofile", [requiresUser], editMyProfileHandler)
router.delete("/deletemyprofile", [requiresUser], deleteMyProfileHandler)
// router.post("/startstream", [requiresUser], startStreamHandler)

export default router;