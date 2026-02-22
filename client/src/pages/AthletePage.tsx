import { useRoute, Link } from "wouter";
import { useAthlete } from "@/hooks/use-athletes";
import { motion } from "framer-motion";
import { format, parseISO, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ArrowLeft,
  Trophy,
  Calendar,
  Clock,
  Instagram,
  Building2,
  MapPin,
  Medal,
  ExternalLink,
  Loader2,
  User,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AthletePage() {
  const [, params] = useRoute("/atleta/:id");
  const id = Number(params?.id);
  const { data: athlete, isLoading, error } = useAthlete(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto" />
          <p className="text-slate-500 font-medium animate-pulse">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  if (error || !athlete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-red-500">Atleta nao encontrado</h2>
          <Link href="/">
            <Button variant="outline" data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao inicio
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const hasGold = athlete.events.some((e) => e.medal === "Gold");
  const hasMedal = athlete.events.some((e) => e.medal);
  const completedEvents = athlete.events.filter((e) => e.result && e.result !== "A competir");
  const upcomingEvents = athlete.events.filter((e) => !e.result || e.result === "A competir");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="relative overflow-hidden bg-[#0A1A2F] text-white">
        <div className="absolute inset-0 z-0">
          {athlete.imageUrl ? (
            <img
              src={athlete.imageUrl}
              alt={athlete.name}
              className="w-full h-full object-cover opacity-20 blur-sm scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-green-900 to-blue-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1A2F]/50 via-[#0A1A2F]/70 to-[#0A1A2F]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-20 pb-16">
          <Link href="/#athletes">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white mb-8"
              data-testid="button-back"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>

          <div className="grid md:grid-cols-[240px_1fr] lg:grid-cols-[300px_1fr] gap-6 md:gap-10 items-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative mx-auto md:mx-0"
            >
              <div
                className={`rounded-2xl overflow-hidden border-4 shadow-2xl w-[200px] h-[250px] md:w-[240px] md:h-[300px] lg:w-[260px] lg:h-[320px] ${
                  hasGold ? "border-yellow-400" : "border-white/20"
                }`}
              >
                {athlete.imageUrl ? (
                  <img
                    src={athlete.imageUrl}
                    alt={athlete.name}
                    className="w-full h-full object-cover"
                    data-testid="img-athlete-photo"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-green-600 to-blue-700 flex items-center justify-center">
                    <User className="w-20 h-20 text-white/50" />
                  </div>
                )}
              </div>
              {hasGold && (
                <div className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 rounded-full p-3 shadow-lg">
                  <Trophy className="w-6 h-6" />
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4 text-center md:text-left"
            >
              <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                <Badge
                  variant="secondary"
                  className="text-sm"
                >
                  {athlete.sport}
                </Badge>
                {hasMedal && (
                  <Badge className="bg-yellow-400 text-yellow-900 border-yellow-500">
                    <Medal className="w-3 h-3 mr-1" />
                    Medalhista
                  </Badge>
                )}
              </div>

              <h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight"
                data-testid="text-athlete-name"
              >
                {athlete.name}
              </h1>

              <div className="flex flex-wrap gap-4 text-sm text-gray-300 justify-center md:justify-start">
                {athlete.confederation && (
                  <a
                    href={athlete.confederation.includes("CBDN") ? "https://www.instagram.com/brasilnaneve/" : "https://www.instagram.com/icebrasil/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-white transition-colors"
                    data-testid="text-athlete-confederation"
                  >
                    <Building2 className="w-4 h-4 shrink-0" />
                    <span className="underline-offset-2 hover:underline">{athlete.confederation}</span>
                  </a>
                )}
              </div>

              <div className="flex flex-wrap gap-3 pt-2 justify-center md:justify-start">
                {athlete.instagram && (
                  <a
                    href={`https://instagram.com/${athlete.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-md border border-white/10 text-sm font-medium transition-all hover:bg-white/20"
                    data-testid="link-athlete-instagram"
                  >
                    <Instagram className="w-4 h-4" />
                    {athlete.instagram}
                    <ExternalLink className="w-3 h-3 opacity-50" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-[1fr_380px] gap-6 md:gap-8">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6" data-testid="card-athlete-bio">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Sobre
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {athlete.bio || "Atleta brasileiro competindo nas Olimpiadas de Inverno Milano Cortina 2026."}
                </p>
              </Card>
            </motion.div>

            {completedEvents.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="p-6" data-testid="card-completed-events">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-primary" />
                    Resultados
                  </h2>
                  <div className="space-y-4">
                    {completedEvents.map((event) => {
                      const isGold = event.medal === "Gold";
                      const isSilver = event.medal === "Silver";
                      const isBronze = event.medal === "Bronze";
                      return (
                        <div
                          key={event.id}
                          className={`rounded-md border overflow-hidden ${
                            isGold
                              ? "border-yellow-300 bg-yellow-50/50 dark:bg-yellow-900/10 dark:border-yellow-700"
                              : isSilver
                              ? "border-slate-300 bg-slate-50/50 dark:bg-slate-800/30 dark:border-slate-600"
                              : isBronze
                              ? "border-orange-300 bg-orange-50/50 dark:bg-orange-900/10 dark:border-orange-700"
                              : "border-border"
                          }`}
                          data-testid={`result-event-${event.id}`}
                        >
                          {isGold && athlete.imageUrl && (
                            <div className="relative h-48 overflow-hidden">
                              <img
                                src={athlete.imageUrl}
                                alt={`${athlete.name} - Medalha de Ouro`}
                                className="w-full h-full object-cover object-top"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/60 to-transparent" />
                              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                                <p className="text-yellow-300 text-sm font-bold drop-shadow-lg">
                                  Primeira medalha de ouro do Brasil em Olimpiadas de Inverno
                                </p>
                                <Trophy className="w-6 h-6 text-yellow-400 drop-shadow-lg shrink-0" />
                              </div>
                            </div>
                          )}
                          <div className="p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-base">{event.eventName}</h3>
                              <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {isValid(parseISO(event.date))
                                    ? format(parseISO(event.date), "d 'de' MMMM, yyyy", { locale: ptBR })
                                    : event.date}
                                </span>
                                {event.time && (
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {event.time}
                                  </span>
                                )}
                              </div>
                            </div>
                            {event.medal ? (
                              <Badge
                                className={`shrink-0 ${
                                  isGold
                                    ? "bg-yellow-400 text-yellow-900 border-yellow-500"
                                    : isSilver
                                    ? "bg-slate-300 text-slate-800 border-slate-400"
                                    : "bg-orange-400 text-orange-900 border-orange-500"
                                }`}
                              >
                                <Trophy className="w-3 h-3 mr-1" />
                                {isGold ? "Ouro" : isSilver ? "Prata" : "Bronze"}
                              </Badge>
                            ) : null}
                          </div>
                          <div className="mt-2 pt-2 border-t border-dashed border-border">
                            <p className={`text-sm font-medium break-words ${isGold ? "text-yellow-700 dark:text-yellow-300" : ""}`}>
                              {event.result}
                            </p>
                          </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </motion.div>
            )}
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Card className="p-6" data-testid="card-athlete-stats">
                <h2 className="text-lg font-bold mb-4">Resumo</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Modalidade</span>
                    <span className="font-semibold text-sm">{athlete.sport}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Total de Provas</span>
                    <span className="font-semibold text-sm">{athlete.events.length}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Provas Concluidas</span>
                    <span className="font-semibold text-sm">{completedEvents.length}</span>
                  </div>
                  {hasMedal && (
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">Medalhas</span>
                      <div className="flex gap-1">
                        {athlete.events
                          .filter((e) => e.medal)
                          .map((e) => (
                            <Badge
                              key={e.id}
                              className={
                                e.medal === "Gold"
                                  ? "bg-yellow-400 text-yellow-900"
                                  : e.medal === "Silver"
                                  ? "bg-slate-300 text-slate-800"
                                  : "bg-orange-400 text-orange-900"
                              }
                            >
                              {e.medal === "Gold" ? "Ouro" : e.medal === "Silver" ? "Prata" : "Bronze"}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  )}
                  {athlete.confederation && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-muted-foreground">Confederacao</span>
                      <span className="font-semibold text-sm text-right max-w-[200px]">
                        {athlete.confederation.split(" - ")[0]}
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>

            {upcomingEvents.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <Card className="p-6" data-testid="card-upcoming-events">
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Proximas Provas
                  </h2>
                  <div className="space-y-3">
                    {upcomingEvents.map((event) => (
                      <div
                        key={event.id}
                        className="p-3 rounded-md border border-dashed border-border"
                        data-testid={`upcoming-event-${event.id}`}
                      >
                        <p className="font-semibold text-sm">{event.eventName}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {isValid(parseISO(event.date))
                              ? format(parseISO(event.date), "d 'de' MMMM", { locale: ptBR })
                              : event.date}
                          </span>
                          {event.time && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {event.time}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          Milano Cortina, Italia
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 border-green-200 dark:border-green-800">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/80px-Flag_of_Brazil.svg.png"
                    alt="Bandeira do Brasil"
                    className="w-10 h-10 rounded-md object-cover shadow-lg"
                  />
                  <div>
                    <p className="font-bold text-sm">Time Brasil</p>
                    <p className="text-xs text-muted-foreground">Milano Cortina 2026</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Representando o Brasil nos Jogos Olimpicos de Inverno com orgulho e determinacao.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
