export default {
    getters: {
        excursions(state) {
            return state.excursions;
        },
        tracking(state) {
            return state.tracking;
        },
        crimea(state) {
            return state.crimea;
        },
        ural(state) {
            return state.ural;
        },
        photosession(state) {
            return state.photosession;
        },
    },
    state: {
        excursions: [
            { id: 1, img: 'excursions/gallery_1.jpg' },
            { id: 2, img: 'excursions/gallery_2.jpg' },
            { id: 3, img: 'excursions/gallery_3.jpg' },
            { id: 4, img: 'excursions/gallery_4.jpg' },          
            { id: 5, img: 'excursions/gallery_5.jpg' },          
        ],
        tracking: [
            { id: 1, img: 'tracking/gallery_1.jpg' },
            { id: 2, img: 'tracking/gallery_2.jpg' },
            { id: 3, img: 'tracking/gallery_3.jpg' },
            { id: 4, img: 'tracking/gallery_4.jpg' },          
            { id: 5, img: 'tracking/gallery_5.jpg' },          
        ],
        crimea: [
            { id: 1, img: 'crimea/gallery_1.jpg' },
            { id: 2, img: 'crimea/gallery_2.jpg' },
            { id: 3, img: 'crimea/gallery_3.jpg' },
            { id: 4, img: 'crimea/gallery_4.jpg' },          
        ],
        ural: [
            { id: 1, img: 'ural/gallery_1.jpg' },
            { id: 2, img: 'ural/gallery_2.jpg' },
            { id: 3, img: 'ural/gallery_3.jpg' },
            { id: 4, img: 'ural/gallery_4.jpg' },          
        ],
        photosession: [
            { id: 1, img: 'photosession/gallery_1.jpg' },
            { id: 2, img: 'photosession/gallery_2.jpg' },
            { id: 3, img: 'photosession/gallery_3.jpg' },
            { id: 4, img: 'photosession/gallery_4.jpg' },          
            { id: 5, img: 'photosession/gallery_5.jpg' },          
            { id: 6, img: 'photosession/gallery_6.jpg' },          
        ],
    }
}