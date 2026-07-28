import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
    res.json({
        message: "Room API working",
    });
});

export default router;
