# ☕ Universal Cafe — Website & Backend

**Premium café website for Universal Cafe, Jharoda Kalan, Delhi**  
Near Evergreen Public School | Coffee • Cold Drinks • Snacks • Bakery

---

## 📁 Folder Structure

```
universal-cafe/
├── index.html              ← Main website (all pages in one file)
├── css/
│   └── styles.css          ← Premium CSS (dark mode, animations, responsive)
├── js/
│   └── main.js             ← JavaScript (carousel, dark mode, form, scroll)
├── assets/
│   ├── logo.svg            ← Custom vector logo
│   └── favicon.svg         ← Browser favicon
└── backend/                ← Spring Boot REST API
    ├── pom.xml
    └── src/main/java/com/universalcafe/
        ├── UniversalCafeApplication.java
        ├── ReservationController.java
        └── ReservationRequest.java
```

---

## 🚀 Hosting on GitHub Pages (Free)

### Step 1: Create a GitHub Repository
```bash
git init
git add .
git commit -m "Initial commit: Universal Cafe website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/universal-cafe.git
git push -u origin main
```

### Step 2: Enable GitHub Pages
1. Go to your repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / `root`
4. Click **Save**
5. Your site goes live at: `https://YOUR_USERNAME.github.io/universal-cafe/`

### Step 3: Custom Domain (optional)
- Add a `CNAME` file in the root with: `universalcafe.in`
- Point your domain's DNS A records to GitHub Pages IPs

---

## 🔧 Before Going Live — Checklist

- [ ] Replace `+91-XXXXXXXXXX` with your real phone number everywhere in `index.html`
- [ ] Update WhatsApp links with real number (wa.me/91REALNUMBER)
- [ ] Replace `hello@universalcafe.in` with real email
- [ ] Update Google Maps embed URL with actual café coordinates
- [ ] Add real photos by replacing the SVG emoji placeholders in `.gallery-bg` with real image URLs:
  ```css
  .gallery-item:nth-child(1) .gallery-bg {
    background-image: url('assets/cafe-interior.jpg');
  }
  ```
- [ ] Add real logo PNG at `assets/logo.png` for better compatibility
- [ ] Update meta tags `og:image` with a real cafe photo URL

---

## 🌙 Dark Mode

The dark mode toggle works automatically:
- Click the sun/moon button in the nav
- State persists via `localStorage`
- Respects OS preference on first load (`prefers-color-scheme`)

---

## ☕ Running the Spring Boot Backend

### Prerequisites
- Java 17+
- Maven 3.8+

### Run
```bash
cd backend
mvn spring-boot:run
```
API will be at: `http://localhost:8080/api`

### Endpoints
| Method | URL                  | Description             |
|--------|----------------------|-------------------------|
| POST   | `/api/reservations`  | Submit table booking    |
| GET    | `/api/reservations`  | List all reservations   |
| GET    | `/api/health`        | Health check            |

### Connect Frontend to Backend
In `js/main.js`, find `fakeDelay(1500)` and replace with:
```js
await fetch('http://localhost:8080/api/reservations', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(getFormData(form))
});
```

### Production Database (MySQL)
In `application.properties`, replace H2 config with:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/universalcafe
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```
And add to `pom.xml`:
```xml
<dependency>
  <groupId>com.mysql</groupId>
  <artifactId>mysql-connector-j</artifactId>
  <scope>runtime</scope>
</dependency>
```

---

## 🎨 Brand Colors

| Color            | Hex       | Usage            |
|------------------|-----------|------------------|
| Deep Coffee Brown| `#4E342E` | Primary brand    |
| Warm Cream       | `#FFF8EE` | Backgrounds      |
| Soft Tan         | `#D7B49E` | Accents, borders |
| Olive Green      | `#8A9A5B` | CTAs, highlights |
| Text Charcoal    | `#2A2A2A` | Body text        |

---

## 📞 Support

Built for **Universal Cafe**, Jharoda Kalan, Delhi.  
For queries, reach us at: `hello@universalcafe.in`

---

*© 2025 Universal Cafe. All Rights Reserved.*
