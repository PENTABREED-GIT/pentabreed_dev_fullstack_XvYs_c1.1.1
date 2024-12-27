var CrossEditor = new NamoSE('namo');
console.dir(CrossEditor);

// 새로운 UI
CrossEditor.params.NewToolbar = true;
// 언어
CrossEditor.params.UserLang = "kor";

CrossEditor.params.Width = "100%";

// body 태그에 min-height 가 필요함, 에디터 하자있음.2222
// 기본 단위 : px
CrossEditor.params.Height = 700;

CrossEditor.params.UploadFileExecutePath = "/namo/imageUpload";
CrossEditor.params.UploadEtcFileExecutePath = "/namo/imageUpload";

CrossEditor.params.DocTitle = document.title;

// 에디터내에 js 차단, 캐논같은 상황 방지
CrossEditor.params.AllowContentScript = false;

// CrossEditor.params.ImageSrcBase64  = true
// CrossEditor.params.AllowContentScript   = false
CrossEditor.EditorStart();
