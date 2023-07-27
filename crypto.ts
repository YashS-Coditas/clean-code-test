const searchBtn = document.getElementById("searchBtn") as HTMLButtonElement;
const cryptoInput = document.getElementById("cryptoInput") as HTMLInputElement;
const cryptoInfo = document.querySelector(".crypto-info") as HTMLElement;

const apiKey: string = "YOUR_COINGECKO_API_KEY";
const apiBaseUrl: string = "https://api.coingecko.com/api/v3";

searchBtn.addEventListener("click", async () => {
  const cryptoSymbol: string = cryptoInput.value.trim().toUpperCase();

  if (cryptoSymbol === "") {
    cryptoInfo.textContent = "Please enter a cryptocurrency symbol.";
    return;
  }

  try {
    const response = await fetch(`${apiBaseUrl}/coins/${cryptoSymbol}`);
    if (!response.ok) {
      cryptoInfo.textContent = "Invalid cryptocurrency symbol.";
      return;
    }

    const data = await response.json();
    displayCryptoInfo(data);
  } catch (error) {
    console.error(error);
    cryptoInfo.textContent = "An error occurred while fetching data.";
  }
});

function displayCryptoInfo(data: any): void {
  cryptoInfo.innerHTML = `
    <h2>${data.name} (${data.symbol.toUpperCase()})</h2>
    <p>Current Price: $${data.market_data.current_price.usd.toFixed(2)}</p>
    <p>Market Cap: $${data.market_data.market_cap.usd.toFixed(2)}</p>
    <p>24h Volume: $${data.market_data.total_volume.usd.toFixed(2)}</p>
    <h3>Price Changes (Last 24 hours)</h3>
    <p>1h Change: ${data.market_data.price_change_percentage_1h.toFixed(2)}%</p>
    <p>24h Change: ${data.market_data.price_change_percentage_24h.toFixed(
      2
    )}%</p>
    <p>7d Change: ${data.market_data.price_change_percentage_7d.toFixed(2)}%</p>
    <!-- Add more time intervals for price changes as needed -->
  `;
}
