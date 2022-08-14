/*
    (C) Kay Software
    Coded by @DosX_Plus (Telegram)
*/

const RemoteHost = ["https://kay-software.ru/neuro/"];

const LogsDate = new Date();

let counter = 0;

(function OnLoad() {
    FixTheTime("begin");
    Generate();
})();

function FixTheTime(OperationName) {
    console.log(`\"${OperationName}\":\"${LogsDate.getHours()}:${LogsDate.getMinutes()}:${LogsDate.getMilliseconds()}\"`);
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
        FixTheTime(`begin_task:${counter}`);
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
        console.log(`\"name\":\"${api_arr[0]}\"`);
        console.log(`\"version\":\"${api_arr[1]}\"`);
        let seed = PsRand(api_arr[2], api_arr[3]);
        await fetch(GetDatabaseValue(seed)).then(response => response.text()).then(code => Public(code));
    } catch (e) {
        Public(`<span style=\"color: red;\"><pre>Exception occurred:
    ${e}</pre></span>`);
        return false;
    }
    FixTheTime(`end_task:${counter}`);
    console.log(`---`);
    return true;
};