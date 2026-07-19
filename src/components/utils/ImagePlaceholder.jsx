/**
 * Generic image placeholder — diagonal hatch pattern + label.
 * Swap the parent <ImagePlaceholder> for a real <Image> once assets
 * are ready. Kept as its own component so the swap is a one-line
 * change per usage site instead of hunting through markup.
 */
export default function ImagePlaceholder({ label = "Image", className = "" }) {
  return (
    <div
      className={`flex items-center justify-center bg-surface px-2 text-center font-body text-[10px] uppercase tracking-wide text-foreground-muted ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, var(--color-surface-border) 0, var(--color-surface-border) 1px, transparent 1px, transparent 12px)",
      }}
    >
      {label}
    </div>
  );
}
