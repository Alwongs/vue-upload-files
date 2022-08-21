import { getDatabase, set, ref, child, get, update, remove } from "firebase/database"
import sortList from '../../functions/sort.js'

export default {

    getters: {
        limitedPostList(state) {
            return state.postList.slice(0, 3);
        },
        postList(state) {
            return state.postList;
        },
        post(state) {
            return state.post;
        },
    },
    state: {
        postList: [],
        post: {},
    },
    mutations: {
        UPDATE_POSTS(state, payload) {
            state.postList = payload
        },
        UPDATE_POST(state, payload) {
            state.post = payload
        },
    },
    actions: {
        async removePost({commit, dispatch}, id) {
            
            const postId = id;
            const db = getDatabase();
            commit('SET_PROCESSING', true);
            await remove(ref(db, `posts/${postId}`));
            await dispatch('getPostList');
            commit('SET_PROCESSING', false);
        },

        async getPostList({commit}) { 
            commit('SET_PROCESSING', true);
            const dbRef = ref(getDatabase());

            await get(child(dbRef, `posts`)).then((data) => {
                if (data.exists()) {
                    const posts = data.val()                 
                    const postArray = Object.keys(posts).map(key => ({...posts[key], id: key}));
                    const sortedPostList = sortList(postArray)                    
                    commit('UPDATE_POSTS', sortedPostList);
                    commit('SET_PROCESSING', false);
                } else {
                    commit('UPDATE_POSTS', [])
                    commit('SET_PROCESSING', false);
                }
            }).catch((error) => {
                console.error(error);
            });
        },   

        async getPost({commit}, id) { 
            commit('SET_PROCESSING', true);
            const dbRef = ref(getDatabase());

            await get(child(dbRef, `posts/${id}`)).then((data) => {
                if (data.exists()) {
                    const post = data.val()                      
                    commit('UPDATE_POST', post);
                    commit('SET_PROCESSING', false);
                } else {
                    commit('UPDATE_POST', {})
                    commit('SET_PROCESSING', false);
                }
            }).catch((error) => {
                console.error(error);
            });
        },    
 
        async savePost({commit, dispatch}, post) { 
            commit('SET_PROCESSING', true);
            const postId = Date.now();
            const db = getDatabase();

            await set(ref(db, `posts/${postId}`), post);
            dispatch('getPostList');   
            commit('SET_PROCESSING', false);            
        },
        
        async updatePost({commit}, post) {
            try {              
                const db = getDatabase();
                const updates = {};
                updates[`posts/${post.id}`] = post;

                return await update(ref(db), updates);
            } catch (e) {
                commit('SET_ERROR', e)
                throw e                
            }                
        },
    }   
}
