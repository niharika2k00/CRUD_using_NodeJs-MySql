import express from "express";
import {
  getAllUsers,
  getUser,
  createUser,
  bulkCreateUsers,
  updateUser,
  deleteUser,
} from "../controllers/userControllers.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.post("/bulk", bulkCreateUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
