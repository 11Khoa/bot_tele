var express=require("express");



const TelegramBot = require("node-telegram-bot-api");

const TOKEN =process.env.TELEGRAM_TOKEN || "1023567659:AAEGEBYyns1m3Lvcq98aR3wi-Z8Bn3FWP8A",
bot = new TelegramBot(token, {
    polling: true
});

const options = {
    webHook: {
      // Port to which you should bind is assigned to $PORT variable
      // See: https://devcenter.heroku.com/articles/dynos#local-environment-variables
      port: process.env.PORT
      // you do NOT need to set up certificates since Heroku provides
      // the SSL certs already (https://<app-name>.herokuapp.com)
      // Also no need to pass IP because on Heroku you need to bind to 0.0.0.0
    }
  };

  // Heroku routes from port :443 to $PORT
// Add URL of your app to env variable or enable Dyno Metadata
// to get this automatically
// See: https://devcenter.heroku.com/articles/dyno-metadata
const url = process.env.APP_URL || 'https://botkhoa.herokuapp.com:443';
const bot = new TelegramBot(TOKEN, options);


// This informs the Telegram servers of the new webhook.
// Note: we do not need to pass in the cert, as it already provided
bot.setWebHook(`${url}/bot${TOKEN}`);

// Just to ping!
bot.on('message', function onMessage(msg) {
    bot.sendMessage(msg.chat.id, 'I am alive on Heroku!');
  });


// Mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://khoa11:9QZdYw85wRgAEWg1@serverkhoa-teeby.mongodb.net/telegram?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true },function(error){
    if(error){
        console.log("Error MongoDB: " + error);
    }else{
        console.log("MongoDB connected successfully")
    }
});

//module
const addkey=require("./module/addkey.js");// or   "./module/addkey"

bot.onText(/\/add (.+)/,function(msg,match){

    const chatId = msg.chat.id;
    const resp = match[1];

    const newkey= new addkey({
        key: resp,
    });

    //save vaof moongoose
    newkey.save(function(err){
        if(err){
            console.log(err)
        }else{
            console.log("add key successful: " + resp)
            bot.sendMessage(
                chatId,
                "add thành công key: "+ resp,
            )
        }
    });
})

//get info bot
bot
    .getMe()
    .then(function (data) {
        console.log(data);
    })
    .catch(function (err) {
        console.log(err);
    });

const regex = /\w+/g;
const fuck = ["qq", "qc", "chó", "cc"];

bot.on("message", function (message) {
    // Received text message
    console.log(message);
    const str = message.text;
    let m;
    while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        function compare() {
            var result = "";
            m.forEach(arr1 =>
                fuck.forEach(arr2 => {
                    if (arr1 == arr2) {
                        result = "co";
                    }
                })
            );
            return result;
        }
        // console.log(compare().length)
        if (compare().length != 0) {
            bot.sendMessage(
                message.chat.id,
                message.from.first_name +
                " (@" +
                message.from.username +
                ")" +
                "  CHỬI CHỬI CHỬI"
            );
            break;
        }
    }
});

// Matches "/echo [whatever]"
bot.onText(/\/base64 (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
});

bot.onText(/\/about@khoa11_bot/, (msg, match) => {
    const chatId = msg.chat.id,
        ulr_photo =
        "https://scontent.fsgn5-4.fna.fbcdn.net/v/t1.0-9/33092230_373666733143211_6418558388824702976_n.jpg?_nc_cat=104&_nc_ohc=6tj_Oeyon-0AX--Eyv_&_nc_ht=scontent.fsgn5-4.fna&oh=ad873747d6c97c07ee854b7c899224e1&oe=5EC13946",
        caption_custom = '<a href="http://bg.khoand.xyz/">Info</a>';
    // HTML_custom= '<a href="http://bg.khoand.xyz/" target="_blank">Info</a>'
    bot.sendPhoto(
        chatId,
        ulr_photo,
        // {caption: caption_custom},
        // {parse_mode: '<a href="http://www.example.com/">inline URL</a>'},
        {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "Go to info...",
                        url: "https://bg.khoand.xyz/"
                    }]
                ]
            },
            caption: "no caption"
        }
    );
});