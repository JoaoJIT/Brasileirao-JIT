import { Router } from "express";
import TimeController from "./controllers/TimeController";

const router = Router();

router.get("/times", TimeController.findAll);
router.get("/times/:id", TimeController.findById);
router.get("/times/:sigla", TimeController.findBySigla);
router.put("/times/:id", TimeController.updateById);
router.post("/times", TimeController.store);
router.delete("/times/:id", TimeController.deleteById);

export default router;
