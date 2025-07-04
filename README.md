# FJSX24-Backendutveckling-Vecka23
Individuell examinations start + (Eventuella repetitions lektioner)

# Swing notes API

# Database Structure
This projects database has a dbdiagram [db.diagram.io](https://dbdiagram.io/d/SwingNotesAPI-Sebastian-Ritschewald-684b215c1dff20a534d2e8a3)

## Instruktioner

Du ska i denna individuella inlämningsuppgift göra ett API för att spara anteckningar.

### Endpoints

Alla endpoints förutom skapa konto kräver att man är inloggad.

|  Endpoint |  Metod |  Beskrivning |
|---|---|---|
| `/api/notes` | `GET` | Hämta anteckningar |
| `/api/notes` | `POST` | Spara en anteckning |
| `/api/notes` | `PUT` | Ändra en anteckning |
| `/api/notes` | `DELETE` | Ta bort en anteckning |
| `/api/user/signup` | `POST` | Skapa konto |
| `/api/user/login` | `POST` | Logga in |
| `/api/notes/search` | `GET` | Söka bland anteckningar (VG-krav). Sökning sker på titel. |

**Note - objekt**

Du får lägga till egenskaper men inte ta bort något.

| Nyckel | Värde | Beskrivning |
|---|---|---|
| `id` | `String` | Ett genererat ID för denna anteckning. |
| `title` | `String` |  Titeln på anteckningen. Max 50 tecken. |
| `text` | `String` | Själva anteckningstexten, max 300 tecken. |
| `createdAt` | `Date` | När anteckningen skapades. |
| `modifiedAt` | `Date` | När anteckningen sist modifierades. |

### Felhantering

Alla API-resurser ska returnera JSON eller en HTTP statuskod, dessa är exempel, finns det bättre statuskoder att använda, gör det:

**200 (OK)** - Om servern lyckats med att göra det som resursen motsvarar.

**400 (Bad request)** - Om requestet är felaktigt gjort, så att servern inte kan fortsätta. Exempel: Att frontend skickar med 
felaktig data i body till servern.

**404 (Not found)** - Om resursen eller objektet som efterfrågas inte finns.

**500 (internal server error)** - Om ett fel inträffar på servern. Använd catch för att fånga det.

## Betygskriterier

**För Godkänt:**
* Alla endpoints finns med.
* Allt sparas i en PostgreSQL-databas.
* Det finns API-dokumentation i Swagger.
* JSON Web token används för att skapa en inloggad session.
* Lösenord är hashade med `bcryptjs`.

**För Väl Godkänt:**
* VG-kravet för att söka bland anteckningar är uppfyllt.

## Inlämning

Inlämning sker på Canvas med en länk till ditt Github repo med din kod senast fredag **20/6 23:59**.

## Redovisningar

De sker under lektions tid på tisdag 17/6 - torsdag 19/6. 
