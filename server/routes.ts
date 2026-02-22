import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  app.get(api.athletes.list.path, async (req, res) => {
    const data = await storage.getAthletes();
    res.json(data);
  });

  app.get(api.athletes.get.path, async (req, res) => {
    const athlete = await storage.getAthlete(Number(req.params.id));
    if (!athlete) {
      return res.status(404).json({ message: "Athlete not found" });
    }
    res.json(athlete);
  });

  app.get(api.events.list.path, async (req, res) => {
    const data = await storage.getEvents();
    res.json(data);
  });

  const athletesInDb = await storage.getAthletes();
  if (athletesInDb.length === 0) {
    const lucas = await storage.createAthlete({
      name: "Lucas Pinheiro Braathen",
      sport: "Esqui Alpino",
      confederation: "CBDN - Confederacao Brasileira de Desportos na Neve",
      bio: "Fez historia ao conquistar a primeira medalha de ouro do Brasil em Jogos Olimpicos de Inverno, no Slalom Gigante Masculino em 14 de fevereiro de 2026. Anteriormente representou a Noruega, passou a competir pelo Brasil em 2024. Porta-bandeira na cerimonia de abertura.",
      imageUrl: "/images/lucas_braathen.png",
      instagram: "@pinheiiiroo",
    });

    await storage.createEvent({
      athleteId: lucas.id,
      eventName: "Slalom Gigante Masculino",
      date: "2026-02-14",
      time: "10:00",
      result: "Medalha de Ouro (Tempo: 2:25.00)",
      medal: "Gold",
    });

    await storage.createEvent({
      athleteId: lucas.id,
      eventName: "Slalom Masculino",
      date: "2026-02-16",
      time: "09:00",
      result: "Nao completou (DNF)",
      medal: null,
    });

    const nicole = await storage.createAthlete({
      name: "Nicole Rocha Silveira",
      sport: "Skeleton",
      confederation: "CBDG - Confederacao Brasileira de Desportos no Gelo",
      bio: "Porta-bandeira do Brasil. Primeira atleta brasileira de skeleton em Olimpiadas de Inverno (estreia em Pequim 2022, 13o lugar). Enfermeira registrada e atleta de alto nivel. Casada com a atleta belga Kim Meylemans.",
      imageUrl: "/images/nicole_silveira.png",
      instagram: "@nicole__silveira",
    });

    await storage.createEvent({
      athleteId: nicole.id,
      eventName: "Skeleton Feminino",
      date: "2026-02-13",
      time: "16:00",
      result: "11o lugar",
      medal: null,
    });

    const alice = await storage.createAthlete({
      name: "Alice Padilha",
      sport: "Esqui Alpino",
      confederation: "CBDN - Confederacao Brasileira de Desportos na Neve",
      bio: "Primeira brasileira no esqui alpino olimpico em 12 anos. Carioca de 18 anos, mudou-se para a Austria para treinar. Competiu no Slalom Feminino em Milano Cortina 2026.",
      imageUrl: "/images/alice_padilha.png",
      instagram: "@alicepadilha_ski",
    });

    await storage.createEvent({
      athleteId: alice.id,
      eventName: "Slalom Feminino",
      date: "2026-02-18",
      time: "10:00",
      result: "Nao completou (DNF)",
      medal: null,
    });

    const eduarda = await storage.createAthlete({
      name: "Eduarda Ribera",
      sport: "Esqui Cross-Country",
      confederation: "CBDN - Confederacao Brasileira de Desportos na Neve",
      bio: "Competiu em Pequim 2022 e nos Jogos Olimpicos da Juventude de Lausanne. Primeira atleta confirmada para a delegacao brasileira em maio de 2025. Irma do paraatleta Cristian Ribera.",
      imageUrl: "/images/eduarda_ribera.png",
      instagram: "@duda.westemaier",
    });

    await storage.createEvent({
      athleteId: eduarda.id,
      eventName: "Sprint Classico Feminino",
      date: "2026-02-10",
      time: "09:15",
      result: "72o lugar (4:17.05)",
      medal: null,
    });

    await storage.createEvent({
      athleteId: eduarda.id,
      eventName: "10km Intervalo Livre Feminino",
      date: "2026-02-12",
      time: "13:00",
      result: "Nao completou (DNF)",
      medal: null,
    });

    await storage.createEvent({
      athleteId: eduarda.id,
      eventName: "Sprint por Equipes Livre Feminino",
      date: "2026-02-18",
      time: "08:45",
      result: "21o lugar (7:37.26)",
      medal: null,
    });

    const bruna = await storage.createAthlete({
      name: "Bruna Moura",
      sport: "Esqui Cross-Country",
      confederation: "CBDN - Confederacao Brasileira de Desportos na Neve",
      bio: "Estreia olimpica em Milano Cortina 2026 apos jornada de 16 anos. Sobreviveu a um acidente de carro quase fatal a caminho de Pequim 2022. Historia de superacao e resiliencia inspiradora.",
      imageUrl: "/images/bruna_moura.png",
      instagram: "@brunamouraxcbt",
    });

    await storage.createEvent({
      athleteId: bruna.id,
      eventName: "Sprint Classico Feminino",
      date: "2026-02-10",
      time: "09:15",
      result: "74o lugar (4:22.07)",
      medal: null,
    });

    await storage.createEvent({
      athleteId: bruna.id,
      eventName: "10km Intervalo Livre Feminino",
      date: "2026-02-12",
      time: "13:00",
      result: "96o lugar (30:56.09)",
      medal: null,
    });

    await storage.createEvent({
      athleteId: bruna.id,
      eventName: "Sprint por Equipes Livre Feminino",
      date: "2026-02-18",
      time: "08:45",
      result: "21o lugar (7:37.26)",
      medal: null,
    });

    const pat = await storage.createAthlete({
      name: "Pat Burgener",
      sport: "Snowboard Halfpipe",
      confederation: "CBDN - Confederacao Brasileira de Desportos na Neve",
      bio: "Suico-brasileiro, representou a Suica em PyeongChang 2018 e Pequim 2022. Passou a competir pelo Brasil em 2025. Tambem e musico profissional com mais de 4 milhoes de plays no Spotify.",
      imageUrl: "/images/pat_burgener.png",
      instagram: "@patburgener",
    });

    await storage.createEvent({
      athleteId: pat.id,
      eventName: "Halfpipe Masculino - Classificatoria",
      date: "2026-02-11",
      time: "19:30",
      result: "14o lugar (70.00 pts)",
      medal: null,
    });

    const edson = await storage.createAthlete({
      name: "Edson Bindilatti",
      sport: "Bobsled",
      confederation: "CBDG - Confederacao Brasileira de Desportos no Gelo",
      bio: "Lenda do bobsled brasileiro, competindo em sua 6a Olimpiada de Inverno. Piloto da equipe desde 2014, sera porta-bandeira na cerimonia de encerramento. Ex-decatleta, migrou para o bobsled em 1999. Melhor resultado olimpico: 20o lugar em Pequim 2022 no 4-man.",
      imageUrl:
        "https://img.olympics.com/images/image/private/t_1-1_300/f_auto/primary/h706wmelckcxann3teeh",
      instagram: "@edsonbindilatti_oficial",
    });

    await storage.createEvent({
      athleteId: edson.id,
      eventName: "Bobsled 2-man",
      date: "2026-02-16",
      time: "09:00",
      result: "24o lugar",
      medal: null,
    });

    await storage.createEvent({
      athleteId: edson.id,
      eventName: "Bobsled 4-man - Descidas 1 e 2",
      date: "2026-02-21",
      time: "12:30",
      result: "20o lugar (parcial)",
      medal: null,
    });

    await storage.createEvent({
      athleteId: edson.id,
      eventName: "Bobsled 4-man - Descidas 3 e 4",
      date: "2026-02-22",
      time: "12:30",
      result: "19o lugar (resultado final)",
      medal: null,
    });

    const davidson = await storage.createAthlete({
      name: "Davidson de Souza",
      sport: "Bobsled",
      confederation: "CBDG - Confederacao Brasileira de Desportos no Gelo",
      bio: "Conhecido como 'Boka'. Cresceu em uma favela em Sao Paulo, comecou no atletismo (dardo e disco). Competiu pelo Brasil em Sochi 2014 e depois se mudou para o Canada. Retornou a equipe brasileira para Milano Cortina 2026.",
      imageUrl: "/images/davidson_souza.png",
      instagram: "@boka.sp",
    });

    await storage.createEvent({
      athleteId: davidson.id,
      eventName: "Bobsled 4-man - Descidas 1 e 2",
      date: "2026-02-21",
      time: "12:30",
      result: "20o lugar (parcial)",
      medal: null,
    });

    await storage.createEvent({
      athleteId: davidson.id,
      eventName: "Bobsled 4-man - Descidas 3 e 4",
      date: "2026-02-22",
      time: "12:30",
      result: "19o lugar (resultado final)",
      medal: null,
    });

    const rafael = await storage.createAthlete({
      name: "Rafael Souza",
      sport: "Bobsled",
      confederation: "CBDG - Confederacao Brasileira de Desportos no Gelo",
      bio: "Atleta de empurrada da equipe brasileira de bobsled. Competiu em PyeongChang 2018 e retorna para sua segunda Olimpiada em Milano Cortina 2026. Integra a equipe do 4-man ao lado do piloto Edson Bindilatti.",
      imageUrl: "/images/rafael_souza.png",
      instagram: null,
    });

    await storage.createEvent({
      athleteId: rafael.id,
      eventName: "Bobsled 4-man - Descidas 1 e 2",
      date: "2026-02-21",
      time: "12:30",
      result: "20o lugar (parcial)",
      medal: null,
    });

    await storage.createEvent({
      athleteId: rafael.id,
      eventName: "Bobsled 4-man - Descidas 3 e 4",
      date: "2026-02-22",
      time: "12:30",
      result: "19o lugar (resultado final)",
      medal: null,
    });

    const gustavo = await storage.createAthlete({
      name: "Gustavo Ferreira",
      sport: "Bobsled",
      confederation: "CBDG - Confederacao Brasileira de Desportos no Gelo",
      bio: "Nascido em Marilia-SP, comecou no atletismo como velocista (100m e 200m). Aos 17 anos foi recrutado para o bobsled. Competiu nos Jogos Olimpicos da Juventude de Lausanne 2020. Reserva da equipe brasileira de bobsled em Milano Cortina 2026.",
      imageUrl: "/images/gustavo_ferreira.png",
      instagram: "@gustavoferreira_bob",
    });

    await storage.createEvent({
      athleteId: gustavo.id,
      eventName: "Bobsled 4-man - Descidas 1 e 2",
      date: "2026-02-21",
      time: "12:30",
      result: "20o lugar (parcial)",
      medal: null,
    });

    await storage.createEvent({
      athleteId: gustavo.id,
      eventName: "Bobsled 4-man - Descidas 3 e 4",
      date: "2026-02-22",
      time: "12:30",
      result: "19o lugar (resultado final)",
      medal: null,
    });

    const luisBacca = await storage.createAthlete({
      name: "Luis Bacca",
      sport: "Bobsled",
      confederation: "CBDG - Confederacao Brasileira de Desportos no Gelo",
      bio: "Nascido em Sao Carlos-SP, ex-triplista e saltador em distancia. Brakeman da equipe brasileira de bobsled. Competiu ao lado de Bindilatti no 2-man, alcancando o melhor resultado brasileiro na historia da prova (24o lugar).",
      imageUrl: "/images/luiz_bacca.png",
      instagram: "@luisbacca_",
    });

    await storage.createEvent({
      athleteId: luisBacca.id,
      eventName: "Bobsled 2-man",
      date: "2026-02-16",
      time: "09:00",
      result: "24o lugar",
      medal: null,
    });

    await storage.createEvent({
      athleteId: luisBacca.id,
      eventName: "Bobsled 4-man - Descidas 1 e 2",
      date: "2026-02-21",
      time: "12:30",
      result: "20o lugar (parcial)",
      medal: null,
    });

    await storage.createEvent({
      athleteId: luisBacca.id,
      eventName: "Bobsled 4-man - Descidas 3 e 4",
      date: "2026-02-22",
      time: "12:30",
      result: "19o lugar (resultado final)",
      medal: null,
    });

    const manex = await storage.createAthlete({
      name: "Manex Silva",
      sport: "Esqui Cross-Country",
      confederation: "CBDN - Confederacao Brasileira de Desportos na Neve",
      bio: "Nascido em Rio Branco, Acre. Estreou nos Jogos Olimpicos em Pequim 2022 ainda adolescente. Bolsista do programa Olympic Solidarity. Conquistou um historico top 50 no Sprint Classico Masculino em Milano Cortina 2026, o melhor resultado brasileiro masculino na modalidade.",
      imageUrl: "/images/manex_silva.png",
      instagram: "@manexsalsamendi",
    });

    await storage.createEvent({
      athleteId: manex.id,
      eventName: "Sprint Classico Masculino",
      date: "2026-02-10",
      time: "08:57",
      result: "48o lugar (3:25.48)",
      medal: null,
    });

    await storage.createEvent({
      athleteId: manex.id,
      eventName: "10km Intervalo Livre Masculino",
      date: "2026-02-13",
      time: "10:45",
      result: "97o lugar",
      medal: null,
    });

    const giovanni = await storage.createAthlete({
      name: "Giovanni Ongaro",
      sport: "Esqui Alpino",
      confederation: "CBDN - Confederacao Brasileira de Desportos na Neve",
      bio: "Nascido na Italia com ascendencia brasileira. Estreou nos Jogos Olimpicos em Milano Cortina 2026 aos 22 anos. Competiu no Slalom Gigante (31o lugar) e no Slalom (27o lugar), ambos na pista Stelvio em Bormio.",
      imageUrl: "/images/giovanni_ongaro.png",
      instagram: "@ongaro.giovanni",
    });

    await storage.createEvent({
      athleteId: giovanni.id,
      eventName: "Slalom Gigante Masculino",
      date: "2026-02-14",
      time: "10:00",
      result: "31o lugar (Tempo: 2:34.15)",
      medal: null,
    });

    await storage.createEvent({
      athleteId: giovanni.id,
      eventName: "Slalom Masculino",
      date: "2026-02-16",
      time: "09:00",
      result: "27o lugar (Tempo: 2:06.87)",
      medal: null,
    });

    const christian = await storage.createAthlete({
      name: "Christian Oliveira Sovik",
      sport: "Esqui Alpino",
      confederation: "CBDN - Confederacao Brasileira de Desportos na Neve",
      bio: "Nascido no Rio de Janeiro, filho de pai noruegues e mae brasileira. Estuda na Universidade de Denver, onde foi All-American em Slalom e Slalom Gigante. Anteriormente representou a Noruega em competicoes juniores. Estreou nos Jogos Olimpicos em Milano Cortina 2026.",
      imageUrl: "/images/christian_sovik.png",
      instagram: "@christian.sovik",
    });

    await storage.createEvent({
      athleteId: christian.id,
      eventName: "Slalom Masculino",
      date: "2026-02-16",
      time: "09:00",
      result: "Nao completou (DNF)",
      medal: null,
    });

    const augustinho = await storage.createAthlete({
      name: "Augustinho Teixeira",
      sport: "Snowboard Halfpipe",
      confederation: "CBDN - Confederacao Brasileira de Desportos na Neve",
      bio: "Nascido em Ushuaia, Argentina, de mae brasileira. Mecanico de automoveis certificado. Primeiro brasileiro a vencer uma Copa Europeia de snowboard. Mora em Calgary, Canada. Estreou nos Jogos Olimpicos em Milano Cortina 2026 aos 20 anos. Irmao mais novo Joao tambem e snowboarder olimpico.",
      imageUrl: "/images/augustinho.png",
      instagram: "@augustinho7262",
    });

    await storage.createEvent({
      athleteId: augustinho.id,
      eventName: "Halfpipe Masculino - Classificatoria",
      date: "2026-02-11",
      time: "19:30",
      result: "19o lugar (56.50 pts)",
      medal: null,
    });
  }

  return httpServer;
}
