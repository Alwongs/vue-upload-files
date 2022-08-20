<template>
    <div class="btn-block">
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

.btn-block {
    padding: 16px 0; 
    margin-bottom: 16px;
}
.btn {
    background-color: rgb(234, 242, 255);
    border: none;
    border-radius: 4px;
    box-shadow: 1px 1px 3px 2px rgba(0, 0, 0, 0.521);
    height: 40px;
    width: 120px;
    cursor: pointer;
}
</style>