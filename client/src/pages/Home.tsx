import { useState, useMemo, useEffect, useCallback } from "react";
import { useAthletes } from "@/hooks/use-athletes";
import { Hero } from "@/components/Hero";
import { AthleteCard } from "@/components/AthleteCard";
import { Timeline } from "@/components/Timeline";
import { HistoryTimeline } from "@/components/HistoryTimeline";
import { FunFacts } from "@/components/FunFacts";
import { Loader2, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { AthleteWithEvents, Event, Athlete } from "@shared/schema";
import { BrazilFlag } from "@/components/BrazilFlag";

type EventWithAthlete = Event & { athlete: AthleteWithEvents };

export default function Home() {
  const { data: athletes, isLoading, error } = useAthletes();
  const [sportFilter, setSportFilter] = useState<string>("Todos");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    const startY = window.scrollY;
    if (startY < 1) return;
    let startTime: number | null = null;
    const duration = 800;
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      window.scrollTo(0, startY * (1 - easeInOutCubic(progress)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem("homeScrollY");
    if (saved) {
      const y = parseInt(saved, 10);
      const restore = () => {
        window.scrollTo(0, y);
        sessionStorage.removeItem("homeScrollY");
      };
      requestAnimationFrame(() => requestAnimationFrame(restore));
    }

    const handleBeforeNav = () => {
      sessionStorage.setItem("homeScrollY", String(window.scrollY));
    };

    const links = document.querySelectorAll('a[href^="/atleta/"]');
    links.forEach((link) => link.addEventListener("click", handleBeforeNav));
    return () => {
      links.forEach((link) => link.removeEventListener("click", handleBeforeNav));
    };
  }, [athletes]);

  const sports = useMemo(() => {
    if (!athletes) return ["Todos"];
    const unique = Array.from(new Set<string>(athletes.map((a: AthleteWithEvents) => a.sport))).sort();
    return ["Todos", ...unique];
  }, [athletes]);

  const filteredAthletes = useMemo(() => {
    const list = (!athletes || sportFilter === "Todos") ? athletes : athletes.filter((a: AthleteWithEvents) => a.sport === sportFilter);
    return list ? [...list].sort((a: AthleteWithEvents, b: AthleteWithEvents) => a.name.localeCompare(b.name, 'pt-BR')) : list;
  }, [athletes, sportFilter]);

  const rawEvents: EventWithAthlete[] = athletes?.flatMap((athlete: AthleteWithEvents) => 
    athlete.events.map((event: Event) => ({ ...event, athlete }))
  ) || [];

  const grouped: Record<string, EventWithAthlete[]> = {};
  const soloEvents: EventWithAthlete[] = [];
  for (const ev of rawEvents) {
    const key = `${ev.eventName}|${ev.date}|${ev.time}`;
    const sameEvent = rawEvents.filter((e: EventWithAthlete) => e.eventName === ev.eventName && e.date === ev.date && e.time === ev.time);
    if (sameEvent.length > 1) {
      if (!grouped[key]) grouped[key] = [];
      if (!grouped[key].find((e: EventWithAthlete) => e.id === ev.id)) grouped[key].push(ev);
    } else {
      soloEvents.push(ev);
    }
  }

  const allEvents = [
    ...soloEvents,
    ...Object.values(grouped).map((group: EventWithAthlete[]) => ({
      ...group[0],
      _groupedAthletes: group.map((e: EventWithAthlete) => e.athlete),
      _groupedResults: group.map((e: EventWithAthlete) => e.result),
    })),
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto" />
          <p className="text-slate-500 font-medium animate-pulse">Carregando Time Brasil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <h2 className="text-2xl font-bold">Erro ao carregar dados</h2>
          <p>Tente novamente mais tarde.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Hero />

      <section id="intro" className="py-12 md:py-20 bg-white dark:bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
          <div className="absolute top-20 right-20 w-80 h-80 bg-yellow-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-green-500 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 space-y-4"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-sm font-semibold tracking-wide" data-testid="text-intro-label">
                MILANO CORTINA 2026
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white" data-testid="text-intro-title">
                O Brasil nas Olimpiadas de Inverno
              </h2>
            </motion.div>

            <div className="grid grid-cols-3 gap-3 md:gap-8 mb-8 md:mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center p-3 md:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50"
                data-testid="stat-athletes"
              >
                <p className="text-2xl md:text-4xl font-black text-green-600 dark:text-green-400">14</p>
                <p className="text-xs md:text-sm font-semibold text-slate-600 dark:text-slate-400 mt-1">Atletas</p>
                <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-500 mt-1 hidden sm:block">Maior delegacao da historia</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center p-3 md:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50"
                data-testid="stat-sports"
              >
                <p className="text-2xl md:text-4xl font-black text-yellow-500 dark:text-yellow-400">5</p>
                <p className="text-xs md:text-sm font-semibold text-slate-600 dark:text-slate-400 mt-1">Modalidades</p>
                <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-500 mt-1 hidden sm:block">Esqui, Bobsled, Skeleton e mais</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-center p-3 md:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50"
                data-testid="stat-gold"
              >
                <p className="text-2xl md:text-4xl font-black text-yellow-500 dark:text-yellow-400">1</p>
                <p className="text-xs md:text-sm font-semibold text-slate-600 dark:text-slate-400 mt-1">Medalha de Ouro</p>
                <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-500 mt-1 hidden sm:block">Primeira da historia no inverno</p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="space-y-4 text-slate-600 dark:text-slate-400 text-sm md:text-base lg:text-lg leading-relaxed"
              data-testid="text-intro-body"
            >
              <p>
                De Albertville 1992 ate Milano Cortina 2026, o Brasil construiu uma trajetoria de mais de 30 anos nos esportes de inverno. O que comecou com sete esquiadores alpinos na estreia francesa se transformou na maior e mais diversa delegacao brasileira em Jogos de Inverno: <strong className="text-slate-800 dark:text-slate-200">14 atletas em cinco modalidades</strong>.
              </p>
              <p>
                A edicao de 2026 entrou para a historia com a conquista inedita de <strong className="text-slate-800 dark:text-slate-200">Lucas Pinheiro Braathen</strong>, que trouxe a primeira medalha de ouro do Brasil em Olimpiadas de Inverno no Slalom Gigante do esqui alpino. Uma marca que coroa decadas de dedicacao de atletas brasileiros que enfrentaram todas as dificuldades de um pais tropical para competir na neve.
              </p>
              <p>
                Nesta pagina voce encontra o perfil de cada atleta, o calendario completo com horarios de largada, resultados detalhados e a historia de todas as participacoes brasileiras nos Jogos de Inverno.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="athletes" className="py-12 md:py-24 scroll-mt-16 container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16 space-y-3 md:space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs md:text-sm font-semibold tracking-wide"
            data-testid="text-delegation-label"
          >
            A DELEGACAO
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white"
            data-testid="text-team-title"
          >
            Conheca o Time Brasil
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            Uma delegacao historica representando o Brasil no maior palco dos esportes de inverno do mundo.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-1.5 md:gap-2 mb-8 md:mb-12"
          data-testid="filter-sport-buttons"
        >
          {sports.map((sport) => (
            <Button
              key={sport}
              variant={sportFilter === sport ? "default" : "outline"}
              size="sm"
              onClick={() => setSportFilter(sport)}
              className="text-xs md:text-sm"
              data-testid={`button-filter-${sport.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {sport}
            </Button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
          {filteredAthletes?.map((athlete: AthleteWithEvents, index: number) => (
            <AthleteCard key={athlete.id} athlete={athlete} index={index} />
          ))}
        </div>
      </section>

      <section id="schedule" className="py-12 md:py-24 scroll-mt-16 bg-white dark:bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
          <div className="absolute top-10 left-10 w-96 h-96 bg-green-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-500 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8 md:mb-16 space-y-3 md:space-y-4">
            <span className="text-green-600 dark:text-green-400 font-bold tracking-widest uppercase text-xs md:text-sm">Milano Cortina 2026</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white" data-testid="text-schedule-title">
              Calendario e Resultados
            </h2>
          </div>

          <Timeline events={allEvents} />
        </div>
      </section>

      <section id="curiosidades" className="py-12 md:py-24 scroll-mt-16 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
          <div className="absolute top-20 left-20 w-80 h-80 bg-yellow-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8 md:mb-16 space-y-3 md:space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-3 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs md:text-sm font-semibold tracking-wide"
              data-testid="text-funfacts-label"
            >
              CURIOSIDADES
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white"
              data-testid="text-funfacts-title"
            >
              Voce Sabia?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-sm md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            >
              Fatos incriveis sobre os atletas que representam o Brasil na neve.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <FunFacts />
          </motion.div>
        </div>
      </section>

      <section id="history" className="py-12 md:py-24 scroll-mt-16 bg-white dark:bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute top-10 right-10 w-96 h-96 bg-green-500 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8 md:mb-16 space-y-3 md:space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs md:text-sm font-semibold tracking-wide"
              data-testid="text-history-label"
            >
              DESDE 1992
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white"
              data-testid="text-history-title"
            >
              Brasil nas Olimpiadas de Inverno
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-sm md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            >
              Uma jornada de mais de 30 anos ate a historica primeira medalha de ouro.
            </motion.p>
          </div>

          <HistoryTimeline />
        </div>
      </section>

      <footer className="bg-[#0A1A2F] text-white py-8 md:py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md overflow-hidden shadow-lg">
                <BrazilFlag className="w-full h-full" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">Time Brasil</h3>
                <p className="text-xs text-slate-400">Milano Cortina 2026</p>
              </div>
            </div>
            
            <p className="text-slate-400 text-sm text-center md:text-right">
              Celebrando a excelencia brasileira nos esportes de inverno.<br />
              <span className="opacity-50">Pagina nao oficial. Dados baseados em resultados reais.</span>
            </p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/30 flex md:hidden items-center justify-center transition-colors"
            aria-label="Voltar ao topo"
            data-testid="button-scroll-top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
