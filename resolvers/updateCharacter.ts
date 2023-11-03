import { Request, Response } from "npm:express@4.18.2";
import CharacterFromAPIModel from "../db/Character.ts";

const updateCharacter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
      res.status(400).send("Name and age are required");
      return;
    }

    const updatedCharacter = await CharacterFromAPIModel.findOneAndUpdate(
      { id },
      { name },
      { new: true }
    ).exec();

    if (!updatedCharacter) {
      res.status(404).send("Character not found");
      return;
    }

    res.status(200).send({
      name: updatedCharacter.name,
      episode: updatedCharacter.episode,
      id: updatedCharacter._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default updateCharacter;