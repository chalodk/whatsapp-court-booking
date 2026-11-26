import "./globals.css";

export const metadata = {
  title: "Canchas",
  description: "El agente del club, por chat",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <div className="shell">
          <header className="top">
            <div className="brand">
              <strong>Canchas</strong>
              <span>Agente de la semana</span>
            </div>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
