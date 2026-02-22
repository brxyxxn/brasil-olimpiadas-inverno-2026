export function BrazilFlag({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 504" className={className} aria-label="Bandeira do Brasil">
      <rect width="720" height="504" fill="#009c3b" rx="8" />
      <polygon points="360,42 668,252 360,462 52,252" fill="#ffdf00" />
      <circle cx="360" cy="252" r="120" fill="#002776" />
      <path
        d="M 232 252 Q 360 180 488 252"
        fill="none"
        stroke="#fff"
        strokeWidth="14"
      />
    </svg>
  );
}
