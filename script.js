import { countries } from "./codes";

const URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const countrySelectFrom = document.querySelector("#curr_select_from");
const countrySelectTo = document.querySelector("#curr_select_to");
const btn = document.querySelector(".ex_btn");
const fromCurr = document.querySelector("#curr_select_from");
const toCurr = document.querySelector("#curr_select_to");
const msg = document.querySelector(".msg_container");
countries.forEach((count) => {
  [countrySelectFrom, countrySelectTo].forEach((ele) => {
    const option = document.createElement("option");
    option.value = count.countryCode;
    option.text = `${count.country} (${count.currencyCode})`;
    ele.appendChild(option);
  });
});

const defaultFromCurrencyCode = "USD";
const defaultToCurrencyCode = "INR";

countrySelectFrom.value = countries.find(
  (e) => e.currencyCode === defaultFromCurrencyCode
).countryCode;
countrySelectTo.value = countries.find(
  (e) => e.currencyCode === defaultToCurrencyCode
).countryCode;

countrySelectFrom.addEventListener("change", (event) => {
  updateFlag(event.target);
  calculateExchangeRate();
});
countrySelectTo.addEventListener("change", (event) => {
  updateFlag(event.target);
  calculateExchangeRate();
});

const updateFlag = (selectElement) => {
  const selectedCountryCode = selectElement.value;
  const newSrc = `https://flagsapi.com/${selectedCountryCode}/flat/64.png`;
  const img = selectElement.parentElement.querySelector("img");
  img.src = newSrc;
};

const calculateExchangeRate = async () => {
  let amount = document.querySelector("#input");
  let amtValue = amount.value;
  if (amtValue === "" || amtValue < 1) {
    amtValue = 1;
    amount.value = "1";
  }

  const fromCurrency = countries.find(
    (e) => e.countryCode === fromCurr.value
  ).currencyCode;
  const toCurrency = countries.find(
    (e) => e.countryCode === toCurr.value
  ).currencyCode;

  const URL2 = `${URL}/${fromCurrency.toLowerCase()}.json`;

  let response = await fetch(URL2);
  let data = await response.json();
  let from = fromCurrency.toLowerCase();
  let to = toCurrency.toLowerCase();
  let rate = data[from][to];
  let finalAmount = amtValue * rate;

  msg.innerText = `${amtValue} ${fromCurrency} = ${finalAmount} ${toCurrency}`;
};

btn.addEventListener("click", async (event) => {
  let amount = document.querySelector("#input");
  let amtValue = amount.value;
  if (amtValue === "" || amtValue < 1) {
    amtValue = 1;
    amount.value = "1";
  }
  const fromCurrency = countries.find(
    (e) => e.countryCode === fromCurr.value
  ).currencyCode;
  const toCurrency = countries.find(
    (e) => e.countryCode === toCurr.value
  ).currencyCode;
  console.log(fromCurrency);
  console.log(toCurrency);

  const URL2 = ` ${URL}/${fromCurrency.toLowerCase()}.json`;

  let response = await fetch(URL2);
  let data = await response.json();
  let from = fromCurrency.toLowerCase();
  let to = toCurrency.toLowerCase();
  let rate = data[from][to];
  let finalAmount = amtValue * rate;

  msg.innerText = `${amtValue} ${fromCurrency} = ${finalAmount} ${toCurrency}`;
});
