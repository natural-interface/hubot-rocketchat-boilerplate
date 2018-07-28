// Description:
//    This is a template script to fetch API URL
// 
//


module.exports = (robot) => {
  robot.respond(/(.*)/i, (res) => {
    console.log('QUESTION ASKED : '+ res.match[1]);
    question = res.match[1];
    // You may send several parameters : Ex :joe,jack,john
    var inputs = question.split(',');
    var param = ''; 
    var url = process.env.API_URL;
    var rapidAPI_url = process.env.RAPIDAPI_URL;
    var rapidAPI_key = process.env.RAPIDAPI_KEY;

    var arrayLength = inputs.length;
    for (var i = 0; i < arrayLength; i++) {
      if (i > 0){
        param = `%2C${param}${inputs[i]}`;
      }
    }

    const fetch_url = url.replace('params', param);
      robot.http(fetch_url)
      .header("X-Mashape-Key", rapidAPI_key)
      .header("X-Mashape-Host", rapidAPI_url)
      .get() ((err, response, body) => {
        if (err) {
          console.log(err);
          res.reply(`I got a problem. Please try later...`)
        }
        console.log(body);
        jsonData = JSON.parse(body);
        var message = '';
        for(i=0;i<jsonData.length;i++) {
            var title = jsonData[i].%%JSON_FIELDS%%;
            console.log(`${%%JSON_FIELDS%%}`);
            message = message + `${%%JSON_FIELDS%%}\n`
        }
        console.log(`ANSWER : ${message}`);
        res.reply(`${message}`)
      })
    
  })
}