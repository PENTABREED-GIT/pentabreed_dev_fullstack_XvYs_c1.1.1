//! 뷰를 위한 페이징 컴포넌트
const Editor = {
    props: {
        noteId: { type: String, required: true }
    },
    // emits: ['call-back'],
    setup(props, {emit}) {
        console.log('\n\n---------- 컴포넌트 setup ----------')
        console.log('전달 받은 props')
        console.log({...props})

        onMounted(async () => {
            fnSummerNoteInit(props.noteId);
        })


        return {...props}
    },
    template: `<div :id="noteId"></div>`
};
