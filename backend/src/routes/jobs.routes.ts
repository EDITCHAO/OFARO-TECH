import { Router } from 'express';
import { getActiveJobs } from '../controllers/jobs.controller';

const router = Router();

// GET /api/jobs/active - Liste des offres d'emploi actives
router.get('/active', getActiveJobs);

export default router;
