const RemoteHost = ["https://kay-software.ru/neuro/"];

(async function tests() {
    let req = await fetch(GetDatabaseValue("api"));
    let responsed_text = await req.text();
    let response = responsed_text.split("|");

    /*
    let Output = document.getElementById("console");
    Output.appendChild(document.createElement("div").textContent = "test");
    */
    DoProcess(response);
})();

function Log(seed, text) {
    let result = document.createElement("div");
    result.innerHTML = `[<span style=\"color: pink;\">${md5(text)}</span>][<span style=\"color: lightblue;\">${seed}</span>] \"${text}\"`;
    document.getElementById("console").appendChild(result);
    if (String(getSelection()) == "") {
        window.scrollTo(0, document.body.scrollHeight);
    }
}

function GetDatabaseValue(section) {
    let GeneratedResult = RemoteHost[0] + (`generated/seed.${section}.txt`);
    return GeneratedResult;
}

function PsRand(a, b) { return Number(a) + Number(Math.floor(Math.random() * b)); }

function DoProcess(e) {
    setInterval(() => {
        NewSeedPhrase(e);
    }, 500);
}

async function NewSeedPhrase(e) {
    let seed = PsRand(e[2], e[3]);
    let req = await fetch(GetDatabaseValue(seed));
    let responsed_text = await req.text();
    Log(seed, responsed_text);
}