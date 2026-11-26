import { Sections } from "../../components/Sections";
import { readText, sections, stageState } from "../../lib/workspace";

export default function ClubPage() {
  const state = stageState("01-club-context");
  const blocks = sections(readText("club-context/identity.md"));
  return (
    <>
      <p className="note">
        Etapa 01. El admin confirma canchas, horarios y reglas antes de escribir mensajes. Estado: {state.state}.
      </p>
      <Sections blocks={blocks} />
    </>
  );
}
