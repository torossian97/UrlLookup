class UrlValidator {

    constructor(hostname, path) {
      this.hostname = hostname;

      if(path === undefined) {
        this.hostname = hostname;
        this.path = "";
      } else {
        this.path = path;
      }



      let url = this.hostname.concat(this.path);
      if(!this.validURL(url)) {
        throw ({error: 400, message: "Invalid URL."});
      }

      this.url = url;
    }

    // credit: https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
    validURL(url) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(url);
      }
}

module.exports = UrlValidator;