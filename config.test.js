"use strict";

describe("config can come from env", function () {
  test("works", function() {
    process.env.SECRET_KEY = "abc";
    process.env.PORT = "5000";
    process.env.DATABASE_URL = "other";
    process.env.NODE_ENV = "other";

    const config = require("./config");
    expect(config.SECRET_KEY).toEqual("abc");
    expect(config.PORT).toEqual(5000);
    expect(config.getDatabaseUri()).toEqual("other");
    expect(config.BCRYPT_WORK_FACTOR).toEqual(12);

    delete process.env.SECRET_KEY;
    delete process.env.PORT;
    delete process.env.BCRYPT_WORK_FACTOR;
    delete process.env.DATABASE_URL;
    const test_dbs = ["postgres://postgres:test@localhost:5432/jobly_test", "postgres://lxrfybbs:AvYUcIhsNAiM3OroQ57I_cj1WXMdENn3@queenie.db.elephantsql.com:5432/lxrfybbs"]
    const real_dbs = ["postrgres://postgres:test@localhost:5432/jobly", "postgres://nypaobfv:AIT6TTHJ-RrP1PnGK4EbDCERjoJXUL4L@queenie.db.elephantsql.com:5432/nypaobfv"]

    expect(real_dbs.indexOf(config.getDatabaseUri())).not.toEqual(-1);
    process.env.NODE_ENV = "test";

    expect(test_dbs.indexOf(config.getDatabaseUri())).not.toEqual(-1);
  });
})

