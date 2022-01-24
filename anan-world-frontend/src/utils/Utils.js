import _ from "lodash";

class Utils {

    shortenSentence(str) {
        const reg = /[\{\}\[\]\/.,;:|\)*~`^\-_+<>@\#$%&\\\=\(\'\"]/gi
        const afterReg = str.replace(reg, '')
        return _.size(afterReg) > 50 ? afterReg.substr(0, 50) + ' ... ' : afterReg
    }

}

export default new Utils()