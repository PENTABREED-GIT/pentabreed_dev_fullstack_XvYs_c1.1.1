const NamoEditor = {
    props: {
        editorName: { type: String, required: true },
        uploadUrl: { type: String, required: true },
        width: { type: String, required: false, default: "100%" },
        height: { type: String, required: false, default: "70%" },
    },
    // emits: ['call-back'],
    setup(props, {emit}) {

        console.log('\n\n---------- 컴포넌트 setup ----------')
        console.log('전달 받은 props')
        console.log({...props})

        var CrossEditor = new NamoSE(editorName);
        console.dir(CrossEditor);

        // 새로운 UI
        CrossEditor.params.NewToolbar = true;
        // 언어
        CrossEditor.params.UserLang  = "kor";

        CrossEditor.params.Width = "100%";

        // body 태그에 min-height 가 필요함, 에디터 하자있음.
        // 기본 단위 : px
        CrossEditor.params.Height = 700;

        CrossEditor.params.UploadFileExecutePath = uploadUrl;
        CrossEditor.params.UploadEtcFileExecutePath = uploadUrl;

        CrossEditor.params.DocTitle = document.title;

        // 에디터내에 js 차단, 캐논같은 상황 방지
        CrossEditor.params.AllowContentScript = false;

        // CrossEditor.params.ImageSrcBase64  = true
        // CrossEditor.params.AllowContentScript   = false


        onMounted(async () => {
            console.log('나모 에디터 발동!!!')
            CrossEditor.EditorStart();
        })


        return {...props}
    },
    template: `<div>aaa</div>`
};
