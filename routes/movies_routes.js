// # IMPORT
//--- IMPORT EXPRESS
import express from "express";
// # ROUTER
const router = express.Router();

// # ROUTES
router.get(`/`, (req, res) => {
  res.send("Ciao Amico!");
});

// # EXPORT
export default router;
