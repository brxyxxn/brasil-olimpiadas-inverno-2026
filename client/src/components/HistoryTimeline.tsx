import { motion } from "framer-motion";
import { Flag, Users, Award, Star, Trophy, Snowflake } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface HistoryEntry {
  year: number;
  city: string;
  athletes: number;
  sports: string[];
  highlight: string;
  icon: "flag" | "users" | "award" | "star" | "trophy" | "snowflake";
}

const history: HistoryEntry[] = [
  {
    year: 1992,
    city: "Albertville, Franca",
    athletes: 7,
    sports: ["Esqui Alpino"],
    highlight: "Estreia historica do Brasil em Olimpiadas de Inverno com 7 atletas no esqui alpino, incluindo Evelyn Schuler, primeira mulher brasileira em Jogos de Inverno.",
    icon: "flag",
  },
  {
    year: 1994,
    city: "Lillehammer, Noruega",
    athletes: 1,
    sports: ["Esqui Alpino"],
    highlight: "Lothar Christian Munder representa o Brasil sozinho e leva a bandeira na abertura. 50o lugar no Downhill.",
    icon: "snowflake",
  },
  {
    year: 1998,
    city: "Nagano, Japao",
    athletes: 1,
    sports: ["Esqui Alpino"],
    highlight: "Marcelo Apovian e o unico representante brasileiro, competindo no Super-G masculino. 37o lugar.",
    icon: "snowflake",
  },
  {
    year: 2002,
    city: "Salt Lake City, EUA",
    athletes: 10,
    sports: ["Esqui Alpino", "Esqui Cross-Country", "Bobsled", "Luge"],
    highlight: "Maior delegacao ate entao. Estreia do bobsled e do luge brasileiros. Edson Bindilatti compete pela primeira vez.",
    icon: "users",
  },
  {
    year: 2006,
    city: "Turim, Italia",
    athletes: 10,
    sports: ["Esqui Alpino", "Esqui Cross-Country", "Bobsled", "Snowboard Cross"],
    highlight: "Isabel Clark termina em 9o lugar no Snowboard Cross, melhor resultado brasileiro ate entao. Claudinei Quirino (prata nos 4x100m em Sydney) estreia no bobsled.",
    icon: "award",
  },
  {
    year: 2010,
    city: "Vancouver, Canada",
    athletes: 5,
    sports: ["Esqui Alpino", "Esqui Cross-Country", "Snowboard"],
    highlight: "Isabel Clark e porta-bandeira. Jaqueline Mourao compete em sua 4a Olimpiada (2 de Verao e 2 de Inverno).",
    icon: "snowflake",
  },
  {
    year: 2014,
    city: "Sochi, Russia",
    athletes: 13,
    sports: ["Esqui Alpino", "Esqui Cross-Country", "Bobsled", "Snowboard Cross", "Patinacao Artistica", "Biathlon", "Esqui Estilo Livre"],
    highlight: "Maior delegacao ate entao com 7 esportes. Isadora Williams e a primeira patinadora artistica brasileira. Jaqueline Mourao porta-bandeira. Estreia do bobsled feminino com Fabiana Santos.",
    icon: "users",
  },
  {
    year: 2018,
    city: "PyeongChang, Coreia do Sul",
    athletes: 9,
    sports: ["Esqui Alpino", "Esqui Cross-Country", "Bobsled", "Patinacao Artistica", "Snowboard Cross"],
    highlight: "Edson Bindilatti leva a bandeira na abertura em sua 4a Olimpiada. Isadora Williams compete na patinacao artistica. Isabel Clark se lesiona no treino e nao compete.",
    icon: "star",
  },
  {
    year: 2022,
    city: "Pequim, China",
    athletes: 10,
    sports: ["Esqui Alpino", "Esqui Cross-Country", "Bobsled", "Skeleton", "Esqui Estilo Livre"],
    highlight: "Nicole Silveira estreia no skeleton e alcanca 13o lugar. Eduarda Ribera estreia com apenas 17 anos no esqui cross-country. Jaqueline Mourao compete em sua 7a Olimpiada.",
    icon: "star",
  },
  {
    year: 2026,
    city: "Milano Cortina, Italia",
    athletes: 14,
    sports: ["Esqui Alpino", "Esqui Cross-Country", "Bobsled", "Skeleton", "Snowboard Halfpipe"],
    highlight: "Lucas Pinheiro Braathen conquista a primeira medalha de ouro do Brasil em Olimpiadas de Inverno no Slalom Gigante! Maior delegacao da historia com 14 atletas.",
    icon: "trophy",
  },
];

const iconMap = {
  flag: Flag,
  users: Users,
  award: Award,
  star: Star,
  trophy: Trophy,
  snowflake: Snowflake,
};

export function HistoryTimeline() {
  return (
    <div className="relative container mx-auto px-4 max-w-4xl">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-yellow-400 to-blue-500 opacity-40 dark:opacity-30 md:-translate-x-1/2" />

      <div className="space-y-10">
        {history.map((entry, index) => {
          const isLeft = index % 2 === 0;
          const isGold = entry.year === 2026;
          const Icon = iconMap[entry.icon];

          return (
            <motion.div
              key={entry.year}
              initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className={`relative flex flex-wrap md:items-center ${isLeft ? "md:flex-row-reverse" : "md:flex-row"}`}
              data-testid={`history-entry-${entry.year}`}
            >
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-background border-4 border-primary z-10 shadow-md mt-1.5 md:mt-0">
                <Icon className={`w-3 h-3 ${isGold ? "text-yellow-500" : "text-primary"}`} />
              </div>

              <div className="hidden md:block md:w-1/2" />

              <div className={`ml-12 md:ml-0 md:w-1/2 ${isLeft ? "md:pl-12" : "md:pr-12"}`}>
                <Card
                  className={`p-5 ${
                    isGold
                      ? "border-yellow-400 bg-yellow-50/80 dark:bg-yellow-900/10 shadow-md shadow-yellow-100 dark:shadow-none"
                      : "border-slate-200 dark:border-border shadow-sm hover:shadow-md dark:shadow-none"
                  } transition-shadow`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-2xl font-black text-primary">{entry.year}</span>
                    <span className="text-xs text-muted-foreground font-medium">{entry.athletes} atletas</span>
                  </div>

                  <p className="text-sm font-semibold mb-2">{entry.city}</p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {entry.sports.map((sport) => (
                      <Badge key={sport} variant="secondary" className="text-[10px] no-default-hover-elevate no-default-active-elevate">
                        {sport}
                      </Badge>
                    ))}
                  </div>

                  <p
                    className={`text-sm ${
                      isGold
                        ? "font-bold text-yellow-700 dark:text-yellow-300 flex items-start gap-1.5"
                        : "text-muted-foreground"
                    }`}
                  >
                    {isGold && <Trophy className="w-4 h-4 text-yellow-500 fill-current shrink-0 mt-0.5" />}
                    {entry.highlight}
                  </p>
                </Card>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
