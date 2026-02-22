import { motion } from "framer-motion";
import { Snowflake, Medal } from "lucide-react";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-[#0A1A2F] text-white min-h-[80vh] md:min-h-[85vh] flex items-center pt-16">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1A2F] via-[#0f2440] to-[#0A1A2F]" />
      </div>

      <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-8 md:py-0">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-4 md:space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-yellow-400 font-medium text-xs md:text-sm">
            <Medal className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span>Conquista Historica</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-tight tracking-tight">
            PRIMEIRO OURO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-500 drop-shadow-sm">
              DO BRASIL NO INVERNO
            </span>
          </h1>
          
          <p className="text-base md:text-lg lg:text-xl text-gray-300 max-w-xl leading-relaxed">
            Historia feita em Milano Cortina 2026. Lucas Pinheiro Braathen conquista as pistas e traz para casa a primeira medalha de ouro do Brasil em Olimpiadas de Inverno.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-2 md:pt-4">
            <a 
              href="#athletes"
              data-testid="link-athletes"
              className="px-5 py-3 md:px-8 md:py-4 bg-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-900/20 transition-all flex items-center justify-center gap-2 hover-elevate active-elevate-2 text-sm md:text-base"
            >
              Conhecer o Time
            </a>
            <a 
              href="#schedule" 
              data-testid="link-schedule"
              className="px-5 py-3 md:px-8 md:py-4 bg-white/10 backdrop-blur text-white font-bold rounded-xl border border-white/10 transition-all hover-elevate active-elevate-2 text-center flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <Snowflake className="w-4 h-4 md:w-5 md:h-5" />
              Ver Calendario
            </a>
            <a 
              href="#history"
              data-testid="link-history"
              className="px-5 py-3 md:px-8 md:py-4 bg-white/10 backdrop-blur text-white font-bold rounded-xl border border-white/10 transition-all hover-elevate active-elevate-2 text-center text-sm md:text-base"
            >
              Historia
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 bg-gradient-to-br from-yellow-400/20 to-green-600/20 rounded-3xl p-1 backdrop-blur-sm border border-white/10">
            <div className="bg-[#0f2440] rounded-2xl overflow-hidden shadow-2xl relative group">
              <img 
                src="/images/lucas_braathen.png"
                alt="Lucas Pinheiro Braathen - Medalha de Ouro Olimpica"
                className="w-full h-[500px] object-cover object-top"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">Lucas Pinheiro Braathen</h3>
                    <p className="text-green-400 font-medium">Esqui Alpino - Slalom Gigante</p>
                  </div>
                  <div className="flex flex-col items-center bg-yellow-400 text-yellow-900 px-4 py-2 rounded-md font-bold shrink-0">
                    <span className="text-xs uppercase tracking-wider">Resultado</span>
                    <span className="text-xl">OURO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </motion.div>
      </div>
    </div>
  );
}
