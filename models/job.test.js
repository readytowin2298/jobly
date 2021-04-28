"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Job = require("./job.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);



/************************************** create */

describe("Create", function() {
    test("Success when all data is valid", async function(){
        const salary = 123456
        const job = await Job.create('Test Job', salary, 0, 'c1');

        expect(job);
        expect(job).toHaveProperty('id');
        expect(job).toHaveProperty('salary', salary)
    });
    test("Error on incomplete data")
})