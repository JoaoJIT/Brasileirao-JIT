import { Router } from "express";
import TimeController from "./controllers/TimeController.js";

const router = Router();

router.get("/times/sigla/:sigla", TimeController.findBySigla);

router.get("/times", TimeController.findAll);
router.get("/times/:id", TimeController.findById);
router.put("/times/:id", TimeController.updateById);
router.post("/times", TimeController.store);
router.delete("/times/:id", TimeController.deleteById);

export default router;
