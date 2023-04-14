"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");
const Company = require("./company");


/** Related functions for jobs */

class Job {

  /** Create a job (from data), update db, return new job data
   * @param {title, salary, equity, company_handle}
   * If companyHandle does not exist, throws notFoundError - ask if calling
   * another function to throw error is okay?
   *
   * Returns {id, title, salary, equity, company_handle}
   */
  static async create({ title, salary, equity, companyHandle }) {
    //if no company throw error

    await Company.get(companyHandle);

    const result = await db.query(
      `
      INSERT INTO jobs(
        title,
        salary,
        equity,
        company_handle)
        VALUES
          ($1, $2, $3, $4)
          RETURNING id, title, salary, equity, company_handle AS "companyHandle"`,
      [
        title,
        salary,
        equity,
        companyHandle
      ],
    );

    const job = result.rows[0];
    console.log("job:", job);
    return job;

  }

  /** Find all jobs
   *
   * Return [{id, title, salary, equity, company_handle}, ...]
   */
  static async findAll() {

  }

  /** Find matching jobs based on filter
   *
   * @param {Object} filterBy {title, minSalary, hasEquity}
   *
   * Returns [{id, title, salary, equity, company_handle}, ...]
  */
  static async findSome(filterBy) {

  }

  /** Given a job id, return data about job
   *
   * @param jobId number
   *
   * Returns {id, title, salary, equity, company_handle}
   *
   * Throws NotFoundError if not found
  */
  static async get(jobId) {

  }

  /** Update job with `data`
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * @param {Object} data: {title, salary, equity}
   *
   * Returns {id, title, salary, equity, company_handle}
   *
   * Throws NotFoundError if not found
  */
  static async update(jobId, data) {

  }

  /** Delete a given job from database; returns undefined
   *
   * Throws NotFoundError if job not found
   */
  static async remove(jobId) {

  }

}

module.exports = Job;