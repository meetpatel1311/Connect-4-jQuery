$(document).ready(function(){
    var player_1 = prompt("Enter player 1's name, You will be blue");
    var player_2 = prompt("Enter player 2's name, you will be red");
    var player_1_color = 'rgb(255, 87, 87)';
    var player_2_color = 'rgb(107, 228, 255)';
    var game_on =true;
    var table = $('table tr');
    var currentPlayer = 1;
    var currentName = player_1
    var currentColor = player_1_color

    function changeColor(rowIndex, colIndex, color){
        return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
    }

    function reportColor(rowIndex, colIndex){
        return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
    }

    function checkBottom(colIndex){
        var colorReport = reportColor(5,colIndex)
        for (var row=5; row>-1; row--){
            colorReport = reportColor(row,colIndex)
            if(colorReport === 'rgb(128, 128, 128)'){
                return row
            }

        }
    }

    function colorMatch(one, two, three, four){
        if(one !== 'rgb(128, 128, 128)' && two !== 'rgb(128, 128, 128)' && three !== 'rgb(128, 128, 128)' && four !== 'rgb(128, 128, 128)'){
        }
        return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined)
    }

    function horizontalMatch(){
        for (var row=0; row<6; row++){
            for (var col=0; col<4;col++){
            if(colorMatch(reportColor(row,col), reportColor(row,col+1), reportColor(row,col+2), reportColor(row,col+3))){
                return true;
            }
            else{
                continue;
            }
            }
        }
    }

    function verticalMatch(){
        for (var col=0; col<7; col++){
            for(var row=0; row<3; row++){
                // console.log(row,col,col+1,col+2,col+3)
             if(colorMatch(reportColor(row,col), reportColor(row+1,col), reportColor(row+2,col), reportColor(row+3,col))){
                return true;
            }
            else{
                continue;
            }

            }

        }
    }
    $("#headOne").text(player_1 + ", It is your turn to pick a column to drop in! ");


    $('.board button').click(function(){
        var col = $(this).closest('td').index();
        var checkBottom_var = checkBottom(col);
        changeColor(checkBottom_var,col,currentColor);
        if(horizontalMatch() || verticalMatch()){
            $('#headOne').text("Player "+currentName + " has won!")
            currentColor = 'rgb(128, 128, 128)';
        }
        else {
            currentPlayer = currentPlayer * -1;
            if (currentPlayer === 1) {
                currentName = player_1;
                currentColor = player_1_color
            } else {
                currentName = player_2;
                currentColor = player_2_color;
            }
            $('#headOne').text(currentName + ", It is your turn to pick a column to drop in! ");
        }
    })

})