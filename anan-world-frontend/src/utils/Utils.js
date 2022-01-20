import moment from "moment";
import _ from "lodash";

class Utils {

    getDateDiff(date) {
        const diff = moment().diff(date, 'minutes')
        if(diff < 5)
            return '방금 전'
        if(diff < 60)
            return diff+'분 전'
        if(diff < 60*24)
            return moment().diff(date, 'hours') + '시간 전'
        return moment(date).format("YYYY년 MM월 DD일")
    }

    shortenSentence(str) {
        const reg = /[\{\}\[\]\/.,;:|\)*~`^\-_+<>@\#$%&\\\=\(\'\"]/gi
        const afterReg = str.replace(reg, '')
        return _.size(afterReg) > 50 ? afterReg.substr(0, 50) + ' ... ' : afterReg
    }

}

export default new Utils()