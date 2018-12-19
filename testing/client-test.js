

/**
 * CONSTANTS
 *  - TABLES
 *  - WORKSHEET_ID
*/
const STUDENTS_TABLE = { "TABLE_NAME": "STUDENTS_TABLE", "WID": [815095649, 987445403] };
const ATTENDANCE_RECORDS = { "TABLE_NAME": "ATTENDANCE_RECORDS", "WID": [0, 119545118]};

const CONSTANTS = { STUDENTS_TABLE, ATTENDANCE_RECORDS }

// Class Table Constructor
function TableContructor(start_row=1){
        this.row_id = start_row;

        // append and display html content
        this.construct = (is_header=false, data)=>{
            console.log(data);
            
            // parse header
            let header = `<th>#</th>`;
            if(is_header){ Object.keys(data[0]).forEach(fieldName => header += `<th scope="col">${fieldName}</th>`); }

            // parse content
            let content = data.reduce((rowStacks, rawData)=>{
                let row;
                Object.values(rawData).forEach(value => row += `<td>${value}</td>`) ;
                row = `<tr> \
                    <td>${this.row_id}</td> \
                    ${row}
                </tr>`;
                this.row_id ++;
                return rowStacks + row;
            }, "");
            
            return { header, content };
        }
    }    

const tableConstructor = new TableContructor();

/** getProfiles()
 * TODO:
 *  - Refactor getProfiles()
 *  - Add doc and wid params
 * @param {string} doc: document name of the google Sheet
 * @param {number} wid: worksheet id in the google Sheet 
 * @param {function} callback: (optional) a function to be called after the API call
 * @param {dict} conditions: WHERE
 * @param {number} n_limit: limit of number of rows
 */
function getProfiles(doc, wid, callback, condition=null, n_limit=10000,){
    // parse condition
    let query_cond = ` `;
    if(condition){ query_cond = ` WHERE ${condition.col} \'${condition.value}\'`; }
    // parse limit amount
    let query_limit = ` LIMIT ${n_limit}`;
    // call API
    blockspring.runParsed("serversideapi", 
            { 
                "method": 'GET', 
                "doc_name": doc, 
                "worksheet_id": wid,
                "query": "SELECT B, C, D, E, F" + query_cond + query_limit //"SELECT B, C, D, E, F WHERE C CONTAINS"  + matric
            }, 
            function(res){
                // return header and content in tabular form
                // return tableContructor.construct(res.params.data);
                if(callback){ callback(res); }
                return res.params.data;
    });   
};

/** postAttendance()
 * @description: called when inserting rows to google Sheet
 * @param {array} values: 2D arrays of values in rows which are to be post to google Sheet 
 * @param {string} doc: document name of the google Sheet
 * @param {number} wid: worksheet id in the google Sheet 
 * @param {function} callback: (optional) a function to be called after the API call
 */
function postAttendance(values, doc, wid, callback){
    // call API
    blockspring.runParsed("serversideapi",
            {
                "method": 'POST',
                "doc_name": doc, //CONSTANTS.ATTENDANCE_RECORDS.TABLE_NAME,
                "worksheet_id": wd, //CONSTANTS.ATTENDANCE_RECORDS.WID[0],
                "values": values
            },
            function(res){
                if(callback){ callback(); }
                // return status
                return res.params;
    });
};



