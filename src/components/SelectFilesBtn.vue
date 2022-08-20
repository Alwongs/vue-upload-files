<template>
    <div class="btn-upload-block">
        <button 
            class="btn trigger-btn" 
            @click.prevent="triggerUpload"
        >
            Выбрать фото
        </button>
        <input 
            type="file" 
            name="file" 
            ref="fileInputCreate"
            style="display:none;"                    
            accept="image/*"
            multiple
            @change="readFilesHandler"
        >
    </div>  
</template>

<script>
export default {
    name: 'SelectFilesBtn',
    methods: {
        triggerUpload() {
            this.$refs.fileInputCreate.click();
        },  
        readFilesHandler(event) {
            this.$emit('onReadFiles', event)
        }
    }
}
</script>

<style lang="scss" scoped>

.btn-upload-block {
    padding: 16px 0; 
    margin-bottom: 16px;
}

</style>