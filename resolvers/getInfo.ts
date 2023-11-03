import { Response } from "npm:express@4.18.2";
import CharacterFromAPIModel from "../db/Character.ts";

// Esta función maneja una solicitud para obtener todos los clientes.
const getInfo = async (req: Request, res: Response) => {
  try {
    
    // Busca todos los clientes en la base de datos
    const Characters = await CharacterFromAPIModel.find({}).exec();

    // Si no se encuentran clientes.
    if (!Characters) {
      res.status(404).send("Characters not found");
      return;
    }
    
    // Caso contrario, envía una respuesta con la lista de clientes.
    res.status(200).send({
        Characters
    });

  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getInfo;