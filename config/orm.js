const connection = require("./connection");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    const arr = [];
  
    for(let i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }
  
  // Helper function to convert object key/value pairs to SQL syntax
  function objToSql(ob) {
    const arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (let key in ob) {
      let value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations 
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        arr.push(key + "=" + value);
      }
    }
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }

let orm = {
    selectAll: function(table, cb) {
        const query = `SELECT * FROM ${table}`;
        connection.query(query, function(err, result){
            if (err) {
                console.log(err)
                throw err;
            }
            else {
                cb(result);
            }
        })
    },
    insertOne: function(table, cols, vals, cb) {
        const query = `INSERT INTO ${table} (${cols.join(", ")}) VALUES (${printQuestionMarks(vals.length)})`; 
        console.log(query);

        connection.query(query, vals, function(err, result) {
          if (err) {
              console.log(err);
            throw err;
          }
    
          cb(result);
        });
    },
    updateOne: function(table, objColVals, condition, cb) {
        const query = `UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condition}`;
        console.log(query);
        connection.query(query, function(err, result) {
          if (err) {
            console.log(err);
            throw err;
          }
    
          cb(result);
        });
      },
    deleteOne: function(table, condition, cb) {
        const query = `DELETE FROM ${table} WHERE ${condition}`;
        connection.query(query, function(err, result) {
            if (err) {
                console.log(err);
                reject(err)
            }
            cb(result);
        });
    }
};

module.exports = orm;

// var orm = {
//     selectAll: function(tableInput) {
//         var queryString= "SELECT * FROM" + tableInput; 
//         connnection.query(queryString),  function(err, result) {
//             if (err) throw err;
//             console.log(result);
//         }   
//     },
//     createOne: function(table, name, devoured) {
//         var queryString = `INSERT INTO ${table} (burger_name, devoured)` + `values(${name}, ${devoured})`;
//         console.log(queryString);
    
//         connection.query(queryString, vals, function(err, result) {
//           if (err) {
//             throw err;
//           }
//           console.log(result);
//         });
//       },
//       insertOne: function(table, name, devoured, id) {
//         var queryString = `UPDATE ${table} SET burger_name = ${name}, devoured = ${devoured} WHERE id = ${id}`;
//         console.log(queryString);
//         connection.query(queryString, function(err, result) {
//           if (err) {
//             throw err;
//           }
//           console.log(result);
//         });
//       }
// };

