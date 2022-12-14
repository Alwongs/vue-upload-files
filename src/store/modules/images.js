import getFileExt from '@/functions/getFileExt.js'

import { 
    getStorage, 
    ref as stRef, 
    getDownloadURL, 
    uploadBytesResumable, 
    deleteObject
} from "firebase/storage"

export default {
    getters: {
        postImageList(state) {
            return state.postImageList
        },
    },
    state: {
        postImageList: [],
    },
    mutations: {
        UPDATE_POST_IMAGE_LIST(state, payload) {
            state.postImageList = payload
        },
    },
    actions: {        
        uploadImages({getters, commit}, files) {
            let imageList = []
            const previewBlock = document.querySelector('.before-loaded-list')
            const storage = getStorage()

            files.forEach((file, index) => {

                const ext = getFileExt(file)
                const name =  (Math.random()*1e32).toString(36)
                const newFileName = name + ext                

                const storageRef = stRef(storage, `images-test/${newFileName}`)
                const uploadTask = uploadBytesResumable(storageRef, file)
                const progressBar = previewBlock.querySelectorAll('.progress-bar')[index]     

                uploadTask.on('state_changed', (snapshot) => {
                    const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0)
                    progressBar.style.width = progress + '%'
                    progressBar.textContent = progress + '%'

                }, (error) => {
                    console.log(error)
                }, () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        const image = {
                            name: newFileName,
                            size: file.size,
                            url: downloadURL
                        }
                        imageList.push(image)

                        if (imageList.length === files.length) {
                            const oldImageList = getters.postImageList
                            const newImageList = [...oldImageList, ...imageList]

                            setTimeout(() => {                                
                                commit('UPDATE_POST_IMAGE_LIST', newImageList)
                            }, 500)                          
                        }
                    })                   
                }) 
            }) 
        },

        async deleteImage(_, imageName) {
            const storage = getStorage();  
            const desertRef = stRef(storage, `images-test/${imageName}`);
            
            await deleteObject(desertRef).then(() => {

              console.log('successfully deleted: ' + imageName)
            }).catch((error) => {

              console.log(error)
            }); 
        }
    }  
}