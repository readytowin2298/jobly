"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError, ExpressError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");


class Job {
    /** Create a job (from data), update db, return new company data.
   *
   * data should be { (title, salary, equity, company_handle) }
   *
   * Returns { (title, salary, equity, company_handle) }
   *
   * Throws BadRequestError if company already in database.
   * */


    static async create(title, salary, equity, companyHandle) {
        const duplicateCheck = await db.query(
            `SELECT *
             FROM jobs
             WHERE company_handle = $1
             AND title = $2`,
            [companyHandle, title]);
        if (duplicateCheck.rows[0])
            {throw new BadRequestError(`Duplicate job foud`)};
        const result = await db.query(`
        INSERT INTO jobs
        (title, salary, equity, company_handle)
        VALUES ($1, $2, $3, $4)
        RETUNRING title, salary, equity, company_handle AS "companyHandle"`,
        [title, salary, equity, companyHandle])
        
        return result.rows[0]
    }
}