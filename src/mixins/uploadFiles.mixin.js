export default {

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