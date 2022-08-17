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
                multiple
                @change="readImages"
                >
                <button class="upload">Загрузить</button>
            </div>
            <ul class="preview-block">
                <li 
                v-for="image in imageList" 
                :key="image.url"
                class="preview-item"
                >
                <img :src="image.url" alt="фотка">
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Home',
    data() {
        return {
            imageList: [],
            files: []
        }
    },
    components: {

    },
    methods: {
        readImages(event) {
            this.files = Array.from(event.target.files)      
            console.log(this.files)
        }
    }
}
</script>

<style lang="css" scoped>

.container {
  background-color: rgb(173, 196, 169);
  width: 500px;
  height: 100vh;
  margin: 0 auto;
  padding: 0 16px;
}

.header {
  padding: 8px 0;
}
.btn-block {
  margin-bottom: 16px;
}
.preview-block {
  border: 1px solid grey;
  min-height: 150px;;
}
</style>
