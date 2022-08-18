module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/vue-upload-files/" : "/",
    css: {
        loaderOptions: {
            scss: {
                prependData: '@import "@/assets/styles.scss";'
            }
        }
    }
}