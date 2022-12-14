const firebaseAdmin = require('firebase-admin')
const {getAuth, signInWithEmailAndPassword} = require ("firebase/auth")

// user sign up
async function signUpUser(userDetails) {
    try{
        let newUser = await firebaseAdmin.auth().createUser({
            email: userDetails.email,
            emailVerified: true,
            password: userDetails.password,
            displayName: userDetails.displayName
        })
        //await firebaseAdmin.auth().setCustomUserClaims(newUser.uid, {regularUser: true}
        return newUser
    }catch(e){
        if(e.code == "auth/email-already-exists"){
            return{
                error: "A user already exists with this email"
            }
        }
        if(e.code == "auth/invalid-password"){
            return {
                error: "Invalid password, the password must be at least 6 characters."
            }
        }
        if(e.code == "auth/invalid-email") {
            return {
                error: "Invalid email address."
            }
        }
        return {error:e}
    }
    
}

// user sign in
async function signInUser(userDetails){
    try{
        const auth = getAuth() 
        let signInResult = await signInWithEmailAndPassword(auth, userDetails.email, userDetails.password)
        return signInResult
    } catch(e){
        if (e.code == "auth/wrong-password") {
            return {
                error: "Wrong password was entered"
            }
        }
        if (e.code == "auth/user-not-found"){
            return {
                error: "User not found"
            }
        }
        if(e.code == "auth/internal-error"){
            return {
                error: "Invalid password"
            }
        }
        if(e.code == "auth/invalid-email"){
            return {
                error: "Invalid email"
            }
        }
        return {error:e}
    }
    
}

// create a validate token function to verify the user token 
async function validateToken(token, res){
    try {
        let jwt = token.split(" ")[1] // remove Bearer before token
        let result = await firebaseAdmin.auth().verifyIdToken(jwt, true)
        return result
    } catch(e)
     {
        res.status(400).json({"error": "invalid token"})
        return null
     }
}

module.exports = {
    signUpUser, signInUser, validateToken
}