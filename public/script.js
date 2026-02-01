async function searchCurrency() {

  const inputElement = document.getElementById("currencyInput");
  const code = inputElement.value.trim().toUpperCase();
  
  const errorMsg = document.getElementById("errorMsg");
  errorMsg.innerText = "";

  if (!code) return;

  try {
     // POZNÁMKA: V reálné produkční aplikaci by tento klíč nebyl přímo v kódu frontendu. 
     // Pro účely testovacího zadání jej zde uvádím, aby byla demonstrována funkčnost autorizace.
    const response = await fetch(`/rates/${code}`, {
      headers: { "x-api-key": "secret123" },
    });

    if (response.status === 404) {
      errorMsg.innerText = `Měna ${code} nebyla nalezena.`;
      return;
    }

    const data = await response.json();
    const tbody = document.querySelector("#ratesTable tbody");

    tbody.innerHTML = `<tr><td><strong>${code}</strong></td><td>${data[code].toFixed(4)}</td></tr>`;
    document.getElementById("lastUpdate").innerText = "Zobrazen filtr: " + code;
    
    inputElement.value = "";

  } catch (err) {
    console.error("Chyba:", err);
    errorMsg.innerText = "Chyba při komunikaci se serverem.";
  }
}
async function fetchRates() {
  try {
    const response = await fetch("/rates", {
      headers: { "x-api-key": "secret123" },
    });
    const data = await response.json();

    const tbody = document.querySelector("#ratesTable tbody");
    tbody.innerHTML = "";

    data.forEach((item) => {
      const code = Object.keys(item)[0];
      const rate = item[code];
      const row = `<tr><td><strong>${code}</strong></td><td>${rate.toFixed(4)}</td></tr>`;
      tbody.innerHTML += row;
    });

    document.getElementById("lastUpdate").innerText =
      "Poslední aktualizace: " + new Date().toLocaleTimeString();
  } catch (err) {
    console.error("Chyba při načítání:", err);
  }
}
fetchRates();
