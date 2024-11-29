const {createApp} = Vue
console.log('Vue');
console.log(Vue);

window.onload = () => {
    createApp({
    data() {
        return {
            message: 'Hello Vue!',
            count: 0,
            items: [],
            showFlag: true,
            html: '<div><span>Hello World</span></div>',
            user: {
                name: '홍길동',
                age: 10,
            },
        }
    },
    methods: {
        fnLog() {
            console.log('fnLog ...')
        },
        fnCount() {
            this.count++
            console.log(`this.count = ${this.count}`)
        },
        async fnSampleApi() {
            const {status, data}  = await fnAsyncGet('/sample')
            if (!status) {
                alert('sample api 호출 에러')
                return
            }
            return data;
        }
    },
    async mounted() {
        console.log('[1] 마운트 완료');
        console.log(this.fnLog)

        console.log('[2] API 호출');
        this.items = await this.fnSampleApi();
        console.log(this.items)

        // ref="hereInput" 인 input 포커스
        this.$refs.hereInput.focus()

        // 외부 common.js 함수도 호출가능
        console.log('fnIsMobile() =', fnIsMobile())

        await fnSampleMenu()


    }
}).mount('#app')

console.log('[3] asdasd')

}
