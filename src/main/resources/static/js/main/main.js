window.onload = async () => {
    console.log('main.js ...')
    await vueInit()

    // await init();

}

async function vueInit() {
    const {createApp, ref, onMounted, reactive, computed, watchPostEffect} = Vue;



    const app = createApp({

        // html 에서 vue 파일을 import 해서 쓸때는 setup() { ... return } 이 필수
        setup() {

            //? 라이프 사이클 중 1개 - 데이터 초기화
            onMounted(async () => {
                console.log('마운트');
/*
                var CrossEditor = new NamoSE('namo');
                CrossEditor.params.NewToolbar = true;
                CrossEditor.params.UserLang = "kor";
                CrossEditor.params.Width = "100%";
                CrossEditor.params.Height = 700;
                CrossEditor.params.UploadFileExecutePath = "/namo/imageUpload";
                CrossEditor.params.UploadEtcFileExecutePath = "/namo/imageUpload";
                CrossEditor.params.DocTitle = document.title;
                CrossEditor.params.AllowContentScript = false;
                CrossEditor.EditorStart();
*/
            })



            return {};
        },
    });

    app
        .mount('#app');

}


async function init() {

    console.log('init ...')

    // NamoSE_Ifr__namo
    // console.log(document.getElementById('wrapping').innerHTML)
    console.log(document.querySelector('#wrapping iframe').outerHTML)

    document.getElementById('target').innerHTML = document.querySelector('#wrapping iframe').outerHTML

    document.getElementById('wrapping').remove()

    console.log(document.getElementById('target'))
}

function fnBoardSave() {

    // CrossEditor.GetBodyValue();
    // CrossEditor.GetTextValue();
    // CrossEditor.GetValue();

    const param = {
        // content: CrossEditor.GetBodyValue()
        content: document.getElementById('myIframe').contentWindow
            .CrossEditor.GetBodyValue()
    };

    alert(JSON.stringify(param, null, 2));
    console.log(param);


}

