import connection from "../../config/database/connection.js";

class TimeRepository {
  queryTime(sql, params = "") {
    return new Promise((resolve, reject) => {
      connection.query(sql, params, (error, result) => {
        if (error) {
          const erro = {
            erro: "SQL - reject",
            message: error.message,
          };
          return reject(erro);
        } else {
          const row = JSON.parse(JSON.stringify(result.rows));
          return resolve(row);
        }
      });
    });
  }

  create(time) {
    const sql = `
        INSERT INTO times_brasileirao_2024 
        (nome, sigla, pontos, vitorias, derrotas, empates, gols_marcados, gols_sofridos)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *`;

    return this.queryTime(sql, [
      time.nome,
      time.sigla,
      time.pontos,
      time.vitorias,
      time.derrotas,
      time.derrotas,
      time.empates,
      time.gols_marcados,
      time.gols_sofridos,
    ]);
  }

  findAll() {
    const sql = "SELECT * FROM times_brasileirao_2024 ORDER BY pontos DESC";
    return this.queryTime(sql);
  }

  findBySigla(sigla) {
    const sql = "SELECT * FROM times_brasileirao_2024 WHERE sigla = $1";
    return this.queryTime(sql, [sigla]);
  }

  update(id, time) {}
}
