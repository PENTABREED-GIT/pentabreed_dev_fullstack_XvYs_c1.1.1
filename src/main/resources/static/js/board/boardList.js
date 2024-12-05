window.onload = async () => {
    console.log('board ...')
    await init();
}


async function init() {

}



/*

async function fnBoardList(clickPage = 1) {

    // limit 는 common.js 에 선언 기본값 8
    const offset = clickPage === 1 ? 0 : (clickPage-1) * limit

    // api 요청 파라미터, 검색조회면 PagingVo 를 상속하거나, 아니면 PagingVo 를 바로 받을 수 있습니다
    const param = {
        limit,
        offset
    };


    const {status, data, metaData} = await fnAsyncJsonPost('/api/board/list', param)
    // console.log({status, data, metaData});

    // 실패시에 여기서 멈춤 ...
    if(!status) return;

    const {totalCount} = metaData;
    console.log('totalCount = ', totalCount);

    const htmlArr = [];

    data.forEach((obj) => {
        const {id, title, role, userId, content} = obj;

        htmlArr.push(`<tr>
                          <th scope="row">${id}</th>
                          <td>${title}</td>
                          <td>${role}</td>
                          <td>${userId}</td>
                        </tr>`);
    })

    // 페이징 랜더링 파라미터
    const pagingObj = {
        clickPage,
        totalCount
    }

    // 화면 랜더링
    // fnHtml('tbody', htmlArr);
    fnHtml('tbody', htmlArr);


    // 페이지 네비게이션 랜더링
    fnPaging(pagingObj, 'fnBoardList')

    return {status, data, metaData}


}
 */
