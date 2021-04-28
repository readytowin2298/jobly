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


    static async create(title, salary, equity = 0, companyHandle) {
        if(!title || !salary || !companyHandle){
            return new BadRequestError("Please include all parameters")
        }
        
        const duplicateCheck = await db.query(
            `SELECT *
             FROM jobs
             WHERE company_handle = $1
             AND title = $2`,
            [companyHandle, title]).catch((err)=>{
                throw new ExpressError("Error communicating with Database", 500)
            });
        if (duplicateCheck.rows[0])
            {throw new BadRequestError(`Duplicate job found`)};
        const result = await db.query(`
        INSERT INTO jobs
        (title, salary, equity, company_handle)
        VALUES ($1, $2, $3, $4)
        RETURNING id, title, salary, equity, company_handle AS "companyHandle"`,
        [title, salary, equity, companyHandle]).catch((err)=>{
            throw new ExpressError("Error communicating with Database", 500)
        });
        
        return result.rows[0]
    }
}


module.exports = Job