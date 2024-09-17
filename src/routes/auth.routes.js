import { Router } from "express";
import {
  getMe,
  login,
  logout,
  register,
} from "./../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = Router();

router.get("/me", protectRoute, getMe);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
