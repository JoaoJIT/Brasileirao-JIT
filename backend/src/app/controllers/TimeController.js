import Time from "../model/Time.js";
import TimeRepository from "../repositories/TimeRepository.js";

class TimeController {
  async findAll(request, response) {
    try {
      const result = await TimeRepository.findAll();
      response.json(result);
    } catch (error) {
      response.json(error);
    }
  }

  async findById(request, response) {
    const id = request.params.id;
    try {
      const result = await TimeRepository.findById(id);
      if (Object.keys(result).length == 0) {
        response.json({ message: "ID not found" });
      } else {
        response.json(result);
      }
    } catch (error) {
      response.json(error);
    }
  }

  async findBySigla(request, response) {
    const sigla = request.params.sigla.toUpperCase();
    try {
      const result = await TimeRepository.findBySigla(sigla);
      if (Object.keys(result).length == 0) {
        response.json({
          message:
            "Essa sigla não existe ou esse time não faz parte do campeonato",
        });
      } else {
        response.json(result);
      }
    } catch (error) {
      response.json(error);
    }
  }

  async updateById(request, response) {
    const id = request.params.id;
    try {
      const exists = await TimeRepository.findById(id);
      if (Object.keys(exists).length == 0) {
        response.json({ message: "ID not found" });
      } else {
        try {
          const time = new Time(
            request.body.nome,
            request.body.sigla,
            request.body.pontos,
            request.body.vitorias,
            request.body.derrotas,
            request.body.empates,
            request.body.golsMarcados,
            request.body.golsSofridos
          );
          await TimeRepository.updateById(id, time);
          response.json({ message: "Success" });
        } catch (error) {
          response.json(error);
        }
      }
    } catch (error) {
      request.json(error);
    }
  }

  async deleteById(request, response) {
    const id = request.params.id;
    try {
      const exists = await TimeRepository.findById(id);
      if (Object.keys(exists).length == 0) {
        response.json({ message: "ID not found" });
      } else {
        await TimeRepository.delete(id);
        response.json({ message: "Success" });
      }
    } catch (error) {
      response.json(error);
    }
  }

  async store(request, response) {
    const sigla = request.params.sigla;
    try {
      const exists = await TimeRepository.findBySigla(sigla);
      if (Object.keys(exists).length > 0) {
        response.json({
          message: "Esse time já está cadastrado no campeonato",
        });
      } else {
        try {
          const time = new Time(
            request.body.nome,
            request.body.sigla,
            request.body.pontos,
            request.body.vitorias,
            request.body.derrotas,
            request.body.empates,
            request.body.golsMarcados,
            request.body.golsSofridos,
            request.body.saldoGols
          );
          await TimeRepository.create(time);
          response.json({ message: "Success" });
        } catch (error) {
          response.json(error);
        }
      }
    } catch (error) {
      response.json(error);
    }
  }
}

export default new TimeController();
