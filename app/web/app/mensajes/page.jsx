import { Sections } from "../../components/Sections";
import { readText, sections, stageState } from "../../lib/workspace";

export default function MensajesPage() {
  const state = stageState("02-messages");
  const voice = sections(readText("shared/message-voice.md")).filter((block) =>
    ["Hard Constraints", "Sentence Rules", "Pacing"].includes(block.title)
  );
  const modes = sections(readText("shared/flow-modes.md"));
  return (
    <>
      <p className="note">
        Etapa 02. El texto se muestra acá y se publica en Kapso solo después de la aprobación. Estado: {state.state}.
      </p>
      <div className="rows">
        <Sections blocks={voice} />
        <Sections blocks={modes} />
      </div>
    </>
  );
}
