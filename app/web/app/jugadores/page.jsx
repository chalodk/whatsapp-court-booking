import { Sections } from "../../components/Sections";
import { readText, sections, stageState } from "../../lib/workspace";

export default function JugadoresPage() {
  const state = stageState("03-players");
  const blocks = sections(readText("shared/player-schema.md")).filter((block) =>
    ["Sheet columns", "Record", "Rules"].includes(block.title)
  );
  return (
    <>
      <p className="note">
        Etapa 03. La nómina entra por Excel o CSV. Estado: {state.state}.
      </p>
      <Sections blocks={blocks} />
    </>
  );
}
