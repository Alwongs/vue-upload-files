<template>
    <div class="create-post">
        <header class="header">
            <h1 class="header__title">Загрузка файлов</h1>
        </header>

        <form action="#" class="form">
            <div class="input-block">
                <input v-model="postType" type="text" placeholder="тип поста">
            </div>
            <div class="input-block">
                <input v-model="eventType" type="text" placeholder="тип события">
            </div>
            <div class="input-block">
                <input v-model="title" type="text" placeholder="заголовок">
            </div>
            <div class="input-block">
                <textarea v-model="text" name="" id="" cols="30" rows="10" placeholder="введите текст"></textarea>
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
            <button class="btn btn-submit" type="submit" @click.prevent="savePost">Сохранить</button>
        </div>
    </div>
</template>

<script>
import SelectFilesBtn from '@/components/SelectFilesBtn.vue'
import ImagesUpload from '@/components/ImagesUpload.vue'
import uploadFilesMixin from '@/mixins/uploadFiles.mixin.js'

export default {
    name: 'CreatePost',
    components: { 
        SelectFilesBtn, 
        ImagesUpload 
    },
    mixins: [uploadFilesMixin],
    data() {
        return {
            postType: '',
            eventType: '',
            title: '',
            text: ''
        }
    },
    computed: {
        getProcessing() {
            return this.$store.getters.getProcessing
        },         
        postImageList() {
            return this.$store.getters.postImageList
        }
    }, 
    methods: {
        async savePost() {
            if (
                this.postType === '' ||
                this.eventType === '' ||
                this.title === '' ||
                this.text === ''
            ) {
                alert('заполните поля!')
                return
            }

            await this.$store.dispatch('savePost', {
                postType: this.postType,
                eventType: this.eventType,
                title: this.title,
                text: this.text,               
                imageList: this.postImageList,                
            });
        
        },        
    }    
}
</script>

<style lang="scss" scoped>

.create-post {
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
