function dscount(str, s1, s2) {

    var dsCnt = 0;
    var firstCompare = false;
    str = str.toLowerCase();
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    for (var i = 0; i < str.length; i++) {
        if (firstCompare && str[i] === s2) {
            dsCnt++;
            firstCompare = false;
        } else if (str[i] === s1) {
            firstCompare = true;
        } else {
            firstCompare = false;
        }
    }

    return dsCnt;
}

module.exports = dscount;