export default function Icon({ name, width = 24, height = 24 }) {
  const spriteUrl = `${import.meta.env.BASE_URL}src/assets/icons/sprite.svg`;

  return (
    <svg
      width={width}
      height={height}
      style={{ color: "inherit" }}
    >
      <use href={`${spriteUrl}#${name}`} />
    </svg>
  );
}