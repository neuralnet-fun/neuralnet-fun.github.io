const Config={Version:2.7,RemoteHost:["https://kay-software.ru/neuro/","de-gen.ml","degenerator.ml"],Output:"de-generator-result",CopyButton:"copy"};var StatDB={Generated:0,Copied:0},__StatDB={Generated:0,Copied:0};let CopyButtonDefaultText,CopyButtonEl=document.getElementById(Config.CopyButton);const NewLog={SetTimePoint(e){let t=new Date;console.log(`  %c"%c${e}%c:%c${__StatDB.Generated}%c":"%c${t.getHours()}:${t.getMinutes()}:${t.getSeconds()},${t.getMilliseconds()}%c"`,"color: white;","color: gray;","color: white;","color: lightblue;","color: white;","color: gray;","color: white;")},FixParamValue(e,t){console.log(`%c"%c${e}%c:%c${__StatDB.Generated}%c":"%c${t}%c"`,"color: white;","color: #fffdd0;","color: white;","color: lightblue;","color: white;","color: lightgray;","color: white;")}};function Public(e){let t=document.getElementById(Config.Output);return t&&(t.innerHTML=e),e.includes("span")||NewLog.FixParamValue("response",e),!0}function GetDatabaseValue(e){NewLog.SetTimePoint("format_begin"),NewLog.FixParamValue("request",e);e=Config.RemoteHost[0]+`generated/seed.${e}.txt`;return NewLog.SetTimePoint("format_end"),e}function PsRand(e,t){return Number(e)+Number(Math.floor(Math.random()*t))}async function Generate(){try{__StatDB.Generated++,StatDB.Generated++,NewLog.FixParamValue("total_generated",StatDB.Generated),NewLog.FixParamValue("total_copied",StatDB.Copied),localStorage.setItem("generated_int",StatDB.Generated),NewLog.FixParamValue("count",__StatDB.Generated),NewLog.SetTimePoint("begin_task"),CopyButtonEl&&(CopyButtonEl.innerHTML=CopyButtonDefaultText),Public('<span style="color: green;">Запрос к API...</span>');let e=await fetch(GetDatabaseValue("api")),t=await e.text();var o=t.split("|"),n=(NewLog.FixParamValue("name",o[0]),NewLog.FixParamValue("version",o[1]),PsRand(o[2],o[3]));await fetch(GetDatabaseValue(n)).then(e=>e.text()).then(e=>Public(e))}catch(e){let t=document.getElementById(Config.Output);return t&&(t.innerHTML=`<pre style="white-space: pre-wrap;"><span style="color: red;">Exception occurred:
   ${e}</span></pre>`),console.error(`%cError >>
    `+e,"color: white; background: red;"),!1}return NewLog.SetTimePoint("end_task"),console.log("---"),!0}function Help(){confirm(`◉ ГЛОБАЛЬНАЯ СТАТИСТИКА
 ○ Сгенерировано фраз: ${StatDB.Generated}
 ○ Скопировано: ${StatDB.Copied}

◉ ПОСЛЕДНЯЯ АКТИВНОСТЬ
 ○ Сгенерировано фраз: ${__StatDB.Generated}
 ○ Скопировано: ${__StatDB.Copied}

Открыть информацию о версии?`)&&alert(`(С) [Де]генератор - degenerator.ml
Все полученные результаты - выдумка искусственного интеллекта и не имеют ничего общего с реальностью. Любые совпадения случайны.

Версия клиента: v${Config.Version}
———————————
Программист - @DosX_Plus [Telegram]
Помощь с JS - @lrmpsm53 [Telegram]
Помощь с моделью - @krasniy_doshik [Telegram]
Хороший донатер - @horsicq [Telegram]
———————————`)}function CopyResult(){navigator.clipboard.writeText(`[Де]генератор (${Config.RemoteHost[1]}):
`+document.getElementById(Config.Output).textContent),document.getElementById("copy").innerHTML="Скопировано!",StatDB.Copied++,__StatDB.Copied++,localStorage.setItem("copied_int",StatDB.Copied),NewLog.SetTimePoint("copied")}function openInNewTab(e){Object.assign(document.createElement("a"),{target:"_blank",rel:"noopener noreferrer",href:e}).click()}!function(){StatDB.Generated=Number(localStorage.getItem("generated_int")),StatDB.Copied=Number(localStorage.getItem("copied_int")),CopyButtonEl&&(CopyButtonDefaultText=CopyButtonEl.textContent);let e=navigator.userAgent;navigator.__defineGetter__("userAgent",function(){return document.domain+" (Client-Side) "+e}),console.log("%c(C) Kay Software\nCoded by @DosX_Plus (Telegram)","color: yellow;"),NewLog.SetTimePoint("begin"),NewLog.FixParamValue("appversion",Config.Version),NewLog.FixParamValue("local",navigator.userAgent),NewLog.FixParamValue("donottrack",Boolean(navigator.doNotTrack)),Generate()}(),function(e){document.domain===e||""===document.domain||localStorage.getItem("another_domain_message")||(confirm(`Вы перешли на страницу модифицированной версии [Де]генератора: https://${Config.RemoteHost[2]}/

Не желаете ли посетить официальную версию клиента?`)&&openInNewTab("https://"+Config.RemoteHost[2]),localStorage.setItem("another_domain_message",!0))}(Config.RemoteHost[2]);