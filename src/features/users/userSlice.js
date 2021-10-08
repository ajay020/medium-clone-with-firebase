import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import db from "../../api/firebaseAPI";

const initialState = {
    users:[],
    user:null,
    userStatus:"idle",
    favoritePosts:[]
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

export const logInUser = createAsyncThunk("users/logInUser", async ({uid}) =>{
    try {
        // console.log("login uid", uid)
        let user = null
        const doc = await db.collection("users").doc(uid).get()
        user = {id:doc.id, ...doc.data()}
        return user
    } catch (error) {
        console.log('Error getting documents', error);
    }
})

export const addFavourites = createAsyncThunk("users/addFavourites", async({uid, postId, marked}) =>{
    try {
        console.log("marked", marked)
        if(marked){
            try {
                const docRef = db.collection("users").doc(uid).collection("favouritePosts")
                                .where("postId","==",postId);
                const querySnapShot = await docRef.get()
                querySnapShot.forEach(doc => doc.ref.delete())

                console.log("Deleted favourite list")

            } catch (error) {
                console.log(error)                
            }
        }else{
            await db.collection("users").doc(uid).collection("favouritePosts").add({"postId":postId})
            console.log("added into favourite list")
        }
        return {postId, marked}
    } catch (error) {
        console.error("Error adding document: ", error);
    }
})

export const fetchFavouritePosts = createAsyncThunk("users/fetchFavouritePosts", async ({uid}) =>{
    try {
        // console.log("uid", uid)
        const postSnapshots = await db.collection("users").doc(uid).collection("favouritePosts").get()

        // console.log("favposts", postSnapshots)
        const favourites =  postSnapshots.docs.map(doc => ({...doc.data()}) ) 
        // console.log("favourites", favourites)

        return favourites;

    } catch (error) {
        console.log(error.message)
        // return [error.message]
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
        },
    },
    extraReducers(builder){
        builder.addCase(fetchUsers.fulfilled, (state, action) =>{
           state.users = state.users.concat(action.payload)
        //    return state.users
        })
        .addCase(logInUser.pending, (state, action) =>{
            state.userStatus = "loading"
        })
        .addCase(logInUser.fulfilled, (state, action)=>{
            state.user = action.payload
            state.userStatus = "successed"
        })
        .addCase(logInUser.rejected, (state, action) =>{
            state.userStatus = "rejected"
        })
        .addCase(fetchFavouritePosts.fulfilled, (state, action) =>{
            state.favoritePosts = state.favoritePosts.concat(action.payload)
        })
        .addCase(fetchFavouritePosts.rejected, (state, action)=>{
            console.log("Couldn't fetch favourite posts")
        })
        .addCase(addFavourites.fulfilled, (state, action)=>{
            const {postId, marked} = action.payload
            if(marked){
                state.favoritePosts = state.favoritePosts.filter(item => item.postId !== postId)
            }else{
                state.favoritePosts = [...state.favoritePosts, {postId}]
            }
        })
    }
})

export const {userLoggedIn, logOutUser, updateUserReaction} = usersSlice.actions
export default usersSlice.reducer