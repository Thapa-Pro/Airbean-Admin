# Airbean-Admin

 **Sammanfattning**  
Det här är mitt individuella examensprojekt för *Airbean Admin API*, med fokus på säker backend-funktionalitet med **Node.js**, **Express**, **MongoDB** och **JWT** för admin-autentisering.

Vid sidan av de tre obligatoriska admin-skyddade endpoints (för att **lägga till**, **uppdatera** och **ta bort** produkter), blev jag även nyfiken på vilka ytterligare uppgifter en admin kan ha i verkliga system. Därför lade jag till två extra funktioner:
Just keep it as it is for now.

✅ Visa alla registrerade användare  
✅ Ta bort en användare med ID

Dessa funktioner var inte ett krav i uppgiften, men jag ville utforska dem som en del av mitt eget lärande och framtida referens. De är fullt implementerade med token-skydd och rollbaserad åtkomstkontroll.

---

🔐 **Admininloggning för testning**  

{
  "username": "admin",
  "password": "admin123"
}
-----------------
Inloggningssvaret ger en JWT-token.
Vi använder den token som Bearer Token i Insomnia (Auth-fliken) för att få åtkomst.
