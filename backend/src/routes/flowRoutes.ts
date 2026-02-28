import { Router } from "express";

import {
    parseFlowController,
    deployFlowController,
    getFlowsController
} from "../controllers/flowController.js";

const router = Router();

router.post("/parse", parseFlowController);
router.post("/deploy", deployFlowController);
router.get("/", getFlowsController);

export default router;