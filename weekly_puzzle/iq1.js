// JavaScript Array permutation generator
// (optimized from CoffeeScript output: see ArrayPermutation.coffee)
(function() {
  var generatePermutation = function(perm, pre, post, n) {
    var elem, i, rest, len;
    if (n > 0)
      for (i = 0, len = post.length; i < len; ++i) {
        rest = post.slice(0);
        elem = rest.splice(i, 1);
        generatePermutation(perm, pre.concat(elem), rest, n - 1);
      }
    else
      perm.push(pre);
  };

  /*
  extend Array.prototype
  e.g. [0, 1, 2].permutation(2)
  => [[0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1]]
  */
  Array.prototype.permutation = function(n) {
    if (n == null) n = this.length;
    var perm = [];
    generatePermutation(perm, [], this, n);
    return perm;
  };
})();

var max=function(a,b){
    if(a<b){
        return b
    }else if(b<a){
        return a
    }
}

var min=function(a,b){
    if(a<b){
        return a
    }else if(b<a){
        return b
    }
}

var calc=function(n){
    var res = 0;
    var allArray = new Array()
    for(var i=0;i<n-1;i+=1){
        allArray[i] = i
    }
    var permArray = new Array();

    //選び方の全パターン
    //nで始まって、nで終わるとしても一般性を失わない
    permArray = allArray.permutation(n-1);

    for(var k=0;k<permArray.length-1;k+=1){
        permArray[k].unshift(n-1);
        permArray[k].push(n-1);
        //console.log(permArray[k])

        //各選び方に対して、線分を羅列
        // n個の点に対しては、n個の線分ができる
        var lineArray = new Array();

        for(var j=0;j<n;j+=1){
            //なにをpushするか
            //console.log("pushing")
            //console.log([max(permArray[k][j], permArray[k][j+1]), min(permArray[k][j], permArray[k][j+1])]);

            //線分の表記方法は、[大, 小]とする
            lineArray.push([max(permArray[k][j], permArray[k][j+1]), min(permArray[k][j], permArray[k][j+1])]);

            //pushして、その結果何個の交点が生じるかを計算
            for(var l=0;l<j;l+=1){
                //console.log("compare")
                //console.log(lineArray[l] , lineArray[j])

                if(lineArray[l][0] <= lineArray[j][1]){
                    res +=0;
                }else if(lineArray[l][1] >= lineArray[j][0]){
                    res +=0;
                }else if(lineArray[l][1] == lineArray[j][1]){
                    res +=0;
                }else if(lineArray[l][0] == lineArray[j][0]){
                    res +=0;
                }else if(lineArray[l][0] > lineArray[j][1]){
                    if(lineArray[l][1] < lineArray[j][0]){
                        if(lineArray[l][0] > lineArray[j][0]){
                            res +=1;   
                        }
                    }
                }else if(lineArray[l][1] < lineArray[j][0]){
                    if(lineArray[l][0] > lineArray[j][1]){
                        if(lineArray[l][0] > lineArray[j][0]){
                            res +=1;
                        }
                    }
                }else{
                    res +=0;
                }
            }
        }
    }
    return res;
};


var main=function(){
    var s=readline();
    if(s==3){
        console.log(0);
    }else{
        console.log(calc(s));
    };
};

/// IO ///
if(typeof process!=='undefined'){
    //node.js
    var print=function(x){
        console.log(x);
    }
    var readline=(function(){
        var T=[],cnt=0;
        var stdin = process.openStdin();
        stdin.setEncoding('utf8');
        var input_fragment="";
        stdin.on('data', function(input) {
            var ref=(input_fragment+input).split("\n");
            input_fragment=ref.pop();
            for(var i=0;i<ref.length;i++){
                if(ref[i]=='')continue;
                T.push(ref[i]);
            }
        });
        stdin.on('end', function(z) {
            if(input_fragment){
                var ref=(input_fragment+"\n").split("\n");
                input_fragment=ref.pop();
                for(var i=0;i<ref.length;i++){
                    if(ref[i]=='')continue;
                    T.push(ref[i]);
                }
            }
            main();
        });
        return function(){
            if(T.length<=cnt)return null;
            return T[cnt++];
        };
    })();
}else{
    //v8
    main();
}