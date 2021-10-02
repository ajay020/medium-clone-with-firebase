import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import db from '../../api/firebaseAPI';
import firebase from 'firebase';

const initialState = {
    posts:[],
    status:"idle",
    error:null,
    addPostStatus:"idle"
}

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const postCollectionRef = db.collection('posts')
    const postsSnapshot = await postCollectionRef.get()
    const postList = postsSnapshot.docs.map(doc => {
        return {
            id:doc.id,
            ...doc.data()
        }
    })
    return postList
})

export const addNewPost = createAsyncThunk(
    'posts/addNewPost',
    async initialPost => {
        const post = {
            ...initialPost,
            date: new Date().toISOString(),
            reactions:{
                thumbsUp: 0,
                hooray: 0,
                heart: 0,
                rocket: 0,
                eyes: 0,
            },
        }
        // Add a new document with a generated id.
        try {
            const docRef = await db.collection('posts').add(post);
            const doc = await docRef.get()
            console.log('Added document with ID: ', doc.data());     
            return {id:doc.id,...doc.data()}
        } catch (error) {
            console.log('Could not add the documnet : ', error);     
        }
    }
  )

export const updatePost = createAsyncThunk("posts/updatePost", async (post) =>{
    try {
        const {id, title, content} = post
        const docRef = db.collection('posts').doc(id)
        await docRef.update({title, content});
        console.log("Document successfully updated!");
        return post

    } catch (error) {
        // The document probably doesn't exist.
         console.error("Error updating document: ", error);
    }
})  

export const addReaction = createAsyncThunk("posts/addReaction", 
    async ({postId, reaction, uid})=>{
        const increment = firebase.firestore.FieldValue.increment(1)
        const decrement = firebase.firestore.FieldValue.increment(-1)
        let flag = false
        try {
            const docRef = db.collection('posts').doc(postId)

            const userRef = db.collection('users').doc(uid)
            const userObj = await userRef.get()
            // console.log("userObj",userObj.data())
            const user = userObj.data()

            if(!user.hasOwnProperty("likedPosts")){
                await userRef.update({[`likedPosts.${postId}.${reaction}`] : increment})
                await docRef.update({ [`reactions.${reaction}`]:increment })
                flag = true
            }else{
                let count = 0
                //if reaction property is exists 
                if(userObj.data().likedPosts.hasOwnProperty(postId)){
                    if(userObj.data().likedPosts[postId].hasOwnProperty(reaction)){
                        count  = userObj.data().likedPosts[postId][reaction]
                    }
                }

                if(count === 1){
                    await userRef.update({[`likedPosts.${postId}.${reaction}`] : decrement})
                    await docRef.update({ [`reactions.${reaction}`]:decrement })
                    flag = false

                }else{
                    await userRef.update({[`likedPosts.${postId}.${reaction}`] : increment})
                    await docRef.update({ [`reactions.${reaction}`]:increment })
                    flag = true
                }
                // console.log(count)
            }

            console.log("emotions added successfully ");
            return {postId, reaction, flag}
        } catch (error) {
            console.error("Error adding emotions: ", error);
        }
})

export const deletePost = createAsyncThunk("posts/deletePost", async (postId) =>{
    try {
         await db.collection("posts").doc(postId).delete()
         console.error("Post Deleted!");
         return postId
    } catch (error) {
        console.error("Error deleting post: ", error);
    }
})

export const postSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{
        postAdded :{ 
                reducer(state, action){
                    state.posts.push(action.payload)
                },
                prepare(title, content, userId){
                    return {
                        payload: {
                            id:nanoid(),
                            date:new Date().toISOString(),
                            title, 
                            content,
                            user:userId,
                            reactions: {
                                thumbsUp: 0, 
                                hooray: 0, 
                                heart:0, 
                                rocket:0, 
                                eyes:0
                            }
                        }
                    }
                }
        },
        reactionSaved(state, action){
            const {postId, reaction, flag} = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            
            // console.log("flag", flag)
            if(existingPost){
                if(flag){
                    existingPost.reactions[reaction]--
                }else{
                    existingPost.reactions[reaction]++
                }
            }
        },
        // reactionAdded(state, action){
        //     const {postId, reaction} = action.payload
        //     const existingPost = state.posts.find(post => post.id === postId)
        //     if(existingPost){
        //         existingPost.reactions[reaction]++
        //     }
        // },
        // postUpdated(state, action){
        //     const {id, title, content} = action.payload
        //     const existingPost = state.posts.find(post => post.id === id)
        //     if(existingPost){
        //         existingPost.title = title
        //         existingPost.content = content
        //     }
        // }
    },
    extraReducers(builder){
        builder
        .addCase(fetchPosts.pending, (state, action)=>{
            state.status = 'loading'
        })
        .addCase(fetchPosts.fulfilled, (state, action) =>{
            state.status = "successed"
            state.posts = state.posts.concat(action.payload)
        })
        .addCase(fetchPosts.rejected, (state, action) =>{
            state.status = 'rejected'
            state.error = action.error.message
        })
        .addCase(addNewPost.pending,(state, action)=>{
            state.addPostStatus = "loading"
        })
        .addCase(addNewPost.fulfilled, (state, action) =>{
            state.addPostStatus = "successed"
            state.posts.push(action.payload)
        })
        .addCase(addNewPost.rejected, (state,action)=>{
            state.addPostStatus = 'rejected'
            state.error = action.error.message
        })
        .addCase(updatePost.fulfilled, (state, action) =>{
            const existingPost = state.posts.find(post =>  post.id === action.payload.id)
            if(existingPost){
                existingPost.title = action.payload.title
                existingPost.content = action.payload.content
            }
            // return state.posts
        })
        .addCase(addReaction.fulfilled, (state, action) =>{
            // const {postId, reaction,flag} = action.payload
            // const existingPost = state.posts.find(post => post.id === postId)
            // if(existingPost){
            //     if(flag){
            //         existingPost.reactions[reaction]++
            //     }else{
            //         existingPost.reactions[reaction]--
            //     }
            // }
        })
        .addCase(deletePost.fulfilled, (state, action) =>{
            console.log("Deleted postid",action.payload);
            state.posts = state.posts.filter(post => post.id !== action.payload)
        })

    }
})

export const {postAdded, postUpdated, reactionSaved} =  postSlice.actions

export default postSlice.reducer

//Selector functions
//select all posts
export const selectAllPosts = (state) => state.posts.posts
export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId)