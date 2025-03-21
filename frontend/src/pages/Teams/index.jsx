import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import api from "../../service/api";

import "./styles.css";

function Teams() {
  const navigate = useNavigate();

  const [teams, setTeams] = useState([]);

  useEffect(() => {
    api.get("times").then((response) => {
      setTeams(response.data);
      console.log(response);
    });
  }, []);

  async function deleteTeam(id) {
    try {
      await api.delete(`times/${id}`);

      setTeams(teams.filter((team) => team.id !== id));
    } catch (error) {
      alert("Erro ao excluír time! Tente novamente!");
    }
  }

  async function editTeam(id) {
    try {
      navigate(`/team/new/${id}`);
    } catch (error) {
      alert("Erro ao editar time! Tente novamente!");
    }
  }

  return (
    <div className="team-container">
      <header>
        <Link to={"/"}>
          <span>FutBrasil</span>
        </Link>
        <Link to="/team/new/0">Adicionar novo time</Link>
      </header>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sigla</th>
            <th>Pontos</th>
            <th>Vitorias</th>
            <th>Derrotas</th>
            <th>Empates</th>
            <th>Gols Marcados</th>
            <th>Gols Sofridos</th>
            <th>Saldo de Gols</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id}>
              <td>{team.nome}</td>
              <td>{team.sigla}</td>
              <td>{team.pontos}</td>
              <td>{team.vitorias}</td>
              <td>{team.derrotas}</td>
              <td>{team.empates}</td>
              <td>{team.gols_marcados}</td>
              <td>{team.gols_sofridos}</td>
              <td>{team.saldo_gols}</td>
              <td className="table-options">
                <FiEdit3
                  onClick={() => editTeam(team.id)}
                  size={18}
                  color="#251fc5"
                />
                <FiTrash2
                  onClick={() => deleteTeam(team.id)}
                  size={18}
                  color="red"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teams;
