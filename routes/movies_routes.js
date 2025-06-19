// # IMPORT
//--- IMPORT EXPRESS
import express from "express";
import movies_controller from "../controllers/movies_controller.js";

// # ROUTER
const router = express.Router();

// # ROUTES
//--- INDEX
router.get(`/`, movies_controller.index);

//--- SHOW
router.get(`/:id`, movies_controller.show);

// --- STORE REVIEW
router.post(`/:id/review`, movies_controller.storeReview);

// # EXPORT
export default router;
