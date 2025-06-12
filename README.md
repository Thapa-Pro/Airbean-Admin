# ☕ Airbean Admin API
### 📌 Projektplanering / User Stories  
[📋 Klicka här för att se mitt arbetsflöde i GitHub Project Board](https://github.com/users/Thapa-Pro/projects/2/views/1)

### 📌 Sammanfattning

Det här är mitt individuella examensprojekt för **Airbean Admin API**, med fokus på säker backend-funktionalitet byggt med:

- **Node.js**
- **Express**
- **MongoDB**
- **JWT** (token-baserad autentisering)

Utöver de tre obligatoriska admin-skyddade endpoints (för att **lägga till**, **uppdatera** och **ta bort** produkter), valde jag att lägga till två extra funktioner för att utforska hur en riktig admin-panel skulle kunna fungera:

---

### ✅ Extra Admin-funktioner

- ✅ Visa alla registrerade användare  
- ✅ Ta bort en användare med ID  
  _(_Men en admin kan **inte** radera en annan admin._)

Dessa funktioner var inte ett krav i uppgiften – jag inkluderade dem som en del av mitt eget lärande och som framtida referens. Alla endpoints är skyddade med JWT-token och rollbaserad åtkomstkontroll.

Alla endpoints är testade med **Insomnia** och dokumenterade med **Swagger UI** för att säkerställa funktionalitet och tydlig API-struktur.

---

### 🔐 Admininloggning för testning i Swagger/Insomnia/Postman
- Inloggning returnerar en JWT-token.  
- Vi användar denna token som **Bearer Token** i **Insomnia** (Auth-fliken) eller i Swagger (`Authorize`) för att testa skyddade endpoints.
```json
{ "username": "admin", "password": "admin123" }
{ "username": "JesperN", "password": "JesperN123" }
