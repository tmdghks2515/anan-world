class Utils {

    shortenSentence(str) {
        const tagRemoved = str.replaceAll(/(<([^>]+)>)/gi, '');
        const ssRemoved = tagRemoved.replace(/[\{\}\[\]\/.,;:|\)*~`^\-_+<>@\#$%&\\\=\(\'\"]/gi, '')
        return ssRemoved.length < 150 ? ssRemoved : ssRemoved.substr(0, 150) + '...'
    }

}

export default new Utils()