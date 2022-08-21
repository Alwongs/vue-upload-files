export default function getFileExt(file) {
    let temp = file.name.split('.')
    let ext = temp.slice((temp.length - 1), (temp.length))
    return '.' + ext[0]
}
