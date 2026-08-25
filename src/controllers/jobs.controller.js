const { query } = require('../config/database');

const getActiveJobs = async (req, res, next) => {
  try {
    const result = await query(
      `SELECT 
        id,
        reference,
        title,
        department,
        contract_type,
        location,
        work_mode,
        description,
        missions,
        responsibilities,
        required_skills,
        profile,
        education_level,
        experience_level,
        publication_date,
        application_deadline,
        published_at
      FROM job_offers 
      WHERE status = 'publiee' 
      AND (application_deadline IS NULL OR application_deadline >= CURRENT_DATE)
      ORDER BY publication_date DESC`
    );

    const jobs = result.rows;

    res.json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getActiveJobs
};
