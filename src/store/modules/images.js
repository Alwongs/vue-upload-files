
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
            return state.postImageList;
        },
        isAbleUploadButton(state) {
            return state.isAbleUploadButton
        }
    },
    state: {
        postImageList: [],
        isAbleUploadButton: true
    },
    mutations: {
        UPDATE_POST_IMAGE_LIST(state, payload) {
            state.postImageList = payload
        },
        ENABLE_UPLOAD_BUTTON(state, payload) {
            state.isAbleUploadButton = payload
        },
    },
    actions: {        
        uploadImages({commit}, files) {
            commit('ENABLE_UPLOAD_BUTTON', false) 
            const preview = document.querySelector('.preview-group')
            const storage = getStorage()
            let counter = 0
            let imageList = []

            files.forEach((file, index) => {

                const progressBlock = preview.querySelectorAll('.preview-progress-info')[index]

                const storageRef = stRef(storage, `images/${file.name}`)
                const uploadTask = uploadBytesResumable(storageRef, file)
                
                uploadTask.on('state_changed', 
                (snapshot) => {
                    const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0)

                    progressBlock.style.width = progress + '%'
                    progressBlock.textContent = progress + '%'
                    if (parseInt(progress) === 100) {
                        counter++
                    }

                    if (counter === files.length) {
                        console.log('images uploaded successfully!')
                    }
                }, (error) => {
                    console.log(error)
                }, () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

                        const image = {
                            name: file.name,
                            size: file.size,
                            url: downloadURL
                        }

                        imageList.push(image)

                        if (imageList.length === files.length) {
                            commit('UPDATE_POST_IMAGE_LIST', imageList)
                        }
                    })                   
                }) 

            })  
        }, 
        
        async deleteImages(_, imageName) {
            const storage = getStorage();  
            const desertRef = stRef(storage, `images/${imageName}`);
            
            await deleteObject(desertRef).then(() => {

              console.log('successfully deleted: ' + imageName)
            }).catch((error) => {

              console.log(error)
            }); 

        }
    }  
}