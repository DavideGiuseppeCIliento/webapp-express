// # IMPORT
//--- IMPORT EXPRESS
import express from "express";
import movies_controller from "../controllers/movies_controller.js";
// # ROUTER
const router = express.Router();

// # ROUTES
//--- INDEX
router.get(`/`, movies_controller.index);

// # EXPORT
export default router;
