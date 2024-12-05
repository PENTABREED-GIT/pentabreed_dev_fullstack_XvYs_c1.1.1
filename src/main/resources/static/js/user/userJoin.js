window.onload = async () => {
    console.log('userJoin ...');
    await init();
}


async function init() {


}

async function fnUserJoin() {


    const userId = fnGetValueById('userId');
    const userPassword = fnGetValueById('userPassword');
    const role = fnRadioValueByName('role')

    console.log({userId, userPassword, role})

    const param = {
        userId, userPassword, role
    }

    const {status, data, metaData} = await fnAsyncJsonPost('/api/user/join', param);

    console.log({status, data, metaData});

    if (!status) {
        alert('회원가입 실패')
        return;
    }

    alert('회원가입 완료');
    fnPageMove('/user/login');





}

