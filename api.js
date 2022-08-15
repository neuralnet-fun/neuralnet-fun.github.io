/*
    (C) Kay Software
    Coded by @DosX_Plus (Telegram)
*/

const RemoteHost = ["https://kay-software.ru/neuro/"];
const Output = "de-generator-result";

let counter = 0;
const NewLog = {
    FixTheTime(OperationName) {
        let LogsDate = new Date();
        console.log(`  \"%c${OperationName}%c:%c${counter}\%c":\"%c${LogsDate.getHours()}:${LogsDate.getMinutes()}:${LogsDate.getMilliseconds()}\%c"`,
        "color: gray;", "color: white;", "color: lightblue;", "color: white;", "color: gray;", "color: white;");
    },
    FixParamValue(OperationName, OperationValue) {
        console.log(`\"%c${OperationName}%c:%c${counter}\%c":\"%c${OperationValue}%c"`,
        "color: #fffdd0;", "color: white;", "color: lightblue;", "color: white;", "color: lightgray;", "color: white;");
    }
};

(function OnLoad() {
    console.log("%c(C) Kay Software\nCoded by @DosX_Plus (Telegram)", "color: yellow;");
    NewLog.FixTheTime("begin");
    Generate();
})();
function Public(ClientResponse) {
    let El = document.getElementById(Output);
    if (El) {El.innerHTML = ClientResponse;}
    if (!ClientResponse.includes("span")) { NewLog.FixParamValue("response", ClientResponse) }
    return true;
}
async function Generate() {
    try {
        counter++; NewLog.FixParamValue("count", counter);
        NewLog.FixTheTime(`begin_task`);
        let CopyButton = document.getElementById("copy");
        if (CopyButton) {
            CopyButton.innerHTML = "Копировать";
        }
        Public("<span style=\"color: green;\">Запрос к API...</span>");
        function GetDatabaseValue(section) {
            NewLog.FixTheTime("format_begin");
            NewLog.FixParamValue("request", section);
            NewLog.FixTheTime("format_end");
            return RemoteHost[0] + (`generated/seed.${section}.txt`);
        }
        function PsRand(a, b) {
            return Number(a) + Number(Math.floor(Math.random() * b));
        }
        let api_request = await fetch(GetDatabaseValue("api")); // API full response
        let api = await api_request.text(); // API text response
        let api_arr = api.split("|"); // API parameters array
        NewLog.FixParamValue("name", api_arr[0]);
        NewLog.FixParamValue("version", api_arr[1]);
        let seed = PsRand(api_arr[2], api_arr[3]);
        await fetch(GetDatabaseValue(seed)).then(response => response.text()).then(code => Public(code));
    } catch (e) {
        document.getElementById(Output).innerHTML = `<span style=\"color: red;\"><pre>Exception occurred:
    ${e}</pre></span>`;
        console.log(`%cError >>\n    ${e}`, "color: white; background: red;");
        return false;
    }
    NewLog.FixTheTime("end_task");
    console.log("---");
    return true;
};