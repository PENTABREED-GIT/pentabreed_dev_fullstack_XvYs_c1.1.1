window.onload = async () => {
    console.log('userMain ...');
    await init();
}


async function init() {


    // common.js 의 fnSummerNoteInit 호출 ...
    fnSummerNoteInit();
}


async function fnBoardSave() {

    const title = fnGetValueById('title')
    const content = $('#summernote').summernote('code');

    console.log({title, content})

    const param = {
        title, content,
    };

    const {status, data, metaData} = await fnAsyncJsonPost('/api/board/save', param)
    console.log({status, data, metaData});


    if(!status) {
        alert('게시글 등록 에러')
        return;
    }

    alert('게시글 등록 완료');
    fnPageMove('/board/list');



}
