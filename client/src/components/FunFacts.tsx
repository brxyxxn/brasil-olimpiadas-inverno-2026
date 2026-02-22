import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Snowflake,
  Trophy,
  Heart,
  Flag,
  Shield,
  TreePalm,
  Users,
  Music,
  Waves,
  Star,
  Globe,
  Mountain,
  Clapperboard,
  Film,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

interface FunFact {
  athlete: string;
  sport: string;
  icon: LucideIcon;
  iconColor: string;
  fact: string;
}

const funFacts: FunFact[] = [
  {
    athlete: "Lucas Pinheiro Braathen",
    sport: "Esqui Alpino",
    icon: Trophy,
    iconColor: "text-yellow-500",
    fact: "Nasceu na Noruega e competiu pelo pais ate 2023. Trocou de bandeira para representar o Brasil, pais da mae, e conquistou a primeira medalha de ouro da America do Sul em Olimpiadas de Inverno. E torcedor do Sao Paulo e fala portugues fluente!",
  },
  {
    athlete: "Nicole Silveira",
    sport: "Skeleton",
    icon: Heart,
    iconColor: "text-red-500",
    fact: "Alem de atleta de elite, Nicole e enfermeira formada. Trabalhou na linha de frente durante a pandemia em hospitais no Canada. Comecou no skeleton aos 24 anos — tarde para o esporte — e em apenas 7 anos chegou ao top 11 do mundo!",
  },
  {
    athlete: "Edson Bindilatti",
    sport: "Bobsled",
    icon: Flag,
    iconColor: "text-green-600",
    fact: "Nascido em Camamu, na Bahia, participou de 6 Olimpiadas de Inverno — recorde brasileiro! Foi porta-bandeira do Brasil em 3 cerimonias diferentes e atua no bobsled ha 26 anos. Antes era decatleta no atletismo.",
  },
  {
    athlete: "Bruna Moura",
    sport: "Esqui Cross-Country",
    icon: Shield,
    iconColor: "text-blue-500",
    fact: "Na vespera de embarcar para Pequim 2022, sofreu um grave acidente de van na Italia — o motorista faleceu. Ficou 2 meses sem andar, fez 1 ano e meio de fisioterapia, e voltou a competir. Foram 16 anos de jornada ate finalmente se tornar olimpica em 2026!",
  },
  {
    athlete: "Manex Silva",
    sport: "Esqui Cross-Country",
    icon: TreePalm,
    iconColor: "text-green-500",
    fact: "Nasceu em Rio Branco, no Acre! Filho de mae brasileira e pai basco, mudou-se para a Espanha aos 2 anos. Conheceu o esqui brasileiro por acaso quando encontrou uma esquiadora com roupa do Brasil em uma competicao. Conquistou o melhor resultado historico do Brasil no esqui cross-country (48o lugar).",
  },
  {
    athlete: "Eduarda Ribera",
    sport: "Esqui Cross-Country",
    icon: Users,
    iconColor: "text-purple-500",
    fact: "Conhecida como 'Duda', comecou no esqui acompanhando o irmao Cristian — que e atleta paralimpico e vice-campeao mundial! Estreou em Olimpiadas com apenas 17 anos em Pequim 2022. Prometeu a uma amiga que faleceu que iria aos Jogos Olimpicos.",
  },
  {
    athlete: "Pat Burgener",
    sport: "Snowboard",
    icon: Music,
    iconColor: "text-pink-500",
    fact: "Suico de nascimento, adotou a cidadania brasileira pela mae, que cresceu no Brasil. Alem de snowboarder, e musico profissional com mais de 4 milhoes de streams no Spotify! Toca piano, guitarra, ukulele, cavaquinho e mais. Foi diagnosticado com TDAH e usa a musica para manter o foco.",
  },
  {
    athlete: "Augustinho Teixeira",
    sport: "Snowboard",
    icon: Waves,
    iconColor: "text-cyan-500",
    fact: "Descobriu o snowboard depois de praticar sandboard nas dunas do Ceara quando crianca! Hoje compete no slopestyle, uma das modalidades mais radicais dos Jogos de Inverno, com manobras aereas em rampas e corrimoes de neve.",
  },
  {
    athlete: "Alice Padilha",
    sport: "Esqui Alpino",
    icon: Star,
    iconColor: "text-yellow-400",
    fact: "Com apenas 18 anos, e a atleta mais jovem da delegacao brasileira. Tem um irmao gemeo, Arthur, que tambem e esquiador! A familia se mudou de pais varias vezes para apoiar o sonho dela. Quer virar treinadora para desenvolver o esqui feminino no Brasil.",
  },
  {
    athlete: "Gustavo Ferreira",
    sport: "Bobsled",
    icon: Globe,
    iconColor: "text-blue-400",
    fact: "Nascido em Marilia, no interior de Sao Paulo, comecou como velocista no atletismo e foi convidado para o bobsled aos 17 anos. Ja nos Jogos da Juventude 2020, ficou em 13o no monobob. E o sucessor escolhido por Edson Bindilatti para ser o futuro piloto titular do Brasil em 2030!",
  },
  {
    athlete: "Christian Oliveira Soevik",
    sport: "Esqui Alpino",
    icon: Mountain,
    iconColor: "text-slate-500",
    fact: "Nascido na Noruega com raizes brasileiras, seguiu os passos de Lucas Braathen ao escolher representar o Brasil. Compete no slalom e no slalom gigante, ajudando a construir uma equipe brasileira cada vez mais forte no esqui alpino.",
  },
  {
    athlete: "Giovanni Ongaro",
    sport: "Esqui Alpino",
    icon: Snowflake,
    iconColor: "text-sky-400",
    fact: "Italo-brasileiro, cresceu em contato direto com os Alpes e as melhores pistas de esqui do mundo. Traz a experiencia de treinar nas mesmas montanhas que recebem as provas olimpicas, competindo pelo Brasil com orgulho das raizes familiares.",
  },
  {
    athlete: "Davidson de Souza (Boka)",
    sport: "Bobsled",
    icon: Clapperboard,
    iconColor: "text-orange-500",
    fact: "Paulistano com nome artistico 'Boka SP', e musico e tem singles no Spotify! Criou o 'Hino do Bobsled' e foi produtor executivo de um documentario social. Em 2024, sofreu um grave acidente de treno, fraturou o femur e, mesmo assim, se recuperou a tempo dos Jogos!",
  },
  {
    athlete: "Rafael Souza",
    sport: "Bobsled",
    icon: Film,
    iconColor: "text-indigo-500",
    fact: "Carioca da Zona Norte do Rio, conhecia o bobsled apenas pelo filme 'Jamaica Abaixo de Zero' antes de entrar no esporte! Ex-atleta do heptatlo, migrou para o bobsled apos lesoes no atletismo e ja soma mais de 10 anos de dedicacao ao treno.",
  },
  {
    athlete: "Luis Bacca",
    sport: "Bobsled",
    icon: Zap,
    iconColor: "text-amber-500",
    fact: "Veio do salto triplo no atletismo, onde foi campeao brasileiro sub-23. Sua explosao e velocidade de sprinter sao perfeitas para empurrar o treno na largada. E o integrante mais recente da equipe e ja ajudou o Brasil a conquistar o melhor resultado historico no bobsled 2-man (24o lugar)!",
  },
];

export function FunFacts() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % funFacts.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + funFacts.length) % funFacts.length);
  };

  const current = funFacts[currentIndex];
  const IconComponent = current.icon;

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative bg-gradient-to-br from-yellow-50 via-white to-green-50 dark:from-slate-800 dark:via-slate-800/80 dark:to-slate-800 rounded-2xl border border-yellow-200/60 dark:border-yellow-700/30 p-6 md:p-10 overflow-hidden min-h-[260px] md:min-h-[240px]" data-testid="funfacts-card">
        <div className="absolute top-4 right-4 opacity-10 dark:opacity-5">
          <Snowflake className="w-24 h-24 text-blue-400" />
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative z-10"
          >
            <div className="flex items-start gap-3 md:gap-4 mb-4">
              <div className={`flex-shrink-0 mt-0.5 ${current.iconColor}`} data-testid="funfact-icon">
                <IconComponent className="w-8 h-8 md:w-10 md:h-10" />
              </div>
              <div>
                <h3 className="font-bold text-lg md:text-xl text-slate-900 dark:text-white" data-testid="funfact-athlete">
                  {current.athlete}
                </h3>
                <span className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide">
                  {current.sport}
                </span>
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed" data-testid="funfact-text">
              {current.fact}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between mt-5">
        <Button
          variant="outline"
          size="sm"
          onClick={goPrev}
          className="gap-1.5 text-xs md:text-sm"
          data-testid="button-funfact-prev"
        >
          <ChevronLeft className="w-4 h-4" />
          Anterior
        </Button>

        <div className="flex items-center gap-1.5 flex-wrap justify-center max-w-[200px] md:max-w-none">
          {funFacts.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "bg-green-500 dark:bg-green-400 w-5"
                  : "bg-slate-300 dark:bg-slate-600"
              }`}
              aria-label={`Curiosidade ${i + 1}`}
              data-testid={`button-funfact-dot-${i}`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={goNext}
          className="gap-1.5 text-xs md:text-sm"
          data-testid="button-funfact-next"
        >
          Proximo
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-3" data-testid="funfact-counter">
        {currentIndex + 1} de {funFacts.length} curiosidades
      </p>
    </div>
  );
}
