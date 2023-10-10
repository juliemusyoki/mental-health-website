document.addEventListener('DOMContentLoaded', () => {
  // Show the welcome popup on page load
  showWelcomePopup();

  // Add event listener to the convert button
  const convertBtn = document.getElementById('convertBtn');
  convertBtn.addEventListener('click', () => {
    convertCurrency();
  });

  // Fetch available currencies and populate the dropdowns
  fetchCurrencies();
});

async function convertCurrency() {
  const amount = parseFloat(document.getElementById('amount').value);
  const fromCurrency = document.getElementById('from').value;
  const toCurrency = document.getElementById('to').value;

  // Replace YOUR_APP_ID with your actual API key
  const apiKey = ' fcf06541d5c434e1d0b556a9';

  const apiUrl = 'https://v6.exchangerate-api.com/v6/fcf06541d5c434e1d0b556a9/latest/USD';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const resultElement = document.getElementById('result');
    if (data[`${fromCurrency}_${toCurrency}`]) {
      const conversionRate = data[`${fromCurrency}_${toCurrency}`];
      const convertedAmount = amount * conversionRate;
      resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    } else {
      resultElement.textContent = 'Conversion failed. Please try again.';
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    const resultElement = document.getElementById('result');
    resultElement.textContent = 'An error occurred. Please try again later.';
  }
}

function showWelcomePopup() {
  const welcomePopup = document.getElementById('welcomePopup');
  welcomePopup.style.display = 'flex';
}

function closeWelcomePopup() {
  const welcomePopup = document.getElementById('welcomePopup');
  welcomePopup.style.display = 'none';
}



document.addEventListener('DOMContentLoaded', () => {
  // Add event listener to the convert button
  const convertBtn = document.getElementById('convertBtn');
  convertBtn.addEventListener('click', () => {
    convertCurrency();
  });

  // Fetch available currencies and populate the dropdowns
  fetchCurrencies();
});

async function fetchCurrencies() {
  // Fetch currency data from a free API (replace with your preferred API)
  const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
  const data = await response.json();

  const fromCurrencyDropdown = document.getElementById('from');
  const toCurrencyDropdown = document.getElementById('to');

  // Populate the dropdowns with currency options
  for (const currency in data.rates) {
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');
    option1.value = currency;
    option1.textContent = currency;
    option2.value = currency;
    option2.textContent = currency;

    fromCurrencyDropdown.appendChild(option1);
    toCurrencyDropdown.appendChild(option2);
  }
}

async function convertCurrency() {
  const amount = parseFloat(document.getElementById('amount').value);
  const fromCurrency = document.getElementById('from').value;
  const toCurrency = document.getElementById('to').value;

  const response = await fetch(`https://api.exchangerate-api.com/v4/convert/${amount}/${fromCurrency}/${toCurrency}`);
  const data = await response.json();

  const resultElement = document.getElementById('result');
  if (data.result) {
    resultElement.textContent = `${amount} ${fromCurrency} = ${data.result} ${toCurrency}`;
  } else {
    resultElement.textContent = 'Conversion failed. Please try again.';
  }
}
