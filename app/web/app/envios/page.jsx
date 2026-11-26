import { pipeline } from "../../lib/workspace";

export default function EnviosPage() {
  const stages = pipeline();
  const ready = stages.slice(0, 3).every((stage) => stage.state === "COMPLETE");
  return (
    <>
      <p className="note">
        Etapa 04. La prueba sale al teléfono del admin. El horario en vivo queda para después de esa prueba.
      </p>
      <div className="panel">
        <h2>{ready ? "Listo para la prueba" : "Faltan etapas anteriores"}</h2>
        <ul>
          {stages.map((stage) => (
            <li key={stage.slug}>
              {stage.label}: {stage.state}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
