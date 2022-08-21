<template>
    <li class="post-item">
        <header class="post-header">
            <div 
                class="left"
                :class="{ red: post.postType === 'Aнонс' }"                
            >
                {{ post.postType }}</div>
            <div class="right">{{ getDate(post.id) }}</div>
        </header>

        <main class="post-body">
            <h3 class="title">{{ post.title }}</h3>
            <ul class="image-list">
                <li               
                    v-for="image in post.imageList"
                    class="image-item mr-16"  
                    :key="image.url"
                >
                    <div class="img-block">
                        <img :src="image.url" :alt="image.name">
                    </div>
                </li>
            </ul>
            <div v-html="post.text" class="body"></div>
        </main>

        <footer class="post-footer">
            <button 
                class="btn btn__blue"
                @click="openEditForm"
            >
                Редактировать
            </button>
            <button 
                class="btn btn__red" 
                @click="deletePost"
            >
                Удалить
            </button>
        </footer>
    </li>
</template>

<script>
import moment from 'moment';
import bitesToSize from '@/functions/bitesToSize.js'

export default {
    name: 'PostItem',
    props: ['post'],
    methods: {
        editPost() {
            this.$store.commit('UPDATE_POSTS', this.post)
            this.$router.push('edit-post')
        },
        convertSize(size) {
            return bitesToSize(size)
        },        
        async deletePost() {
            if (confirm('Лена, ты хочешь удалить этот пост?   (°□°) ')) {
                if (this.post.imageList) {
                    this.post.imageList.forEach(image => {
                        this.$store.dispatch('deleteImage', image.name)
                    });
                }
                await this.$store.dispatch('removePost', this.post.id)
            }
        },
        openEditForm() {
            this.$emit('openEditForm')
        },
        getDate(time) {
            moment.locale('ru');
            return moment.unix(time/1000).format('DD.MM.YYYY, HH:mm')
        }       
    }
}
</script>

<style lang="scss" scoped>
.post-item {
    font-size: 18px;

    background-color: rgb(230, 237, 230);
    padding: 5px 15px;
    border-bottom: 1px solid lightgrey;
}
.post-header {
    display: flex;
    justify-content: space-between;
    padding: 5px;
    font-size: 14px;
}
.left {
    &.red {
        color: red;
    }    
}

.post-body {   
}
.title {
    font-size: 20px;    
    text-align: center;
    margin-bottom: 8px;
}
.img-block {
    height: 200px;
    margin-bottom: 16px;
    img {
        height: 100%;
    }
}
.image-list {
    display: flex;
}
.body {
    line-height: 26px;
}

.post-footer {
    display: flex;
    justify-content: space-between; 
    padding: 8px;   
}
.btn {
    font-size: 18px;
    padding: 8px 16px;
    cursor: pointer;
    color: white;
    border: none;
    border-radius: 6px;
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.513);
    &__blue {
        background-color: rgb(59, 85, 214);
    }
    &__red {
        background-color: rgb(213, 74, 74);        
    }
}
</style>