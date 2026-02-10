import express from "express";
import { isAuth } from "../middleware/auth.js";
import uploadFile from "../middleware/multer.js";
import { createCompany, deleteCompany } from "../controllers/job.js";

const router = express.Router();


router.post("/company/new", isAuth, uploadFile, createCompany);
router.delete("/company/:company_id", isAuth, deleteCompany)

export default router;