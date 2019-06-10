var convert = function(s, numRows) {
        if(s.length <= numRows)return s;
        var result = [];
        var x = 0;
        var y = 0;
        var loop = 0;
        while(loop < s.length){
            if(!result[y]) result[y] = [];
            if(y === numRows){
               y = connection(y);
            }else{
                result[y][x] = s[loop];
            }        
            y++;
            loop++;
        }
        
        function connection(y){
            while(true){            
                x++;
                y--; 
                loop ++;
                result[y][x] = s[loop];
                if(y === 0){
                    break;
                }
            }
                    
            return y;
        }
        
        return result.map(function(item){return item.join('')}).join('');
        
    };

console.log(convert("PAYPALISHIRING",3));