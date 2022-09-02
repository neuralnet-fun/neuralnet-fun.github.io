/*
    (C) Kay Software
    Coded by @DosX_Plus (Telegram)
*/

const AppVer = 2.5;
const RemoteHost = ["https://kay-software.ru/neuro/"]; // удалённый сервер
const Output = "de-generator-result"; // id элемента для вывода результата
const CopyButton = "copy"; // id кнопки "копировать"

let Statistics = [0, 0]; // generated_int, copied_int

let CopyButtonDefaultText;
let CopyButtonEl = document.getElementById(CopyButton);

let counter = 0; // Счётчик, считающий количество вызванных Generate();

const NewLog = {
    SetTimePoint(OperationName) { // Временная метка (измеряем производительность и начало каждой базовой операции)
        // "OperationName:counter":"Hours:Minutes:Seconds,Milliseconds"
        let LogsDate = new Date();
        console.log(`  %c\"%c${OperationName}%c:%c${counter}\%c":\"%c${LogsDate.getHours()}:${LogsDate.getMinutes()}:${LogsDate.getSeconds()},${LogsDate.getMilliseconds()}\%c"`,
            "color: white;", "color: gray;", "color: white;", "color: lightblue;", "color: white;", "color: gray;", "color: white;");
    },
    FixParamValue(OperationName, OperationValue) { // Фиксируем значения окружения
        // "OperationName:counter":"OperationValue"
        console.log(`%c\"%c${OperationName}%c:%c${counter}\%c":\"%c${OperationValue}%c"`,
            "color: white;", "color: #fffdd0;", "color: white;", "color: lightblue;", "color: white;", "color: lightgray;", "color: white;");
    }
};
(function OnLoad() {
    Statistics[0] = Number(localStorage.getItem("generated_int")); // Всего прокликано
    Statistics[1] = Number(localStorage.getItem("copied_int")); // Всего скопировано
    if (CopyButtonEl) {
        CopyButtonDefaultText = CopyButtonEl.textContent; // Запоминаем текст кнопки копирования результата
    }
    // --- custom userAgent
    let staticUserAgent = navigator.userAgent;
    navigator.__defineGetter__("userAgent", function() { return (document.domain + " (Client-Side) ") + staticUserAgent });
    // ---
    console.log("%c(C) Kay Software\nCoded by @DosX_Plus (Telegram)", "color: yellow;");
    NewLog.SetTimePoint("begin");
    NewLog.FixParamValue("appversion", AppVer);
    NewLog.FixParamValue("local", navigator.userAgent); // Свойство [UserAgent] "Идентификатор клиента"
    NewLog.FixParamValue("donottrack", Boolean(navigator.doNotTrack)); // Свойство [DoNotTrack] "Не отслеживать"
    Generate();
})();

function Public(ClientResponse) { // Экранирование результата в текстовом виде
    let El = document.getElementById(Output);
    if (El) { El.innerHTML = ClientResponse; }
    if (!ClientResponse.includes("span")) { NewLog.FixParamValue("response", ClientResponse) }
    return true;
}

function GetDatabaseValue(section) { // Форматируем текст для запроса
    // "api" => "https://kay-software.ru/neuro/generated/seed.api.txt"
    NewLog.SetTimePoint("format_begin");
    NewLog.FixParamValue("request", section);
    let GeneratedResult = RemoteHost[0] + (`generated/seed.${section}.txt`);
    NewLog.SetTimePoint("format_end");
    return GeneratedResult;
}

// Псевдо-рандом с "от" и "до", базированный на Math.random()
function PsRand(a, b) { return Number(a) + Number(Math.floor(Math.random() * b)); }

async function Generate() {
    try {
        counter++; // +1 к счётчику
        Statistics[0]++; // +1 к глобальному счётчику

        NewLog.FixParamValue("total_generated", Statistics[0]);
        NewLog.FixParamValue("total_copied", Statistics[1]);

        localStorage.setItem("generated_int", Statistics[0]);
        NewLog.FixParamValue("count", counter);
        NewLog.SetTimePoint("begin_task");
        if (CopyButtonEl) {
            CopyButtonEl.innerHTML = CopyButtonDefaultText; // Восстанавливаем текст, который был в кнопке изначально
        }

        Public("<span style=\"color: green;\">Запрос к API...</span>"); // Замена предыдущего результата сплеш-скрином (в данном случае надпись)

        let api_request = await fetch(GetDatabaseValue("api")); // Отправляем запрос на сервер для получения конфигурации API
        let api = await api_request.text(); // Получаем текстовое содержимое ответа в виде "NAME|VERSION|MINIMUM|MAXIMUM"
        let api_arr = api.split("|"); // Разделяем ответ на составляющие в виде массива

        /* api_arr[..]
            0 - NAME
            1 - VERSION
            2 - MINIMUM
            3 - MAXIMUM */

        NewLog.FixParamValue("name", api_arr[0]);
        NewLog.FixParamValue("version", api_arr[1]);
        let seed = PsRand(api_arr[2], api_arr[3]); // Задаём сид для получения следующего ответа, используя MINIMUM и MAXIMUM

        await fetch(GetDatabaseValue(seed)).then(response => response.text()).then(code => Public(code)); // Отправляем запрос на получение ответа из базы по сиду и перенаправляем ответ в Public
    } catch (e) {
        let El = document.getElementById(Output);
        if (El) { El.innerHTML = `<pre><span style=\"color: red;\">Exception occurred:\n   ${e}</span></pre>`; }
        console.log(`%cError >>\n    ${e}`, "color: white; background: red;");
        return false;
    }
    NewLog.SetTimePoint("end_task");
    console.log("---");
    return true;
};

function Help() { // Функция справки
    let msg1 = confirm(`[<< ВАША СТАТИСТИКА >>]\n\nСгенерировано фраз: ${Statistics[0]}\nСкопировано: ${Statistics[1]}\n\nПосмотреть информацию о клиентском приложении?`);
    if (msg1) {
        alert(`(С) [Де]генератор - degenerator.ml\nВсе полученные результаты - выдумка искусственного интеллекта и не имеют ничего общего с реальностью. Любые совпадения случайны.\n\n———————————\nВерсия клиента: v${AppVer}\n———————————\nПрограммист - @DosX_Plus [Telegram]\nПомощь с JS - @lrmpsm53 [Telegram]\nПомощь с моделью - @krasniy_doshik [Telegram]\n———————————`);
    }
}