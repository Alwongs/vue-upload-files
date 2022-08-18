export default function sortList(array) {
    
    return array.sort(function (a, b) {
        if (a.id > b.id) {
            return -1;
        }
        if (a.id < b.id) {
            return 1;
        }
        return 0;
    });             
}