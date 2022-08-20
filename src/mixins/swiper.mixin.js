export default {
    data() {
        return {
            sliding: 0,
            slider: null             
        }
    },
    methods: {   
        updateTrigger(newVal) {
            setTimeout(() => {
                this.sliding = newVal;
            })
        },
        touchStart(e) {
            let firstTouch = e.touches[0]
            this.x1 = firstTouch.clientX;
        },
        touchEnd(e) {
            let x2 = e.changedTouches[0].clientX;
            if (x2 < this.x1) {
                this.sliding = this.sliding + 1; 
            }
            if (x2 > this.x1) {
                this.sliding = this.sliding - 1;             
            }
        },            
    },   
    mounted() {
        let slider = document.querySelectorAll('.wrapper-slider')[this.sliderNumber];
        slider.ontouchstart = (e) => {
            this.touchStart(e);
        }
        slider.ontouchend = (e) => {
            this.touchEnd(e);
        } 
        this.slider = slider;        
    },
    unmounted() {
        this.slider.ontouchstart = null;
        this.slider.ontouchend = null;        
    }     
}