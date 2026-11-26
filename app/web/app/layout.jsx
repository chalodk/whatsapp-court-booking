import "./globals.css";
import { Nav } from "../components/Nav";

export const metadata = {
  title: "Canchas",
  description: "Invitaciones y agenda de canchas por WhatsApp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <div className="shell">
          <header className="top">
            <div className="brand">
              <strong>Canchas</strong>
              <span>Invitaciones y agenda por WhatsApp</span>
            </div>
            <Nav />
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
