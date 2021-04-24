const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.


// Takes an object containing data to reference in database, and an object containing naming conversions between 
// json/js and sql; i.e.:
// dataToUpdate = {"firstName" : "aUsersName", "email" : "fakeemail@ames.com", "isAdmin" : true}
// jsToSql = {"firstName" : "first_name", "email" : "email", "isAdmin" : "is_admin" }
// Returns object with two properties:
//  - setCols  concatenated string containing variable assignment for paramaterized sql query (i.e.'"first_name"=$1, "email"=$2, "is_admin"=$3' )
//  - values = ordered list of values to be set for the vairables in setCols
// sample output:
// {
//   setCols: '"first_name"=$1, "email"=$2, "is_admin"=$3',
//   values: [ 'aUsersName', 'fakeemail@ames.com', true ]
// }

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}


module.exports = { sqlForPartialUpdate };
