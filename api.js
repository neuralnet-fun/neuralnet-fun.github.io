/*
    (C) Kay Software
    Coded by @DosX_Plus (Telegram)
*/

const RemoteHost = ["https://kay-software.ru/neuro/"];

(function OnLoad() {
    console.log(`\"host\":\"${RemoteHost[0]}\"`)
    Generate();
})();

async function Generate() {
    let CopyButton = document.getElementById("copy")
    if (CopyButton) {
        CopyButton.innerHTML = "Копировать";
    }
    function Public(ClientResponse) {
        let El = document.getElementById("de-generator-result");
        if (El) {El.innerHTML = ClientResponse;}
        console.log(`\"response\":\"${ClientResponse}\"`);
        return true;
    }
    Public("<span style=\"color: green;\">Запрос к API...</span>");
    function GetDatabaseValue(section) {
        console.log(`\"request\":\"${section}\"`);
        return RemoteHost[0] + ("generated/seed." + section + ".txt");
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
    try {
        await fetch(GetDatabaseValue(seed)).then(response => response.text()).then(code => Public(code));
    } catch (e) {
        Public("Ваш браузер не поддерживает используемые стандарты страницы :(");
    }
    return true;
};