
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
            let header = `<th scope="col">#</th>`;
            Object.keys(data[0]).forEach(fieldName => header += `<th scope="col">${fieldName}</th>`);

            // parse content
            let content = data.reduce((rowStacks, rawData)=>{
                let row;
                Object.values(rawData).forEach(value => row += `<td>${value}</td>`) ;
                row = `<tr> \
                    <th scope=\"row\">${this.row_id}</th> \
                    ${row}
                </tr>`;

                this.row_id ++;
                return rowStacks + row;
            }, "");
            
            return { header, content };
        }
    }    


// jQuery convention for running when the document has been fully loaded:
jQuery(document).ready(() => {
    // init table contructor
    var tableContructor = new TableContructor();

    // Get query a student's profile 
    $('#readButton').click(() => {
        var matricInput = $('#matricBox').val();
        
        // Proceed if the matric Input is filled by user
        if(matricInput != ""){
            // format matric input
            var matric = `\'${matricInput}\'`;

            console.log('making ajax request to BlockSpring API');
            console.log(matric);
            
            // run Blockspring - GET Query method
            blockspring.runParsed("serversideapi", 
                { 
                    "method": 'GET', 
                    "doc_name": CONSTANTS.STUDENTS_TABLE.TABLE_NAME, 
                    "worksheet_id": CONSTANTS.STUDENTS_TABLE.WID[0],
                    "query": "SELECT B, C, D, E, F WHERE C CONTAINS"  + matric
                }, 
                function(res){
                    // display header and content in tabular form
                    let { header, content } = tableContructor.construct(res.params.data);
                    $('#table-header').html(header);
                    $('#student-table').html(content);
                }
            );   
        }
        
    });

    // Get query all students' profiles
    $('#allStudentsButton').click(() => {
        console.log("Quering all students...")

        // run Blockspring - GET Query all method
        blockspring.runParsed("serversideapi", 
            { 
                "method": 'GET', 
                "doc_name": CONSTANTS.STUDENTS_TABLE.TABLE_NAME, 
                "worksheet_id": CONSTANTS.STUDENTS_TABLE.WID[0],
                "query": "SELECT B, C, D, E, F"
            }, 
            function(res){
                // display content and header in tabular form
                let { header, content } = tableContructor.construct(res.params.data);
                $('#table-header').html(header);
                $('#student-table').html(content);
            });
    });

    // Post insert a student profile
    $('#insertButton').click(()=> {
        console.log("Posting data to GSheet...");
        
        // Take data from user input
        // var id;
        var name = $('#insertMatric').val();
        var job_id = $('#insertJI').val();
        var date = $('#insertDate').val();
        var day = $('#insertDay').val();
        var time_in = $('#insertTimein').val();
        var time_out = $('#insertTimeout').val(); 

        var values = [[98, name, job_id, date, day, time_in, time_out]];
        console.log(values);
        // run Blockspring - POST attendance method
        blockspring.runParsed("serversideapi",
            {
                "method": 'POST',
                "doc_name": CONSTANTS.ATTENDANCE_RECORDS.TABLE_NAME,
                "worksheet_id": CONSTANTS.ATTENDANCE_RECORDS.WID[0],
                "values": values
            },
            function(res){
                console.log(res.params);
            });
    });

}); // jQUery(document).ready()