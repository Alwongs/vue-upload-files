<template>
    <div class="home">
        <div class="container">
            <header class="header">
                <h1 class="header__title">Список постов</h1>
            </header>
            <main>
            <button 
                v-if="!isCreateFormOpen" 
                class="btn btn-opener"
                @click="openCreateForm"
            >
                + Добавить пост
            </button> 

            <h2>Посты:</h2>
            <ul v-if="postList" class="post-list">
                <post-item 
                    v-for="post in postList" 
                    :key="post.id"
                    :post="post"
                    class="post-item-block"
                    @openEditForm="openEditForm(post)"
                />
            </ul>
            <p v-else>Список пуст..</p>
            </main>
        </div>
        <create-post 
            v-if="isCreateFormOpen"
            @closeForm="isCreateFormOpen = false"
        />
        <edit-post 
            v-if="isEditFormOpen"
            :postForEdit="post"
            @closeForm="isEditFormOpen = false"
        />
    </div>
</template>

<script>
import PostItem from '@/components/PostItem.vue';
import CreatePost from '@/components/forms/CreatePost.vue';
import EditPost from '@/components/forms/EditPost.vue';

export default {
    name: 'HomePage',
    components: { 
        PostItem,
        CreatePost,
        EditPost
    },   
    data() {
        return {
            isCreateFormOpen: false,
            isEditFormOpen: false,
            post: {},
        }
    },
    computed: {
        userId() {
            return this.$store.getters.userId;
        },
        postList() {
            return this.$store.getters.postList;
        },
    },
    methods: {
        openCreateForm() {
            
            this.isCreateFormOpen = true;
        },
        closeCreateForm() {
            this.isCreateFormOpen = false;            
        },

        openEditForm(post) {
            console.log(post.imageList)
            this.$store.commit('UPDATE_POST_IMAGE_LIST', post.imageList)
            this.post = post
            this.isEditFormOpen = true;
        },
        closeEditForm() {
            this.isEditFormOpen = false;            
        },
    } ,
    async mounted() {
        await this.$store.dispatch('getPostList')
    }    
}
</script>

<style lang="scss" scoped>

.container {
    background-color: rgb(173, 196, 169);
    width: 1000px;
    height: 100vh;
    margin: 0 auto;
    padding: 0 32px;
    @media (min-width: $desktop-min) and (max-width: $desktop-max) {
        width: 900px;  
    }     
    @media (min-width: $tablet-min) and (max-width: $tablet-max) {
        width: 700px;
    }     
    @media (max-width: $mobile-max) {
        width: 100%;
    } 
}
.header {
    padding: 16px 0; 
    margin-bottom: 16px;  
    &__title {
        text-align: center;
    }
}

</style>
