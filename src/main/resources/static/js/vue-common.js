async function fnSampleMenu() {

    const {data} = await fnAsyncGet('/menu')

    const menuHtmlArr = [];
    data.forEach((obj) => {
        // console.log(obj)
        const [key] = Object.keys(obj)
        // console.log(`key = ${key}`)
        // console.log(`value = ${obj[key]}`)
        menuHtmlArr.push(`<li onclick="fnPageMove('${obj[key]}')">${key}</li>`)
    })

    fnHtml('menu', menuHtmlArr);
}
