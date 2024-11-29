/**
 * 화면당 보여줄 게시글의 갯수
 */
const limit = 2;                                      // 화면당 보여줄 게시글의 갯수
const pageShowButtonCount = 10;                       // 하단에 표시되는 페이지 버튼 자체의 갯수

let next = pageShowButtonCount + 1;                   // 이전 페이지 버튼
let prev = pageShowButtonCount - pageShowButtonCount; // 다음 페이지 버튼


/**
 * 페이지 이동함수
 */
function fnPageMove(url) {
    location.href = url;
}


/**
 * 뒤로가기 버튼 함수 (목록 버튼에 사용할수 있다)
 */
function fnPageMoveBack() {
    window.history.back();
}



/**
 * 비동기 Get 방식 API 호출
 */
async function fnAsyncGet(url) {
    return await (await fetch(url)).json();
}


/**
 * 비동기 + Form 태그 (Setter 필요)
 */
async function fnAsyncPostPageMove(url, param) {
    const formData = new FormData();

    for (let key in param) {
        formData.set(key, param[key]);
    }

    const {status, metaData, errorMessage} = await (
        await fetch(url, {
            method: "POST",
            body: formData,
        })
    ).json();

    if (status) {
        if (metaData && metaData["message"]) alert(metaData["message"]);
    } else {
        alert(errorMessage);
    }
}

/**
 * 비동기 + Json (Setter 노필요)
 * ! @RequestBody 필요함
 */
async function fnAsyncJsonPost(url, param) {

    const {status, data, metaData, errorMessage} = await (
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(param),
        })
    ).json();

    if (status === false && data !== undefined) alert(data);
    return {status, data, metaData};
}

/**
 *
 * 동기 + Form 태그
 * @param url string
 * @param param object
 */
function fnPostPageMove(url, param = {}) {


    let form = document.createElement("form");

    form.setAttribute("name", "data_form");
    form.setAttribute("charset", "utf-8");
    form.setAttribute("method", "post");
    form.setAttribute("action", url);
    form.setAttribute("enctype", "application/x-www-form-urlencoded");

    for (let key in param) {
        let input = document.createElement("input");
        input.setAttribute("name", key);

        if (typeof param[key] === "number") {
            input.setAttribute("type", "number");
        } else {
            input.setAttribute("type", "text");
        }
        input.setAttribute("value", param[key]);
        form.appendChild(input);
    }

    document.body.appendChild(form).style.display = 'none';
    // document.body.appendChild(form);
    form.submit();
}


/**
 * 아이디 체크 6~20자
 */
function fnIdCheck(param) {
    const reg = /^[a-z][a-z0-9_]{5,20}$/;
    return reg.test(param);
}

/**
 * 비밀번호 체크 8~24자
 */
function fnPasswordCheck(param) {
    const reg =
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,24}$/;
    return reg.test(param);
}

/**
 * 핸드폰 체크
 */
function fnPhoneCheck(param) {
    const reg = /^\d{3}-\d{3,4}-\d{4}$/;
    return reg.test(param);
}

/**
 * 일반 전화번호 체크
 */
function fnSubPhoneCheck(param) {
    const reg = /^\d{2,4}-\d{3,4}-\d{4}$/;
    return reg.test(param);
}


/**
 * [Dom -Getter] input 의 값을 정수타입으로 가져온다
 */
function fnGetIntValueById(id) {
    let intValue = document.getElementById(id)?.value;
    if (intValue) {
        intValue = intValue === "" ? 0 : parseInt(intValue);
    }
    return intValue;
}

/**
 * [Dom -Getter] input 의 값을 문자열 타입으로 가져온다
 */
function fnGetStringValueById(id) {
    return document.getElementById(id)?.value;
}

/**
 * [Dom -Getter] p 같은 태그들의 텍스트 값을 가져온다
 */
function fnGetTextById(id) {
    return document.getElementById(id)?.textContent;
}

/**
 * [Dom -Getter] p 같은 태그들의 텍스트 값을 가져온다
 */
function fnGetValueById(id) {
    const dom = document.getElementById(id);
    if (dom) {
        const value = (dom.value).trim();
        fnSetValueById(id, value);
        return (dom.value).trim();
    } else {
        return '';
    }

}

/**
 * [Dom -Setter] input 의 value를 셋팅한다
 */
function fnSetValueById(id, value) {
    document.getElementById(id).value = value;
}

/**
 * [Dom -Setter] p 같은 태그의 value를 셋팅한다
 */
function fnSetTextById(id, text) {
    document.getElementById(id).textContent = text;
}

function fnGetDataset(targetId, dataId) {
    return document.getElementById(targetId)?.dataset[dataId];
}

function fnSetDataset(targetId, dataId, data) {
    return document.getElementById(targetId).dataset[dataId] = data;
}

function fnGetInnerHtml(id) {
    return document.getElementById(id)?.innerHTML;
}

function fnGetInnerText(id) {
    return document.getElementById(id)?.innerText;
}

function fnSetOuterHtml(id, htmlText) {
    const dom = document.getElementById(id);
    if (dom) dom.outerHTML = htmlText;
}

function fnGetOuterHtml(id) {
    return document.getElementById(id)?.outerHTML;
}

function fnGetOuterText(id) {
    return document.getElementById(id)?.outerText;
}

function fnGetDom(id) {
    return document.getElementById(id);
}


function fnNoneByClass(className) {

    [...document.getElementsByClassName(className)].forEach((dom) => {
        dom.style.display = 'none';
    });
}

function fnBlockByClass(className) {

    [...document.getElementsByClassName(className)].forEach((dom) => {
        dom.style.display = '';
    });
}


function fnNone(id) {
    document.getElementById(id).style.display = 'none';
}

function fnBlock(id) {
    document.getElementById(id).style.display = 'block';
}

function fnBlock2(id) {
    document.getElementById(id).style.display = '';
}

/**
 * 체크 해제
 */
function fnUnCheckById(id) {
    if (document.getElementById(id)) {
        document.getElementById(id).checked = false;
    }
}

/**
 * 체크 박스 체크여부
 */
function fnGetCheckById(id) {
    return document.getElementById(id)?.checked;
}

/**
 * 선택된 체크박스 리스트 리턴
 */
function fnGetCheckBoxByName(name) {
    const targetArr = [...document.getElementsByName(name)];
    const boxArr = targetArr.filter((box) => {
        return box.checked === true;
    });

    return boxArr;
}

function fnRadioValueByName(name) {
    const targetArr = [...document.getElementsByName(name)];
    const [box] = targetArr.filter((box) => {
        return box.checked === true;
    });

    return box.value;
}


/**
 * select box의 특정 value를 체크하고 나머지는 다 푼다
 */
function fnSelectByIdAndValue(targetId, value, sleepFlag = false) {
    if (sleepFlag) {
        setTimeout(() => {
            const optionDom = [...document.getElementById(targetId).children];
            optionDom.forEach((option) => {
                if (option.value == value) {
                    option.selected = true;

                } else {
                    option.selected = false;
                }
            });
        }, 500);
    } else {
        const optionDom = [...document.getElementById(targetId).children];
        optionDom.forEach((option) => {
            if (option.value == value) {
                option.selected = true;

            } else {
                option.selected = false;
            }
        });
    }

}

/**
 * onChange 이벤트를 발생시킨다
 */
function fnDoOnChange(targetId) {
    document.getElementById(targetId).dispatchEvent(new Event('change'));
}


/**
 * select box의 선택한 text를 가져온다
 */
function fnGetSelectTextContentById(id) {
    const selectHtml = document.getElementById(id);
    const index = selectHtml.options.selectedIndex;
    const textContent = selectHtml.options[index].textContent;
    return textContent;
}

/**
 * select box의 선택한 value을 가져온다
 */
function fnGetSelectValueById(id) {
    const selectHtml = document.getElementById(id);
    const index = selectHtml.options.selectedIndex;
    const value = selectHtml.options[index].value;
    return value;
}

/**
 * select box의 선택한 id을 가져온다
 */
function fnGetSelectIdById(id) {
    const selectHtml = document.getElementById(id);
    const index = selectHtml.options.selectedIndex;
    const selectedId = selectHtml.options[index].id;
    return selectedId;
}

/**
 * 이름(name)으로 체크한 라디오 버튼의 value를 가져오기
 */
function fnGetRadioValueByName(name) {
    const targetArr = [...document.getElementsByName(name)];
    const domArr = targetArr.filter((obj) => {
        if (obj.checked === true) {
            return obj;
        }
    });

    if (domArr.length != 1) {
        // alert('라디오 버튼을 체크해주세요');
        return null;
    }

    return domArr[0].value;
}


/**
 * 제이쿼리.append()의 바닐라 js버전
 */
function fnAppend(targetId, dataArr = []) {
    document
        .getElementById(targetId)
        .insertAdjacentHTML("beforeend", dataArr.join(""));
}

/**
 * 제이쿼리.html()의 바닐라 js버전
 */
function fnHtml(targetId, dataArr = []) {
    document.getElementById(targetId).innerHTML = dataArr.join("");
}

/**
 * 제이쿼리.after()의 바닐라 js버전
 */
function fnAfter(targetId, dataArr = []) {
    document
        .getElementById(targetId)
        .insertAdjacentHTML("afterend", dataArr.join(""));
}

function fnBefore(targetId, dataArr = []) {
    document
        .getElementById(targetId)
        .insertAdjacentHTML("beforeBegin", dataArr.join(""));
}

/**
 * Form 태그를 Object화 시킨다
 * @param formId Form 태그의 아이디
 */
function fnSerialize(formId) {
    const formTag = document.getElementById(formId);
    const form = new FormData(formTag);
    return form;
}

/**
 * input type=number 의 글자수 제한
 */
function fnPriceRangeEvent(event) {
    if (event.value.length > event.maxLength) {
        event.value = event.value.slice(0, event.maxLength);
    }
}

/**
 * input type=number 숫자 제한
 */
function fnPriceMinEvent(event, min) {
    if (event.value <= min) {
        event.value = null;
        event.className = "w100p red-outline";
        event.focus();
    } else {
        event.className = "w100p";
    }
}

/**
 * 세자리마다 콤마
 */
function fnComma(value, flag = false) {
    if (value) {
        return flag === true ?
            parseInt(value).toLocaleString("ko-KR") + "원" :
            parseInt(value).toLocaleString("ko-KR")
    } else {
        return "";
    }
}

/**
 * RowNum 번호를 구하는 함수
 * JPA를 쓸때 굳이 rowNum을 JPQL로 작성하지않으니까 필요하다
 */
function fnMakeRowNum(totalCount, clickPage, limit) {
    let rowNum = totalCount - (clickPage - 1) * limit;
    return rowNum;
}

/**
 * 체크박스 체크 및 해제에 따라서 상단 체크박스 컨트롤
 */
function fnCheckBoxEvent(chkName) {
    const allChkArr = [...document.getElementsByName(chkName)];

    let count = 0;

    for (const chkDom of allChkArr) {
        if (chkDom.checked) count = count + 1;
    }

    if (count < allChkArr.length) {
        document.getElementById("chk").checked = false;
    } else if (count === allChkArr.length) {
        document.getElementById("chk").checked = true;
    }
}

/**
 * 전체 체크박스의 on/off
 * 클릭한순간 true로 시작한다
 */
function fnAllChk(parent, childName) {
    const allChkArr = [...document.getElementsByName(childName)];
    const settingValue = parent.checked;
    for (const chkDom of allChkArr) {
        chkDom.checked = settingValue;
    }
}


/**
 * 날짜 포맷터
 * @param type : 'simple','full','short'
 * @param data : Date
 * @returns {string} YYYY-MM-DD, YYYY-MM-DD HH:mm:ss
 */
function fnDateFormat(type, data) {
    let newDate = "";
    if (type === "simple") {
        newDate = moment(data).format("YYYY-MM-DD");
    } else if (type === "full") {
        newDate = moment(data).format("YYYY-MM-DD HH:mm:ss");
    } else if (type === "short") {
        newDate = moment(data).format("YYYY-MM");
    } else {
        newDate = moment(data).format("YYYY-MM-DD HH:mm");
    }

    return newDate;
}

/**
 * 문자열 yyyy-MM-dd를 날짜(Date) 객체로 바꾼다
 * @param type : 'from','to'
 * @param dateText : 'yyyy-MM-dd'
 * @returns {Date}
 */
function fnSqlDateFormattingForJPA(type, dateText) {

    if (type === "from") {
        return new Date(dateText + " 00:00:00");
    } else {
        return new Date(dateText + " 23:59:59");
    }
}


/**
 * MyBatis
 */
function fnSqlDateFormattingForMyBatis(type, dateText) {

    if (type === "from") {
        return dateText + " 00:00:00";
    } else {
        return dateText + " 23:59:59";
    }
}


/**
 * yyyy-MM-dd 문자열 형태를 날짜(Date) 비교
 */
function fnCheckDate(dateStr, dateStr2) {

    if (dateStr === '' || !dateStr2 === '') {

        return false;
    }

    const date1 = new Date(dateStr);
    const date2 = new Date(dateStr2);

    if (date2.getTime() >= date1.getTime()) {
        return true;
    }

    return false;


}

/**
 * UUID
 */
function uuid() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

/**
 * 제이슨 비교
 * @param obj1 오브젝트
 * @param obj2 오브젝트
 * @returns {boolean}
 */
function fnEqualByJson(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

/**
 * 디데이
 * @param standDayStr 계약 완료일(str)
 * @param dayCount  날짜 카운트
 */
function fnDday(standDayStr, dayCount) {

    const startDay = moment(standDayStr);
    const endDay = moment(standDayStr).add(dayCount, 'days');
    const nowDay = moment();

    const dday = moment(endDay).diff(nowDay, 'days')

    if (dday >= 0) {
        return `D-${dday}`
    } else {
        return "기간만료"
    }

}

/**
 * option 태그 삭제
 * @param idList 배열
 */
function fnRemoveOptionTag(...idList) {
    idList.forEach((id) => document.getElementById(id).remove());
}

/**
 * dom 삭제
 */
function fnRemoveById(id) {
    document.getElementById(id)?.remove();
}


/**
 * Enter 이벤트 함수
 */
function fnEnterEvent(targetId, callBack, callbackBefore = null) {
    document
        .getElementById(targetId)
        .addEventListener("keydown", (event) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                if (callbackBefore) {
                    callbackBefore();
                }
                callBack();
            }
        });

}

/**
 * Click 이벤트 함수
 */
function fnClickEvent(targetId, callBack, callbackBefore = null) {
    console.log('fnClickEvent');
    document
        .getElementById(targetId)
        .addEventListener("click", (event) => {
            if (callbackBefore) {
                callbackBefore();
            }
            callBack();
        });

}


/**
 * Click 이벤트 발생
 */
function fnClick(targetId) {
    document?.getElementById(targetId).click();
}


/**
 * 기간 체크
 */
function fnDateValidation(startDateId, endDateId, message) {

    const obj = {};
    const tmp1 = new Date(fnGetValueById(startDateId)).getTime();
    const tmp2 = new Date(fnGetValueById(endDateId)).getTime();
    if (tmp1 > tmp2) {
        fnSetValueById(startDateId, null);
        fnSetValueById(endDateId, null);
        alert(message);
        obj[startDateId] = null;
        obj[endDateId] = null;
        return obj;

    } else {
        const startDateValue = fnCharDate(startDateId);
        const endDateValue = fnCharDate(endDateId);
        obj[startDateId] = startDateValue;
        obj[endDateId] = endDateValue;
        return obj;
    }


}


/**
 * 연락처 포맷팅
 * (DB) 01012345678 => (VIEW) 010-1234-5678
 */
function fnPhoneFormatting(phoneStr) {
    const phoneArr = [];
    if (phoneStr.startsWith('010')) {
        if (phoneStr.length === 11) {
            phoneArr.push(phoneStr.substring(0, 3));
            phoneArr.push(phoneStr.substring(3, 7));
            phoneArr.push(phoneStr.substring(7));
        } else if (phoneStr.length === 10) {
            phoneArr.push(phoneStr.substring(0, 3));
            phoneArr.push(phoneStr.substring(3, 6));
            phoneArr.push(phoneStr.substring(6));
        } else {
            phoneArr.push('');
        }

    } else {
        // 02 1234 5678  => 10
        if (phoneStr.length === 10) {
            phoneArr.push(phoneStr.substring(0, 2));
            phoneArr.push(phoneStr.substring(2, 6));
            phoneArr.push(phoneStr.substring(6));
            // 02 123 4567 => 9
        } else if (phoneStr.length === 9) {
            phoneArr.push(phoneStr.substring(0, 2));
            phoneArr.push(phoneStr.substring(2, 5));
            phoneArr.push(phoneStr.substring(5));
        } else if (phoneStr.length === 11) {
            phoneArr.push(phoneStr.substring(0, 3));
            phoneArr.push(phoneStr.substring(3, 7));
            phoneArr.push(phoneStr.substring(7));
        } else {
            phoneArr.push('');
        }
    }

    return phoneArr.join('-');

}


function fnIsMobile() {
    var isMobile = /Mobi/i.test(window.navigator.userAgent);

    return isMobile;
}


/**
 *
 */
function fnJsonStrToObject(targetId) {
    // return JSON.parse(document.getElementById(targetId).value.replaceAll('\'', '\"'));

    const targetDom = document.getElementById(targetId)?.value;
    if (targetDom) {
        const obj = JSON.parse(targetDom.replaceAll('\'', '\"'));
        for (const key in obj) {
            if (typeof obj[key] === 'string' && obj[key].includes('\{')) {
                obj[key] = JSON.parse(obj[key].replaceAll('\'', '\"'));
            }
        }
        return obj;
    }

    return null;
}


/**
 *
 */
function fnDisabled(...idArr) {
    for (const id of idArr) {
        document.getElementById(id).disabled = true;
    }
}

/**
 *
 */
function fnUnDisabled(...idArr) {
    for (const id of idArr) {
        document.getElementById(id).disabled = false;
    }
}


/**
 *
 *
 */
function fnDateToDateTimeTag(targetId) {
    document.getElementById(targetId).type = 'datetime-local';
}

function fnPick(obj, ...keyArr) {
    const resultObj = {};
    for (const key of keyArr) {
        resultObj[`${key}`] = obj[key];
    }
    return resultObj;
}


function fnChildrenRemoveById(parentId) {
    [...document.getElementById(parentId).children]
        .forEach((tr) => {
            tr.remove();
        });
}




function fnFileAdd(target, targetId) {
    console.log('fnFileAdd ...');
    console.log(target.files)

    const files = [...target.files];
    console.log(files)


    // const htmlArr = [];

    // 자식 태그 제거
    fnChildrenRemoveById('file_image_section');

    files.forEach((file, index) => {
        console.dir(file)
        console.log('file.type : ', file.type)

        if (!file.type.includes('image')) {
            document.getElementById('system_modal').click();
            // alert('이미지가 아닌 파일은 선택할 수 없습니다')
            // location.reload()
        }

        const size = parseInt((file.size / 1024));
        console.log('size = ', size, 'KB');

        const fileId = `file_${(index + 1)}`

        const imgTagArr = [];
        const reader = new FileReader();
        reader.onload = (e) => {
            // 이미지 태그 생성
            const base64DataUrl = e.target?.result;
            imgTagArr.push(`
                    <img id="file_${(index + 1)}" 
                        class="img-thumbnail product_img" 
                        src="${base64DataUrl}" alt="" 
                        onclick="fnFileRemove('${fileId}')"
                        data-file-name="${file.name}"
                        data-bs-toggle="tooltip" 
                        data-bs-placement="top"
                        data-bs-custom-class="custom-tooltip"
                        data-bs-title="${file.name} (${size} KB)" 
                    />
            `)
            fnAppend('file_image_section', imgTagArr);
        }
        reader.readAsDataURL(file)
    });
}

/**
 * 파일은 빼기 버튼을 눌렀을때
 * input 이 가진 파일 저장소에서 파일을 제거하는 함수
 */
function fnFileRemove(removeId) {

    const {fileName} = fnGetDom(removeId).dataset
    console.log('fileName = ', fileName);

    // 파일 설명 지우기
    fnRemoveById(removeId);

    // 이미지 태그 지우기
    // fnRemoveById(removeId + '_img');

    // 파일 저장소 지우기
    const dataTransfer = new DataTransfer()
    const files = [...document.getElementById('productFileList').files];
    files.forEach((file) => {
        if (file.name !== fileName) {
            dataTransfer.items.add(file);
        }
    });

    // 파일 저장소 수정
    // const fileTag = fnGetDom('productFileList');
    // document.getElementById('productFileList').files = dataTransfer.files;
    document.getElementById('productFileList').files = dataTransfer.files;


}

function fnReload() {
    location.reload();
}

/**
 * summernote editor 초기화
 */
function fnSummerNoteInit() {
    $('#summernote').summernote({
        lang: 'ko-KR', // default: 'en-US'
        height: 300, // set editor height
        width: 700,
        minHeight: null, // set minimum height of editor
        maxHeight: null, // set maximum height of editor
        focus: false // set focus to editable area after initializing summernote
    });
}



/**
 * Paging 유틸 함수 ( paging 이라는 id를 갖는 ul태그가 있어야한다 )
 * @param obj 클릭한 페이지번호, 토탈 카운트를 갖는 객체 리터럴
 * @param fnName 조회때 사용하는 함수 이름
 */
function fnPaging(obj, fnName) {

  const { clickPage, totalCount } = obj;
  const paging = [];
  const lastPageButtonNum = Math.ceil(totalCount / limit);

  // ? 이전버튼
  if (clickPage > 1) {
    paging.push(`
                <li class="page-item" onclick="${fnName + "(" + (clickPage - 1) + ")"}">
                  <a class="page-link" href="javascript:;" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>                
          `);
  }

  // ? 숫자 페이지 버튼
  for (let i = 0; i < pageShowButtonCount; i++) {
    if (prev + 1 + i > lastPageButtonNum) break;
    let liClass = "page-item";
    if (clickPage === prev + 1 + i) liClass += " active";

    paging.push(`<li class="${liClass}"><a class="page-link" href="javascript:;" onclick="${fnName + '(' + (prev + 1 + i) + ')'}">${prev + 1 + i}</a></li>`);

  }

  // ? 다음 버튼
  if (clickPage < lastPageButtonNum) {
    paging.push(`
        <li class="page-item" onclick="${fnName + "(" + (clickPage + 1) + ")"}">
          <a class="page-link" href="javascript:;" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      `);
  }

  fnHtml("paging", paging);


}
