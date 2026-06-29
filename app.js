const Base_url = "https://latest.currency-api.pages.dev/v1/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");

for (let select of dropdown) {

    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected"
        } else if (select.name === "To" && currCode === "INR") {
            newOption.selected = "selected"
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();

    updateCurr();
});

const updateCurr = async () => {

    let amount = document.querySelector(".amount input")
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    let url = `${Base_url}/${fromcurr.value.toLowerCase()}.json`
    let res = await axios.get(url);
    let res2 = res.data;
    let data = res2[fromcurr.value.toLowerCase()];
    let rate = data[tocurr.value.toLowerCase()];

    let finalAmount = amtVal * rate;
    let msg = document.querySelector(".msg")
    msg.innerText = `${amtVal} ${fromcurr.value}  = ${finalAmount} ${tocurr.value}`;
}

window.addEventListener("load", () => {
    updateCurr();
});
