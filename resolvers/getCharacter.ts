//@ts-ignore
import { Request, Response } from "npm:express@4.18.2";
import { CharacterFromAPI } from "../types.ts";

const getCharacter = async (req: Request, res: Response) => {
  try {
    // Recoger id de la ruta
    const id = req.params.id;
    // Consultar API
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${id}`
    );
    if (response.status !== 200) {
      res.status(response.status).send(response.statusText);
      return;
    }

    // Crear objeto Character con datos JSON
    const character: CharacterFromAPI = await response.json();

    // Obtener episodios a patir de un array strings
    //["https...","https..."] -> ["jungla","pepinillo rick"]
    const episodes = await Promise.all(
      character.episode.map(async (episode) => {
        const response = await fetch(episode); // Consultar a la url / api externa ("http//episode_rick_morty")
        // Comprobar estado !==200 (correcto) -> throw error en caso de fallo
        if (response.status !== 200) {
          throw new Error(`Episode ${episode} not found`);
        }
        const episodeData = await response.json(); // Cargar datos todos datos del json en una variable 
        return episodeData.name, episodeData.characters; // transforma url en nombre del episode
      })
    );

    res.send({
      name: character.name,
      episodes,
    });

  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getCharacter;