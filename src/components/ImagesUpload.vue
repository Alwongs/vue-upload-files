<template>
    <div class="preview-block">               
        <ul v-if="postImageList" class="loaded-list">
            <li 
                v-for="image in postImageList" 
                :key="image.url"
                :class="{ removing: removingImageName === image.name }"
                class="loaded-item"
            >
                <img :src="image.url" alt="фотка">
                <div class="remove-btn" @click="deleteImage(image.name)">&times;</div>
                <div class="loaded-item__info">
                    <span>{{ image.name }}</span>
                    <span>{{ convertSize(image.size) }}</span>
                </div>                        
            </li>                
        </ul>

        <ul v-if="previewList.length" class="before-loaded-list">
            <li
                v-for="image in previewList" 
                :key="image.url"
                class="preview-item"                    
            >
                <div class="progress">
                    <div class="progress-bar"></div>
                </div>
                <span>{{ image.name }}</span>
            </li>
        </ul>
        <a 
            v-if="postImageList.length" 
            href="#" 
            class="remove-all-btn"
            @click.prevent="deleteAllImages"
        >
            Удалить все
        </a>                
    </div>
</template>

<script>
import bitesToSize from '@/funcs/bitesToSize.js'

export default {
    name: 'ImagesUpload',
    props: ['previewList', ''],
    data() {
        return {
            removingImageName: '',
        }
    },     
    computed: {
        postImageList() {
            return this.$store.getters.postImageList
        }
    },   
    methods: {       
        convertSize(size) {
            return bitesToSize(size)
        },        

        async deleteImage(name) {
            this.removingImageName = name
            await this.$store.dispatch('deleteImage', name)
            const imageList = this.postImageList.filter(file => file.name !== name)
            this.$store.commit('UPDATE_POST_IMAGE_LIST', imageList)
            this.removingImageName = ''
        },
        deleteAllImages() {
            for (let image of this.postImageList) {
                this.removingImageName = image.name
                this.deleteImage(image.name)
                this.removingImageName = ''
            }
        }
    }    
}
</script>

<style lang="scss" scoped>

.preview-block {
    border: 2px solid rgb(22, 42, 173);
    min-height: 100px;
    padding: 8px;
}
.loaded-list {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    @media (max-width: $mobile-max) {
        justify-content: space-around;
    } 
}
.loaded-item {
    position: relative;  
    border: 1px solid grey;
    width: 150px;
    height: 150px;
    margin-right: 8px;
    margin-bottom: 8px;
    overflow: hidden;
    @media (min-width: $desktop-min) and (max-width: $desktop-max) {
        width: 150px;
        height: 150px; 
    }     
    @media (min-width: $tablet-min) and (max-width: $tablet-max) {
        width: 150px;
        height: 150px; 
    }     
    @media (max-width: $mobile-max) {
        width: 200px;
        height: 200px; 
    }    
}
.loaded-item.removing {
    transform: scale(0);
    transition: transform .3s;
}
.loaded-item__info {
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 20px;
    font-size: 10px;
    padding: 0 3px;
}
.remove-btn {
    display: flex;
    align-items: center;
    justify-content: center;    
    position: absolute;
    right: 0;
    top: 0;
    background-color: rgba(255, 255, 255, 0.8);
    width: 20px;
    height: 20px;
    font-size: 22px;
    cursor: pointer;
}
.remove-all-btn {
    text-decoration: none;
}
.loaded-item img {  
    height: 100%;
}


.before-loaded-list {
    list-style: none;   
}
.preview-item {
    display: flex;
    justify-content: center;
    margin-bottom: 6px;
    color: rgb(18, 63, 161);
}
.progress {
    border: 2px solid rgb(18, 63, 161);
    width: 150px;
    height: 20px;
    margin-right: 8px;
}
.progress-bar {
    background-color: rgb(18, 63, 161);
    width: 0;
    transition: width .22s;    
    height: 100%;
    color: white;
}
</style>