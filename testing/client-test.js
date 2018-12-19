

/**
 * CONSTANTS
 *  - TABLES
 *  - WORKSHEET_ID
*/
const STUDENTS_TABLE = { "TABLE_NAME": "STUDENTS_TABLE", "WID": [815095649, 987445403] };
const ATTENDANCE_RECORDS = { "TABLE_NAME": "ATTENDANCE_RECORDS", "WID": [0, 119545118]};

const CONSTANTS = { STUDENTS_TABLE, ATTENDANCE_RECORDS }

// Class Table Constructor
function TableContructor(){
        this.row_id = 1;

        // append and display html content
        this.construct = (data)=>{
            console.log(data);
            
            // parse header
            let header = `<th>#</th>`;
            Object.keys(data[0]).forEach(fieldName => header += `<th scope="col">${fieldName}</th>`);

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

function getProfiles(conditions){
    // parse condition

    // call API
    blockspring.runParsed("serversideapi", 
        { 
            "method": 'GET', 
            "doc_name": CONSTANTS.STUDENTS_TABLE.TABLE_NAME, 
            "worksheet_id": CONSTANTS.STUDENTS_TABLE.WID[0],
            "query": "SELECT B, C, D, E, F" //"SELECT B, C, D, E, F WHERE C CONTAINS"  + matric
        }, 
        function(res){
            // return header and content in tabular form
            return tableContructor.construct(res.params.data);
        
    });   
};

function postAttendance(values){
    // call API
    blockspring.runParsed("serversideapi",
            {
                "method": 'POST',
                "doc_name": CONSTANTS.ATTENDANCE_RECORDS.TABLE_NAME,
                "worksheet_id": CONSTANTS.ATTENDANCE_RECORDS.WID[0],
                "values": values
            },
            function(res){
                // return status
                return res.params;
            });
};



