interface SectionDividerProps {
  fromBg: "white" | "gray" | "dark";
  toBg: "white" | "gray" | "dark";
  flip?: boolean;
}

const fillClass: Record<string, string> = {
  white: "fill-white dark:fill-slate-900",
  gray: "fill-slate-50 dark:fill-slate-950",
  dark: "fill-[#0A1A2F]",
};

const bgClass: Record<string, string> = {
  white: "bg-white dark:bg-slate-900",
  gray: "bg-slate-50 dark:bg-slate-950",
  dark: "bg-[#0A1A2F]",
};

export function SectionDivider({ fromBg, toBg, flip }: SectionDividerProps) {
  return (
    <div
      className={`relative w-full overflow-hidden leading-[0] ${bgClass[fromBg]} ${flip ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <svg
        className={`relative block w-full h-[40px] md:h-[60px] ${fillClass[toBg]}`}
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0,60 C200,0 400,50 600,30 C800,10 1000,55 1200,20 L1200,60 Z" />
      </svg>
    </div>
  );
}
