# FX Rates Service

Jednoduchá backendová aplikace postavená na Node.js a TypeScriptu, která slouží k periodickému stahování kurzovního lístku a jeho poskytování prostřednictvím REST API.

## Hlavní funkce
- **Automatická aktualizace**: Aplikace každých 10 minut stahuje aktuální data z Frankfurter API (kurzy vůči CZK).
- **In-memory Cache**: Data jsou uložena v paměti aplikace. Pokud externí API selže, systém nadále poskytuje poslední úspěšně stažené kurzy.
- **Zabezpečení**: Přístup k datům o kurzech je chráněn pomocí API klíče.
- **Healthcheck**: Veřejný endpoint pro monitoring stavu aplikace.

## Technické parametry
- **Runtime**: Node.js
- **Jazyk**: TypeScript
- **Framework**: Express.js
- **HTTP Klient**: Axios

## Instalace a spuštění

1. **Klonování repozitáře**:
   ```bash
   git clone <url-vasho-repozitare>
   cd fx-rates
Instalace závislostí:

Bash
npm install
Konfigurace prostředí: V kořenovém adresáři vytvořte soubor .env a vložte do něj následující parametry:

Fragment kódu
PORT=3000
API_KEY=secret123
(Poznámka: Tento projekt používá .env pro správu konfigurace. Ujistěte se, že proměnné jsou správně nastaveny před spuštěním.)

Spuštění v režimu vývoje:

Bash
npm run dev
Sestavení a produkční spuštění:

Bash
npm run build
Bash
npm start
Dokumentace API
Healthcheck
GET /healthcheck

Popis: Ověření, že server běží.

Zabezpečení: Žádné (veřejné).

Odpověď: 200 OK (text/plain).

Kompletní kurzovní lístek
GET /rates

Popis: Vrátí pole všech aktuálních kurzů.

Zabezpečení: Vyžaduje hlavičku x-api-key.

Formát odpovědi: [{"USD": 23.84}, {"EUR": 25.12}, ...]

Kurz pro konkrétní měnu
GET /rates/:code

Příklad: GET /rates/USD

Zabezpečení: Vyžaduje hlavičku x-api-key.

Formát odpovědi: {"USD": 23.84}

Chybové stavy: 404 Not Found (pokud měna neexistuje).

Autor: [Tvoje Jméno]