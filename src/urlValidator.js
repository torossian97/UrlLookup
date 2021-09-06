const AWS = require('aws-sdk');
const config = require('../aws-config');

class UrlValidator {

    constructor(hostname, path) {
      this.hostname = hostname;
      this.path = path;

      if(path === undefined) {
        this.hostname = hostname;
        this.path = "";
      }

      /* Check that the URL is valid. With more time, would add individual
       * hostname and path checks for better error reporting.
       */
      let url = this.hostname + "/" + this.path;
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

    getUrlInfo(req, res) {
      AWS.config.update(config.aws_remote_config);
  
      const docClient = new AWS.DynamoDB.DocumentClient();

      try {
        // filter by hostname and url to get safety status.
        const params = {
          TableName: config.aws_table_name,
          FilterExpression: "hostname = :hn and #u = :url",
          ExpressionAttributeNames: {
            "#u": "url",
          },
          ExpressionAttributeValues: {
            ":hn": this.hostname,
            ":url": this.url
          }
        };

        // make the call to dynamoDB.
        docClient.scan(params, function (err, data) {
            if (err) {
                console.log("Unable to scan the table:" + JSON.stringify(err))
                throw ({error: err.statusCode, message: err.message});
            } else {
                const { Items } = data;
                if(Items[0] === undefined) {
                  res.status(404).send({message: "URL was not in DB. Unable to determine safety."}); 
                } else {
                  res.send({
                      url: Items[0].url,
                      safety: Items[0].safety
                  });
                }
            }
        });
      } catch (e) {
        throw ({error: e.statusCode, message: e.message});
      }
    }
}

module.exports = UrlValidator;