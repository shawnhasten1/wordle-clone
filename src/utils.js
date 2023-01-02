export const rows = [['Q','W','E','R','T','Y','U','I','O','P'],
                    ['A','S','D','F','G','H','J','K','L'],
                    ['ENTER','Z','X','C','V','B','N','M','DEL']]

export function generateKeyboards(){
    var rows_formatted = [];
    for(var x = 0; x<rows.length; x++){
        var row = [];
        for(var y = 0; y<rows[x].length; y++){
            row.push({
                "value":rows[x][y]
            })
        }
        rows_formatted.push(row);
    }
    return rows_formatted;
}