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
                    @click="uploadFiles"
                >
                    Загрузить
                </button>
            </div>

            <div class="preview-block">
                <ul class="loaded-list">
                    <li 
                        v-for="image in previewList" 
                        :key="image.url"
                        class="loaded-item"
                    >
                        <img :src="image.url" alt="фотка">
                        <div class="image-filter"></div>
                    </li>                
                </ul>
                <ul class="before-loaded-list">
                    <li
                        v-for="image in previewList" 
                        :key="image.url"
                        class="preview-item"                    
                    >
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
        uploadFiles() {

        }
    }
}
</script>

<style lang="scss" scoped>

.container {
    background-color: rgb(173, 196, 169);
    width: 700px;
    height: 100vh;
    margin: 0 auto;
    padding: 0 16px;
    @media (min-width: $desktop-min) and (max-width: $desktop-max) {
        width: 500px;  
    }     
    @media (min-width: $tablet-min) and (max-width: $tablet-max) {
        width: 400px;
    }     
    @media (max-width: $mobile-max) {
        width: 100%;
    } 
}
.header {
    padding: 8px 0;
}
.btn-block {
    margin-bottom: 16px;
}

.preview-block {
    border: 2px solid rgb(22, 42, 173);
    min-height: 100px;
    padding: 8px 8px 0 8px;
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
.loaded-item img {
    height: 100%;
}
.image-filter {
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(255, 255, 255, 0.7);
    width: 100px;
    height: 100px;
}

.before-loaded-list {
    list-style: none;    
}
</style>
