import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns'

const initialState = {
    posts:[
        {
            id:"1",
            title:"Post 1",
            date: sub(new Date(), { minutes: 10 }).toISOString(),
            content:"This is post one",
            reactions: {
                thumbsUp: 0, 
                hooray: 0, 
                heart:0, 
                rocket:0, 
                eyes:0
            }
        },
        {
            id:"2",
            title:"Post 2",
            date: sub(new Date(), { minutes: 10 }).toISOString(),
            content:"This is post tow",
            reactions: {
                thumbsUp: 0,
                hooray: 0,
                heart:0,
                rocket:0,
                eyes:0
            }
        },
    ],
}

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
        reactionAdded(state, action){
            const {postId, reaction} = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if(existingPost){
                existingPost.reactions[reaction]++
            }
        },
        postUpdated(state, action){
            const {id, title, content} = action.payload
            const existingPost = state.posts.find(post => post.id === id)
            if(existingPost){
                existingPost.title = title
                existingPost.content = content
            }
        }
    }
})

export const {postAdded, postUpdated, reactionAdded} =  postSlice.actions

export default postSlice.reducer