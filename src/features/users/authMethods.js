import db, { auth } from '../../api/firebaseAPI'

export const register =  async (username,email, password) =>{

    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password)
        console.log("user", userCredential.user)      
        const user = userCredential.user
        // await db.collection('users').add({
        //     id: user.uid,
        //     name:username,
        //     email:email
        // })
        await db.collection('users').doc(user.uid).set({
            name:username,
            email:email,
        })
        
    } catch (error) {
        console.log("register error", error.message)            
        alert(error.message)
    }
}

export const login = async (email, password) =>{
    try {
        await auth.signInWithEmailAndPassword(email, password)
    } catch (error) {
        console.log("login error", error.message)            
        alert(error.message)
    }
}

export const logout = async()=>{
    try {
        await auth.signOut()
    } catch (error) {
        console.log("logout error", error.message)            
        alert(error.message)
    }
}