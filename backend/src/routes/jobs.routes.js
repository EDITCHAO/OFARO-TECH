const { Router } = require('express');
const { getActiveJobs } = require('../controllers/jobs.controller');

const router = Router();

router.get('/active', getActiveJobs);

module.exports = router;
