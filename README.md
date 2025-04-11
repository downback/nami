# 🎨 Tattoo Artist Booking Website

An interactive booking website for a tattoo artist that blends art and technology through immersive 3D visuals and a custom booking experience. Built as a solo project, this app combines creative design with real-time backend functionality, using modern web technologies.

---

## 🚀 Live Demo

🌐 [Live Site]([https://your-live-link.com](https://nami-tattoo.web.app/))  

---

## 🧠 Features

- 🎨 3D interactive landing page with React Three Fiber
- 🗓️ Real-time booking system with Firebase backend
- 🖼️ Client-manageable portfolio (image upload and availability control)
- 📱 Fully responsive and mobile-friendly design
- 🔐 Secure access with Firebase Authentication

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Three Fiber (Three.js wrapper for React)
- GSAP

### Backend
- Node.js
- Express.js
- Firebase (Firestore, Authentication, Storage)

### Deployment & Tools
- Firebase Hosting
- Google Cloud
- Git & GitHub

---

## 📦 Installation & Setup

To run this project locally:

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/tattoo-booking-site.git
cd tattoo-booking-site
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure Firebase:**

- Create a Firebase project at [firebase.google.com](https://firebase.google.com)
- Enable Firestore, Authentication, and Storage
- Replace the Firebase config in your code with your own credentials  
  *(usually located in a file like `firebaseConfig.js` or `.env`)*

4. **Run the development server:**

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

---

## 🗂️ Project Structure

```
/client           → React frontend (includes R3F and UI)
/server           → Node.js + Express backend (API routes)
/firebase         → Firebase setup and deployment configs
/public           → Static assets
```

---

## © License

This project is licensed under the @downback.
