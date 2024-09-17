import { Router } from "express";
import {
  createPg,
  getAllPgs,
  getSinglePg,
} from "../controllers/pg.controller.js";
import { protectRoute } from "./../middlewares/protectRoute.js";

const router = Router();

router.get("/all", getAllPgs);
router.get("/:id", getSinglePg);
router.post("/create", protectRoute, createPg);

export default router;
