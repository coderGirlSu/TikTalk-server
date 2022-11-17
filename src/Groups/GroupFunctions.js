const { Message } = require('../database/schemas/MessagesSchema')
const {Group} = require('../database/schemas/GroupSchema')

// get group message history
async function getHistory(groupDetails){

    let historyResult = await Message.find({groupId: groupDetails.groupId})
    return historyResult
}

// create a group 
async function createGroup(groupDetails){
    let newGroup = new Group({
        userIds: [groupDetails.userId],
        groupName: groupDetails.groupName
    })

    let groupResult = await newGroup.save()

    return groupResult
}

async function getUserGroup(userDetails){
    let userGroups = await Group.find({userIds:userDetails.userId})
    return userGroups
}

// add user to a group
async function addUserToGroup(groupDetails){

    // use friend's email from firebase to get the user id
    let userRecord = await firebaseAdmin.auth().getUserByEmail(groupDetails.userEmail)

    // find the group I want add the uer to from mongoDB
    let userGroup = await Group.findById(groupDetails.groupId) 
    
    // check if user is already in the group
   if (!userGroup.userIds.includes(userRecord.uid)){
    userGroup.userIds.push(userRecord.uid)
    await userGroup.save()
    return userGroup
   }else {
    return {"error":'you can\'t do this! user is already in this group'}
   }
     
    // .then((getUsersResult) => {
    //   console.log('Successfully fetched user data:');
    //   getUsersResult.users.forEach((userRecord) => {
    //     console.log(userRecord);
    //   });
  
    //   console.log('Unable to find users corresponding to these identifiers:');
    //   getUsersResult.notFound.forEach((userIdentifier) => {
    //     console.log(userIdentifier);
    //   });
    // })
    // .catch((error) => {
    //   console.log('Error fetching user data:', error);
    // });
}

async function leaveGroup(userDetails){
    console.log(userDetails)
    let userGroup = await Message.findById({groupId:userDetails.groupId})

    // console.log(userGroup)

    let userRecord = await firebaseAdmin.auth().getUsers(userDetails.userId)

    console.log(userRecord)

    // let Result = await Group.findByIdAndDelete(userRecord.uid)

    return Result
}



module.exports = {
    getHistory,
    createGroup,
    getUserGroup
}
