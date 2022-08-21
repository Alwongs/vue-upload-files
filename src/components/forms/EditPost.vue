<template>
    <div class="edit-post">
        <header class="header">
            <h1 class="header__title">Загрузка файлов</h1>
        </header>

        <form action="#" class="form">
            <div class="input-block">
                <input v-model="post.postType" type="text" placeholder="тип поста">
            </div>
            <div class="input-block">
                <input v-model="post.eventType" type="text" placeholder="тип события">
            </div>
            <div class="input-block">
                <input v-model="post.title" type="text" placeholder="заголовок">
            </div>
            <div class="input-block">
                <textarea v-model="post.text" name="" id="" cols="30" rows="10" placeholder="введите текст"></textarea>
            </div>
        </form>

        <select-files-btn @onReadFiles="readFiles" />

        <images-upload 
            :previewList="previewList"
            class="image-block" 
        />

        <h1 v-if="getProcessing">Loading...</h1>
        <div class="btn-block">
            <button class="btn mr-16" @click="$emit('closeForm')">Закрыть</button>
            <button class="btn btn-submit" type="submit" @click.prevent="updatePost">Сохранить</button>
        </div>
    </div>
</template>

<script>
import SelectFilesBtn from '@/components/SelectFilesBtn.vue'
import ImagesUpload from '@/components/ImagesUpload.vue'
import uploadFilesMixin from '@/mixins/uploadFiles.mixin.js'

export default {
    name: 'EditPost',   
    components: { 
        SelectFilesBtn, 
        ImagesUpload 
    },
    props: ['postForEdit'],     
    mixins: [uploadFilesMixin],
    data() {
        return {
            post: this.postForEdit
        }
    },
    computed: {
        getProcessing() {
            return this.$store.getters.getProcessing
        },         
        postImageList() {
            return this.$store.getters.postImageList
        },
    }, 
    methods: {
        async updatePost() {

            this.post.imageList = this.postImageList
            if (
                this.post.title === '' ||
                this.post.text === ''
            ) {
                alert('заполните поля!')
                return
            }            
            this.$store.commit('SET_PROCESSING', true);
            await this.$store.dispatch('updatePost', this.post);
            this.$store.commit('SET_PROCESSING', false);            

        },        
    } ,

    mounted() {

    }    
}
</script>

<style lang="scss" scoped>

.edit-post {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;    
    background-color: rgb(173, 196, 169);
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

.input-block {
    margin-bottom: 8px;
}
.image-block {
    margin-bottom: 16px;
}
.btn-block {
    text-align: end;
}
.btn-submit {
    background-color: rgb(20, 161, 102);
    font-size: 16px;
    color: white;
}
</style>
