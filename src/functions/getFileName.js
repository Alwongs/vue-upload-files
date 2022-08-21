export default function getFileName (file) {
    let temp = file.name.split('.')
    let newFileName = temp.slice(0, -1).join('.')
    return newFileName
}
