/*
    (C) Kay Software
    Coded by @DosX_Plus (Telegram)
*/

const RemoteHost = ["https://kay-software.ru/neuro/"];
(async function main() {
    function GetDatabaseValue(section) {
        return RemoteHost[0] + ("generated/seed." + section + ".txt");
    }
    function PsRand(a, b) {
        return Number(a) + Number(Math.floor(Math.random() * b));
    }
    let api_request = await fetch(GetDatabaseValue("api"));
    let api = await api_request.text();
    let api_arr = api.split("|");
    try {
        function Public(HostResponse) {
            let El = document.getElementById("de-generator-result");
            El.innerHTML = HostResponse;
            console.log(`\"response\":\"${HostResponse}\"`)
            return true;
        }
        let Seed = PsRand(api_arr[2], api_arr[3]);
        console.log(`\"seed\":${Seed}`)
        await fetch(GetDatabaseValue(Seed)).then(response => response.text()).then(code => Public(code));
    } catch (e) {
        Public("Ваш браузер не поддерживает используемые стандарты страницы :(");
    }
    return true;
})();
