/*
    (C) Kay Software
    Coded by @DosX_Plus (Telegram)
*/

const RemoteHost = ["https://kay-software.ru/neuro/"];

let counter = 0;

(function OnLoad() {
    console.log("%c(C) Kay Software\nCoded by @DosX_Plus (Telegram)", "color: yellow;");
    FixTheTime("begin");
    Generate();
})();

function FixTheTime(OperationName) {
    let LogsDate = new Date();
    console.log(`\"%c${OperationName}%c:%c${counter}\%c":\"%c${LogsDate.getHours()}:${LogsDate.getMinutes()}:${LogsDate.getMilliseconds()}\%c"`,
    "color: #fffdd0;", "color: white;", "color: lightblue;", "color: white;", "color: gray;", "color: white;");
}
function Public(ClientResponse) {
    let El = document.getElementById("de-generator-result");
    if (El) {El.innerHTML = ClientResponse;}
    if (!ClientResponse.includes("span")) { console.log(`\"response\":\"${ClientResponse}\"`); }
    return true;
}
async function Generate() {
    try {
        counter++; console.log(`\"count\":\"${counter}\"`);
        FixTheTime(`begin_task`);
        let CopyButton = document.getElementById("copy");
        if (CopyButton) {
            CopyButton.innerHTML = "Копировать";
        }
        Public("<span style=\"color: green;\">Запрос к API...</span>");
        function GetDatabaseValue(section) {
            FixTheTime("format_begin");
            console.log(`\"request\":\"${section}\"`);
            FixTheTime("format_end");
            return RemoteHost[0] + (`generated/seed.${section}.txt`);
        }
        function PsRand(a, b) {
            return Number(a) + Number(Math.floor(Math.random() * b));
        }
        let api_request = await fetch(GetDatabaseValue("api"));
        let api = await api_request.text();
        let api_arr = api.split("|");
        console.log(`\"%cname%c:%c${counter}%c\":\"%c${api_arr[0]}%c\"`, "color: #fffdd0;", "color: white;", "color: lightblue;", "color: white;", "color: gray;", "color: white;");
        console.log(`\"version\":\"${api_arr[1]}\"`);
        let seed = PsRand(api_arr[2], api_arr[3]);
        await fetch(GetDatabaseValue(seed)).then(response => response.text()).then(code => Public(code));
    } catch (e) {
        Public(`<span style=\"color: red;\"><pre>Exception occurred:
    ${e}</pre></span>`);
        return false;
    }
    FixTheTime(`end_task`);
    console.log(`---`);
    return true;
};