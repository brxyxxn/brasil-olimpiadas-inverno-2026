import { motion } from "framer-motion";
import { format, parseISO, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Clock, MapPin, Trophy, Calendar } from "lucide-react";
import { Link } from "wouter";
import { type Event, type Athlete } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TimelineEvent extends Event {
  athlete: Athlete;
  _groupedAthletes?: Athlete[];
  _groupedResults?: (string | null)[];
}

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const grouped: Record<string, TimelineEvent[]> = {};
  for (const ev of sortedEvents) {
    const key = ev.date;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(ev);
  }
  const dateGroups = Object.entries(grouped);

  return (
    <div className="container mx-auto px-4 max-w-5xl">
      <div className="space-y-10">
        {dateGroups.map(([date, dayEvents], groupIndex) => {
          const parsed = parseISO(date);
          const formattedDate = isValid(parsed)
            ? format(parsed, "EEEE, d 'de' MMMM", { locale: ptBR })
            : date;
          const formattedYear = isValid(parsed)
            ? format(parsed, "yyyy")
            : "";

          return (
            <motion.div
              key={date}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: groupIndex * 0.05 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary text-primary-foreground shadow-md">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold capitalize">{formattedDate}</h3>
                  {formattedYear && (
                    <p className="text-xs text-muted-foreground">{formattedYear}</p>
                  )}
                </div>
                <div className="flex-1 h-px bg-border ml-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-0 md:pl-[52px]">
                {dayEvents.map((event, eventIndex) => {
                  const isGold = event.medal === "Gold";

                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: eventIndex * 0.08 }}
                    >
                      <Card
                        className={`p-0 overflow-hidden h-full ${
                          isGold
                            ? "border-yellow-400 ring-1 ring-yellow-300/50"
                            : ""
                        }`}
                        data-testid={`timeline-event-${event.id}`}
                      >
                        {isGold && (
                          <>
                            <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 px-4 py-1.5 flex items-center gap-2">
                              <Trophy className="w-4 h-4 text-yellow-800" />
                              <span className="text-sm font-bold text-yellow-900">
                                Medalha de Ouro
                              </span>
                            </div>
                            {event.athlete?.imageUrl && (
                              <div className="relative h-44 overflow-hidden">
                                <img
                                  src={event.athlete.imageUrl}
                                  alt={`${event.athlete.name} - Medalha de Ouro`}
                                  className="w-full h-full object-cover object-top"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                <div className="absolute bottom-3 left-4 right-4">
                                  <p className="text-white font-bold text-sm drop-shadow-lg">
                                    {event.athlete.name}
                                  </p>
                                  <p className="text-yellow-300 text-xs font-semibold drop-shadow-lg">
                                    Primeira medalha de ouro do Brasil
                                  </p>
                                </div>
                              </div>
                            )}
                          </>
                        )}

                        <div className="p-5">
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-base leading-tight">
                                {event.eventName}
                              </h4>
                              <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-muted-foreground">
                                {event.time && (
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {event.time}
                                  </span>
                                )}
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  Milano Cortina
                                </span>
                              </div>
                            </div>
                            <Badge
                              variant="secondary"
                              className="shrink-0 text-[10px]"
                            >
                              {event.athlete?.sport || ""}
                            </Badge>
                          </div>

                          <div className="border-t border-border pt-3 space-y-2">
                            {event._groupedAthletes &&
                            event._groupedAthletes.length > 1 ? (
                              event._groupedAthletes.map((ath, i) => {
                                const hasIndividualResults =
                                  event._groupedResults &&
                                  event._groupedResults.some(
                                    (r, j) =>
                                      j > 0 &&
                                      r !== event._groupedResults![0]
                                  );
                                const individualResult =
                                  hasIndividualResults &&
                                  event._groupedResults
                                    ? event._groupedResults[i]
                                    : null;
                                return (
                                  <Link
                                    key={ath.id || i}
                                    href={`/atleta/${ath.id}`}
                                    className="flex items-center gap-3 group"
                                  >
                                    {ath.imageUrl ? (
                                      <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 ring-2 ring-border">
                                        <img
                                          src={ath.imageUrl}
                                          alt={ath.name}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                    ) : (
                                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0">
                                        {ath.name?.charAt(0) || "B"}
                                      </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium group-hover:text-primary transition-colors">
                                        {ath.name}
                                      </p>
                                      {individualResult && (
                                        <p className="text-xs text-muted-foreground">
                                          {individualResult}
                                        </p>
                                      )}
                                    </div>
                                  </Link>
                                );
                              })
                            ) : (
                              <Link
                                href={`/atleta/${event.athlete?.id}`}
                                className="flex items-center gap-3 group"
                              >
                                {event.athlete?.imageUrl ? (
                                  <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-border shrink-0">
                                    <img
                                      src={event.athlete.imageUrl}
                                      alt={event.athlete.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ) : (
                                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0">
                                    {event.athlete?.name?.charAt(0) || "B"}
                                  </div>
                                )}
                                <div className="flex-1">
                                  <p className="text-sm font-medium group-hover:text-primary transition-colors">
                                    {event.athlete?.name || "Atleta Brasileiro"}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {event.athlete?.sport || ""}
                                  </p>
                                </div>
                              </Link>
                            )}
                          </div>

                          {event.result &&
                            (() => {
                              const hasIndividualResults =
                                event._groupedResults &&
                                event._groupedResults.some(
                                  (r, j) =>
                                    j > 0 &&
                                    r !== event._groupedResults![0]
                                );
                              if (hasIndividualResults) return null;
                              return (
                                <div className="mt-3 pt-3 border-t border-dashed border-border">
                                  <div className="flex items-start justify-between gap-2">
                                    <span className="text-xs uppercase font-semibold text-muted-foreground shrink-0 pt-0.5">
                                      Resultado
                                    </span>
                                    <span
                                      className={`font-bold text-sm text-right break-words min-w-0 ${
                                        isGold
                                          ? "text-yellow-600 dark:text-yellow-400 flex items-center gap-1"
                                          : ""
                                      }`}
                                    >
                                      {isGold && (
                                        <Trophy className="w-4 h-4 text-yellow-500 fill-current shrink-0" />
                                      )}
                                      {event.result}
                                    </span>
                                  </div>
                                </div>
                              );
                            })()}
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
