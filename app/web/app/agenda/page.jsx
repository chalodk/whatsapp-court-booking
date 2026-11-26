import { readText, stageState } from "../../lib/workspace";

export default function AgendaPage() {
  const send = stageState("04-send-test");
  const rules = readText("shared/booking-rules.md");
  const goal = rules.split("## Goal")[1]?.split("##")[0]?.trim();
  return (
    <>
      <p className="note">
        Pantalla fija. Muestra canchas por hora cuando existe el plan de envío. Estado del plan: {send.state}.
      </p>
      <div className="panel">
        <h2>Hoy</h2>
        <p>{goal || "La agenda se llena con las reglas de reserva del club."}</p>
        <p>Todavía no hay reservas escritas sobre la base del club.</p>
      </div>
    </>
  );
}
