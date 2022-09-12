async function fetchGrafico(){
    const obj = window.localStorage.getItem("grafico");
    console.log(obj);
    let response = await fetch("/GerenteRegional/GenerarGrafico", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: obj
    });

    let result = await response.json();

    return result;

}

document.forms[0].addEventListener("submit", async (e) =>{
    e.preventDefault();
    const res = await fetchGrafico();
    window.localStorage.setItem("chart-config", JSON.stringify(res));
    //alert("ESPERAAA");
    document.forms[0].submit();
})
 /*
async function main() {
    const res = await fetchGrafico();
    console.log(res);
}

main();
*/
