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

1. **Klonování repozitáře:**
   ```bash
   git clone <url-vasho-repozitare>
   cd fx-rates
   ```
2. **Instalace závislostí:**
    ```
    npm install
    ```
3. **Konfigurace prostředí:** 
V kořenovém adresáři vytvořte soubor ```.env``` a vložte do něj následující parametry:
    ```
    PORT=3000
    API_KEY=secret123
    ```
### Poznámka:
Tento projekt používá ```.env``` pro správu konfigurace. Ujistěte se, že proměnné jsou správně nastaveny před spuštěním.

4. **Spuštění v režimu vývoje:**
    ```
    npm run dev
    ```
5. **Sestavení a produkční spuštění:**
    ```
    npm run build
    npm start
    ```

## Dokumentace API

Všechny požadavky (kromě healthchecku) vyžadují autorizaci pomocí hlavičky `x-api-key`.

### 1. Healthcheck
`GET /healthcheck`
- **Popis**: Slouží k ověření dostupnosti a stavu serveru.
- **Zabezpečení**: Žádné (veřejný endpoint).
- **Odpověď**: `200 OK` s obsahem `OK` (text/plain).

### 2. Kompletní kurzovní lístek
`GET /rates`
- **Popis**: Vrátí aktuální seznam všech stažených měnových kurzů vůči CZK.
- **Zabezpečení**: Vyžaduje hlavičku `x-api-key`.
- **Formát odpovědi**: Pole objektů, kde každý objekt obsahuje kód měny a její kurz.
  - *Příklad:* `[{"USD": 23.840}, {"EUR": 25.120}, ...]`.

### 3. Kurz pro konkrétní měnu
`GET /rates/:code`
- **Příklad**: `GET /rates/USD`
- **Popis**: Vrátí kurz pro jednu konkrétní měnu zadanou pomocí kódu v URL.
- **Zabezpečení**: Vyžaduje hlavičku `x-api-key`.
- **Formát odpovědi**: Objekt s vyžádanou měnou.
  - *Příklad:* `{"USD": 23.840}`.
- **Chybové stavy**: `404 Not Found` (pokud měna nebyla nalezena v mezipaměti).

---

## Autor

Tento projekt vytvořil a spravuje **Oleksii Shevchenko**.

- **LinkedIn**: [Oleksii Shevchenko](https://linkedin.com/in/oleksii-shevchenko-535ab61b8)
- **Email**: [uzlabini@gmail.com](mailto:uzlabini@gmail.com)

Máte-li jakékoli dotazy nebo připomínky, neváhejte mě kontaktovat!