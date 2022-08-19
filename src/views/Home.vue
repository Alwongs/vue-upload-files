<template>
    <div class="home">
        <div class="container">
            <header class="header">
                <h1>Загрузка файлов</h1>
            </header>

            <div class="btn-block">
                <input 
                    type="file" 
                    name="file" 
                    accept="image/*"
                    multiple
                    @change="readFiles"
                >
                <button 
                    class="upload"
                    @click="uploadImages"
                >
                    Загрузить
                </button>
            </div>

            <div class="preview-block">
               
                <ul v-if="postImageList" class="loaded-list">
                    <li 
                        v-for="image in postImageList" 
                        :key="image.url"
                        class="loaded-item"
                    >
                        <img :src="image.url" alt="фотка">
                        <div class="remove-btn" @click="deleteImage(image.name)">&times;</div>                        
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
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Home',
    data() {
        return {
            files: [],
            previewList: [],
        }
    },
    computed: {
        previewImageList() {
            return this.$store.getters.previewImageList
        },
        postImageList() {
            return this.$store.getters.postImageList
        }
    },
    watchEffect: {
        postImageList() {
            if (this.postImageList.length === this.files.length) {
                this.previewList = []
                this.files = []                 
            }
        },
        previewList(oldVal, newVal) {
            console.log(oldVal.length + ' and ' + newVal.length)
            if (this.previewList.length === this.files.length) {
                this.uploadImages()                
            }
        }
    },  
    methods: {
        readFiles(event) {
            this.files = [] 
            this.previewList = []
            this.files = Array.from(event.target.files)      

            this.files.forEach(file => {
                if (!file.type.match('image')) {
                    return
                }
                const reader = new FileReader()
                            
                reader.onload = ev => {
                    const url = ev.target.result
                    this.previewList.push({
                        name: file.name,
                        size: file.size,
                        url: url
                    })     
                }
                reader.readAsDataURL(file)
            })

        },

        async uploadImages() {
            await this.$store.dispatch('uploadImages', this.files)
        },
        async deleteImage(name) {
            await this.$store.dispatch('deleteImage', name)
            const imageList = this.postImageList.filter(file => file.name !== name)
            this.$store.commit('UPDATE_POST_IMAGE_LIST', imageList)
        }
    }
}
</script>

<style lang="scss" scoped>

.container {
    background-color: rgb(173, 196, 169);
    width: 1000px;
    height: 100vh;
    margin: 0 auto;
    padding: 0 16px;
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
}
.btn-block {
    padding: 16px 0; 
    margin-bottom: 16px;
}

.preview-block {
    border: 2px solid rgb(22, 42, 173);
    min-height: 100px;
    padding: 8px;
}
.loaded-list {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
}
.loaded-item {
    position: relative;  
    border: 1px solid grey;
    width: 100px;
    height: 100px;
    margin-right: 8px;
    margin-bottom: 8px;
    overflow: hidden;
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
