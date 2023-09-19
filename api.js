/*
    (C) Kay Software
    Coded by @DosX_Plus (Telegram)
*/

const Config = { // Конфигурация клиентского приложения
    Version: 2.7,
    RemoteHost: ["https://kay-software.ru/neuro/", "fun.devs.cf", "fun.devs.cf"],
    Output: "de-generator-result",
    CopyButton: "copy"
}

var StatDB = { // Локальная база данных со статистикой юзера (подгружается в OnLoad)
    Generated: 0,
    Copied: 0
}

var __StatDB = { // Временная БД для учёта последней активности
    Generated: 0,
    Copied: 0
}

let CopyButtonDefaultText;
let CopyButtonEl = document.getElementById(Config.CopyButton);

const NewLog = {
    SetTimePoint(OperationName) { // Временная метка (измеряем производительность и начало каждой базовой операции)
        // "OperationName:__StatDB.Generated":"Hours:Minutes:Seconds,Milliseconds"
        let LogsDate = new Date();
        console.log(`  %c\"%c${OperationName}%c:%c${__StatDB.Generated}\%c":\"%c${LogsDate.getHours()}:${LogsDate.getMinutes()}:${LogsDate.getSeconds()},${LogsDate.getMilliseconds()}\%c"`,
            "color: white;", "color: gray;", "color: white;", "color: lightblue;", "color: white;", "color: gray;", "color: white;");
    },
    FixParamValue(OperationName, OperationValue) { // Фиксируем значения окружения
        // "OperationName:__StatDB.Generated":"OperationValue"
        console.log(`%c\"%c${OperationName}%c:%c${__StatDB.Generated}\%c":\"%c${OperationValue}%c"`,
            "color: white;", "color: #fffdd0;", "color: white;", "color: lightblue;", "color: white;", "color: lightgray;", "color: white;");
    }
};
(function OnLoad() {
    StatDB.Generated = Number(localStorage.getItem("generated_int")); // Всего прокликано
    StatDB.Copied = Number(localStorage.getItem("copied_int")); // Всего скопировано
    if (CopyButtonEl) {
        CopyButtonDefaultText = CopyButtonEl.textContent; // Запоминаем текст кнопки копирования результата
    }
    // --- custom userAgent
    let staticUserAgent = navigator.userAgent;
    navigator.__defineGetter__("userAgent", function() { return (document.domain + " (Client-Side) ") + staticUserAgent });
    // ---
    console.log("%c(C) Kay Software\nCoded by @DosX_Plus (Telegram)", "color: yellow;");
    NewLog.SetTimePoint("begin");
    NewLog.FixParamValue("appversion", Config.Version);
    NewLog.FixParamValue("local", navigator.userAgent); // Свойство [UserAgent] "Идентификатор клиента"
    NewLog.FixParamValue("donottrack", Boolean(navigator.doNotTrack)); // Свойство [DoNotTrack] "Не отслеживать"
    Generate();
})();

function Public(ClientResponse) { // Экранирование результата в текстовом виде
    let El = document.getElementById(Config.Output);
    if (El) { El.innerHTML = ClientResponse; }
    if (!ClientResponse.includes("span")) { NewLog.FixParamValue("response", ClientResponse) }
    return true;
}

function GetDatabaseValue(section) { // Форматируем текст для запроса
    // "api" => "https://kay-software.ru/neuro/generated/seed.api.txt"
    NewLog.SetTimePoint("format_begin");
    NewLog.FixParamValue("request", section);
    let GeneratedResult = Config.RemoteHost[0] + (`generated/seed.${section}.txt`);
    NewLog.SetTimePoint("format_end");
    return GeneratedResult;
}

// Псевдо-рандом с "от" и "до", базированный на Math.random()
function PsRand(a, b) { return Number(a) + Number(Math.floor(Math.random() * b)); }

async function Generate() {
    try {
        __StatDB.Generated++; // +1 к счётчику
        StatDB.Generated++; // +1 к глобальному счётчику

        NewLog.FixParamValue("total_generated", StatDB.Generated);
        NewLog.FixParamValue("total_copied", StatDB.Copied);

        localStorage.setItem("generated_int", StatDB.Generated);
        NewLog.FixParamValue("count", __StatDB.Generated);
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
        let El = document.getElementById(Config.Output);
        if (El) { El.innerHTML = `<pre style="white-space: pre-wrap;"><span style=\"color: red;\">Exception occurred:\n   ${e}</span></pre>`; }
        console.error(`%cError >>\n    ${e}`, "color: white; background: red;");
        return false;
    }
    NewLog.SetTimePoint("end_task");
    console.log("---");
    return true;
};

function Help() { // Функция справки
    let msg1 = confirm(`◉ ГЛОБАЛЬНАЯ СТАТИСТИКА\n ○ Сгенерировано фраз: ${StatDB.Generated}\n ○ Скопировано: ${StatDB.Copied}\n\n◉ ПОСЛЕДНЯЯ АКТИВНОСТЬ\n ○ Сгенерировано фраз: ${__StatDB.Generated}\n ○ Скопировано: ${__StatDB.Copied}\n\nОткрыть информацию о версии?`);
    if (msg1) {
        alert(`(С) [Де]генератор - degenerator.ml\nВсе полученные результаты - выдумка искусственного интеллекта и не имеют ничего общего с реальностью. Любые совпадения случайны.\n\nВерсия клиента: v${Config.Version}\n———————————\nПрограммист - @DosX_Plus [Telegram]\nПомощь с JS - @lrmpsm53 [Telegram]\nПомощь с моделью - @krasniy_doshik [Telegram]\nХороший донатер - @horsicq [Telegram]\n———————————`);
    }
}

function CopyResult() { // Функция для копирования полученного результата
    navigator.clipboard.writeText(`[Де]генератор (${Config.RemoteHost[1]}):\n` + document.getElementById(Config.Output).textContent);
    document.getElementById("copy").innerHTML = "Скопировано!";
    StatDB.Copied++; // +1 к глобальному счётчику
    __StatDB.Copied++; // Статистика для текущей сессии
    localStorage.setItem("copied_int", StatDB.Copied); // Запоминаем значение
    NewLog.SetTimePoint("copied");
}

// В случае использования клиентской версии приложения на сервере, не имеющим указанный домен - появляется сообщение с предлогом посетить оригинальную страницу.
(function AnotherHosting(defaultDomain) {
    if (document.domain !== defaultDomain && document.domain !== "") {
        if (!localStorage.getItem("another_domain_message")) {
            let question = confirm(`Вы перешли на страницу модифицированной версии [Де]генератора: https://${Config.RemoteHost[2]}/\n\nНе желаете ли посетить официальную версию клиента?`);
            if (question) {
                location = `https://${Config.RemoteHost[2]}`;
            }
            localStorage.setItem("another_domain_message", true);
        }
    }
})(Config.RemoteHost[2]);
