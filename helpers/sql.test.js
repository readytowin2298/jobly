const { sqlForPartialUpdate } = require('./sql.js');

describe("Test sqlForPartialUpdate", function(){
    test("Valid request", ()=>{
        const dataToUpdate = {"firstName" : "aUsersName",
            "email" : "fakeemail@ames.com",
            "isAdmin" : true
            }
        const jsToSql = {
            firstName: "first_name",
            lastName: "last_name",
            isAdmin: "is_admin",
            }
        const res = sqlForPartialUpdate(dataToUpdate, jsToSql)
        expect(res).toHaveProperty("setCols", '"first_name"=$1, "email"=$2, "is_admin"=$3')
        expect(res).toHaveProperty("values", [ 'aUsersName', 'fakeemail@ames.com', true ])
    })
    test("Err if no data", ()=>{
        const jsToSql = {
            firstName: "first_name",
            lastName: "last_name",
            isAdmin: "is_admin",
            }
        const dataToUpdate = {}
        expect(() => {sqlForPartialUpdate(dataToUpdate, jsToSql)}).toThrow()
    })
})