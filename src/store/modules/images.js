
import { 
    getStorage, 
    ref as stRef, 
    getDownloadURL, 
    uploadBytesResumable, 
    deleteObject
} from "firebase/storage"

export default {
    getters: {
        previewImageList(state) {
            return state.previewImageList
        },
        postImageList(state) {
            return state.postImageList
        },
    },
    state: {
        previewImageList: [],
        postImageList: [],
    },
    mutations: {
        UPDATE_PREVIEW_IMAGE_LIST(state, payload) {
            state.previewImageList = payload
        },
        UPDATE_POST_IMAGE_LIST(state, payload) {
            state.postImageList = payload
        },
    },
    actions: {        
        uploadImages({commit}, files) {
            const previewBlock = document.querySelector('.before-loaded-list')
            const storage = getStorage()
            let counter = 0
            let imageList = []

            files.forEach((file, index) => {

                const progressBar = previewBlock.querySelectorAll('.progress-bar')[index]

                const storageRef = stRef(storage, `images-test/${file.name}`)
                const uploadTask = uploadBytesResumable(storageRef, file)
                
                uploadTask.on('state_changed', (snapshot) => {
                    const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0)

                    progressBar.style.width = progress + '%'
                    progressBar.textContent = progress + '%'

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
            const desertRef = stRef(storage, `images-test/${imageName}`);
            
            await deleteObject(desertRef).then(() => {

              console.log('successfully deleted: ' + imageName)
            }).catch((error) => {

              console.log(error)
            }); 

        }
    }  
}