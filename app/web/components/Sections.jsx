export function Sections({ blocks }) {
  if (!blocks.length) {
    return <p>No hay contenido para mostrar.</p>;
  }
  return (
    <div className="panel">
      <div className="rows">
        {blocks.map((block) => (
          <div className="row" key={block.title}>
            <strong>{block.title}</strong>
            <p>{block.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
