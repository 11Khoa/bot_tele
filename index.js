const TelegramBot = require('node-telegram-bot-api');


const token = '1023567659:AAEGEBYyns1m3Lvcq98aR3wi-Z8Bn3FWP8A';
const bot = new TelegramBot(token, {polling: true});


//Mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://khoa11:9QZdYw85wRgAEWg1@serverkhoa-teeby.mongodb.net/book?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true },function(error){
    if(error){
        console.log("Error MongoDB: " + error);
    }else{
        console.log("MongoDB connected successfully")
    }
});

//module
// const Key_rule=require("./module/key_rule.js"); 


//get info bot
bot.getMe()
.then(function(data)
{
    console.log(data);
})
.catch(function(err)
{
	console.log(err);
});


const regex = /\w+/g;
const fuck=['qq','qc','chó'];


bot.on('message', function(message)
{
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
        function compare(){
            var result = '';
            m.forEach((arr1) => fuck.forEach((arr2) => {
                if(arr1==arr2){
                    result = 'co';
                }
            }));
            return result;
        }
        // console.log(compare().length)
        if(compare().length !=0){
            // console.log("nó đã chửi trong câu trên");
            bot.sendMessage(
                message.chat.id,
                message.from.first_name+' (@'+ message.from.username +')' + "  CHỬI CHỬI CHỬI"
            )
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

  bot.onText(/\/base64 (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message
  
    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"
  
    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, resp);
  });





// // Listen for any kind of message. There are different kinds of
// // messages.
// bot.on('message', (msg) => {
//     const chatId = msg.chat.id;
//     const contentId=msg.text
  
//     // send a message to the chat acknowledging receipt of their message
//     bot.sendMessage(chatId, contentId);
// });