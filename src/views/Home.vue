<template>
    <div class="home">
        <div class="container">
            <header class="header">
                <h1>Загрузка файлов</h1>
            </header>

            <select-files-btn @onReadFiles="readFiles" />
            <images-upload :previewList="previewList"/>

        </div>
    </div>
</template>

<script>
import SelectFilesBtn from '@/components/SelectFilesBtn.vue'
import ImagesUpload from '@/components/ImagesUpload.vue'

export default {
    name: 'Home',
    components: { 
        SelectFilesBtn, 
        ImagesUpload 
    },
    data() {
        return {
            files: [],
            previewList: [],
        }
    }, 
    computed: {
        postImageList() {
            return this.$store.getters.postImageList
        }
    },
    watch: {
        postImageList() {
            this.previewList = []
            this.files = []   
        }, 
        previewList: {
            handler() {
                if (this.previewList.length === this.files.length) {
                    setTimeout(() => {
                        this.uploadImages()
                    }, 100)
                }
            },
            deep: true
        }
    },    
    methods: {
        readFiles(event) {
            this.files = [] 
            this.previewList = []
            this.files = Array.from(event.target.files)   
            if (this.files.length > 2) {
                alert('Не больше 2 файлов!')
                return
            }   

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
        uploadImages() {
            this.$store.dispatch('uploadImages', this.files)
        },        
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

</style>
