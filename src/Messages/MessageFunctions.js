const {Message} = require('../database/schemas/MessagesSchema')

// create a new message
async function sendMessage(userMessage){
    try{
        // create a mongoose JS object
        let newMessage = new Message({ // create a new instance of message from MessagesSchema
            message: userMessage.message,
            senderId: userMessage.senderId,
            groupId: userMessage.groupId,
            senderName: userMessage.senderName
        })
        let messageResult = await newMessage.save()
        return messageResult
    }catch(error){
        return {error: error}
    }
}

module.exports = {
    sendMessage
}