import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import db from "../../api/firebaseAPI";

const initialState = {
    users:[],
    user:null,
}

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () =>{
    try {
        const usersRef = db.collection('users')
        let usersSnapShot = await usersRef.get()
        let userList = usersSnapShot.docs.map(doc => {
            return {
                id:doc.id,
                ...doc.data()
            }
        })
        return userList

    } catch (error) {
        console.log('Error getting documents', error);
    }
})

export const logInUser = createAsyncThunk("users/logInUser", async (uid) =>{
    try {
        let user = null
        const doc = await db.collection("users").doc(uid).get()
        user = {id:doc.id, ...doc.data()}
        return user
    } catch (error) {
        console.log('Error getting documents', error);
    }
})

const usersSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
        userLoggedIn(state, action) {
            state.user = action.payload
        },
        logOutUser(state, action){
            state.user = null
        },
        updateUserReaction(state, action){
            const {postId,reaction}  = action.payload

            if(state.user?.likedPosts?.[postId]?.hasOwnProperty(reaction)){
               let count = state.user.likedPosts[postId][reaction]
               if(count === 1){
                state.user.likedPosts[postId][reaction] = 0
               }else{
                state.user.likedPosts[postId][reaction] = 1
               }
            }else if(state.user){
                // state.user.likedPosts[postId][reaction] = 1

                state.user.likedPosts =  state.user.likedPosts || {}   
                state.user.likedPosts[postId] =   state.user.likedPosts[postId] || {}
                state.user.likedPosts[postId][reaction] =  state.user.likedPosts[postId][reaction] || {}
                state.user.likedPosts[postId][reaction] = 1
            }
        }
    },
    extraReducers(builder){
        builder.addCase(fetchUsers.fulfilled, (state, action) =>{
           state.users = state.users.concat(action.payload)
        //    return state.users
        })
        .addCase(logInUser.fulfilled, (state, action)=>{
            state.user = action.payload
        })
    }
})

export const {userLoggedIn, logOutUser, updateUserReaction} = usersSlice.actions
export default usersSlice.reducer