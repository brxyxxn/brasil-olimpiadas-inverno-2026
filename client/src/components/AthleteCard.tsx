import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Calendar, Building2, Instagram } from "lucide-react";
import { Link } from "wouter";
import type { AthleteWithEvents } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AthleteCardProps {
  athlete: AthleteWithEvents;
  index: number;
}

export function AthleteCard({ athlete, index }: AthleteCardProps) {
  const hasGold = athlete.events.some(e => e.medal === 'Gold');
  const [bioExpanded, setBioExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const bioText = athlete.bio || "Competindo pelo Time Brasil nas Olimpiadas de Inverno 2026.";
  const needsTruncation = bioText.length > 120;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      data-testid={`card-athlete-${athlete.id}`}
    >
      <Card className={`h-full overflow-visible transition-all duration-300 ${hasGold ? 'border-2 border-yellow-400/60 shadow-lg shadow-yellow-400/10' : 'border border-slate-200 dark:border-transparent shadow-md hover:shadow-lg dark:shadow-lg'}`}>
        <Link href={`/atleta/${athlete.id}`} data-testid={`link-athlete-profile-${athlete.id}`}>
          <div className="h-48 relative overflow-hidden rounded-t-md cursor-pointer group">
            {athlete.imageUrl && !imgError ? (
              <img
                src={athlete.imageUrl}
                alt={athlete.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-green-600 to-blue-700" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            {hasGold && (
              <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-950 font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg animate-bounce">
                <Trophy className="w-4 h-4" />
                <span>OURO</span>
              </div>
            )}
            <div className="absolute bottom-4 left-4">
              <Badge variant="secondary" className="bg-white/90 text-slate-800 dark:bg-slate-800/90 dark:text-slate-200 shadow-sm">
                {athlete.sport}
              </Badge>
            </div>
          </div>
        </Link>
        
        <div className="px-6 pb-6 pt-4">
          <CardHeader className="p-0 mb-2">
            <Link href={`/atleta/${athlete.id}`}>
              <CardTitle className="text-2xl font-bold cursor-pointer hover:text-primary transition-colors">
                {athlete.name}
              </CardTitle>
            </Link>
          </CardHeader>
          
          <CardContent className="p-0 space-y-4">
            <div className="space-y-1">
              {athlete.confederation && (
                <a
                  href={athlete.confederation.includes("CBDN") ? "https://www.instagram.com/brasilnaneve/" : "https://www.instagram.com/icebrasil/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-1.5 text-xs text-muted-foreground underline-offset-2 hover:underline transition-all"
                  data-testid={`text-confederation-${athlete.id}`}
                >
                  <Building2 className="w-3 h-3 shrink-0 mt-0.5" />
                  <span className="break-words min-w-0">{athlete.confederation}</span>
                </a>
              )}
              {athlete.instagram && (
                <a
                  href={`https://instagram.com/${athlete.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-muted-foreground underline-offset-2 hover:underline transition-all"
                  data-testid={`link-instagram-${athlete.id}`}
                >
                  <Instagram className="w-3 h-3 shrink-0" />
                  <span>{athlete.instagram}</span>
                </a>
              )}
            </div>

            <div>
              <p className="text-muted-foreground text-sm">
                {needsTruncation && !bioExpanded
                  ? bioText.substring(0, 120) + "..."
                  : bioText}
              </p>
              {needsTruncation && (
                <button
                  onClick={() => setBioExpanded(!bioExpanded)}
                  className="text-sm font-medium mt-1 cursor-pointer text-[#10b04f]"
                  data-testid={`button-bio-toggle-${athlete.id}`}
                >
                  {bioExpanded ? "Ver menos" : "Ver mais"}
                </button>
              )}
            </div>
            
            <div className="pt-4 border-t border-slate-100 dark:border-border">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                <Calendar className="w-3 h-3" />
                Provas e Resultados
              </h4>
              <ul className="space-y-2">
                {athlete.events.map((event) => (
                  <li key={event.id} className="flex items-center justify-between gap-2 text-sm group" data-testid={`event-item-${event.id}`}>
                    <span className="font-medium group-hover:text-primary transition-colors">
                      {event.eventName}
                    </span>
                    {event.medal ? (
                      <span className={`font-bold px-2 py-0.5 rounded-md text-xs shrink-0 ${
                        event.medal === 'Gold' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' : 
                        event.medal === 'Silver' ? 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200' : 
                        'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                      }`}>
                        {event.medal === 'Gold' ? 'Ouro' : event.medal === 'Silver' ? 'Prata' : 'Bronze'}
                      </span>
                    ) : (
                      <span className="text-muted-foreground text-xs shrink-0">{event.result || event.date}</span>
                    )}
                  </li>
                ))}
                {athlete.events.length === 0 && (
                  <li className="text-muted-foreground text-sm italic">Sem provas agendadas</li>
                )}
              </ul>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
}
