
// Jquery no conflict method to avoid confict using $ symbol by other frameworks
var $x = jQuery.noConflict();
console.log("Version: "+$x.fn.jquery);

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

