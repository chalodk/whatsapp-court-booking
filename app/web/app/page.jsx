import Link from "next/link";
import { pipeline } from "../lib/workspace";

export default function HomePage() {
  const stages = pipeline();
  return (
    <>
      <p className="note">
        Vista local del workspace. Kapso y Supabase todavía no están conectados. Cada tarjeta abre la pantalla de esa etapa.
      </p>
      <div className="grid">
        {stages.map((stage) => (
          <Link key={stage.slug} href={stage.href} className="card">
            <span className={`badge ${stage.state === "COMPLETE" ? "complete" : "pending"}`}>
              {stage.state}
            </span>
            <h2>{stage.label}</h2>
            <p>
              {stage.files.length > 0
                ? stage.files.join(", ")
                : "Todavía no hay archivo de salida."}
            </p>
          </Link>
        ))}
        <Link href="/agenda" className="card">
          <span className="badge pending">PANTALLA</span>
          <h2>Agenda</h2>
          <p>Horas libres y reservas. Se usa después del plan de envío.</p>
        </Link>
      </div>
    </>
  );
}
