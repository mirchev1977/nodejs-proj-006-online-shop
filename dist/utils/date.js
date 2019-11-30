"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function dateHRtoUnix(prodDate) {
    let regex = '(?<DD>(?:0[1-9])|(?:[12][0-9])|(?:3[01]))';
    regex += '\\s*\.\\s*';
    regex += '(?<MM>(?:0[1-9])|(?:1[012]))';
    regex += '\\s*\.\\s*';
    regex += '(?<YYYY>(?:19\\d{2})|(?:2\\d{3}))';
    let regExp = new RegExp(regex);
    let match = prodDate.toString().match(regExp);
    if (!match) {
        throw new Error('the prodDate should be in the format dd.mm.yyyyy');
    }
    let dt = new Date(`${match.groups.YYYY}-${match.groups.MM}-${match.groups.DD}`);
    const utime = dt.getTime();
    if (Number.isNaN(utime))
        throw new Error('prodDate should be number');
    if (typeof utime !== 'number')
        throw new Error('prodDate should be number');
    return utime.toString();
}
exports.dateHRtoUnix = dateHRtoUnix;
function unixToDateHR(utime) {
    let dt = new Date(utime);
    let dd = dt.getDate();
    let mm = dt.getMonth() + 1; //January is 0!
    let yyyy = dt.getFullYear();
    let strDD = dd.toString();
    if (dd < 10) {
        strDD = '0' + dd;
    }
    let strMM = mm.toString();
    if (mm < 10) {
        strMM = '0' + mm;
    }
    return strDD + '.' + strMM + '.' + yyyy;
}
exports.unixToDateHR = unixToDateHR;
//# sourceMappingURL=date.js.map