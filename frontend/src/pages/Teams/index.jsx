import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import api from "../../service/api";

import "./styles.css";

function Teams() {
  const navigate = useNavigate();

  const [teams, setTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [teamId, setTeamId] = useState(0);
  const [successMessage, setSuccessMessage] = useState(""); 

  // Obter a mensagem de sucesso da URL (usando useLocation)
  const location = useLocation();

  useEffect(() => {
    api.get("times").then((response) => {
      setTeams(response.data);
      console.log(response);
    });

    if(location.state && location.state.successMessage){
      setSuccessMessage(location.state.successMessage);
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  }, []);

  const handleDeleteClick = (name,id) => {
    setTeamName(name);
    setTeamId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if(teamName){
      deleteTeam(teamId);
    }
    setShowModal(false);
    setTeamName('');
    setTeamId(0);
  };

  async function deleteTeam(id) {
    try {
      await api.delete(`times/${id}`);
      setTeams(teams.filter((team) => team.id !== id));

      setSuccessMessage(`O time "${teamName}" foi excluído com sucesso!`);
      setTimeout(() => setSuccessMessage(""), 3000);
      
    } catch (error) {
      alert("Erro ao excluír time! Tente novamente!");
    }
  }

  async function editTeam(id) {
    try {
      navigate(`/team/edit/${id}`)
    } catch (error) {
      alert("Erro ao editar time! Tente novamente!");
    }
  }

  return (
    <div className="team-container">
      {/* Mensagem de sucesso */}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <header>
        <Link to={"/"}>
          <span>FutBrasil</span>
        </Link>
        <Link to="/team/new">Adicionar novo time</Link>
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
                  onClick={() => handleDeleteClick(team.nome, team.id)}
                  size={18}
                  color="red"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Tem certeza que deseja excluir o time <strong>{teamName}</strong>?</p>
            <div className="button-group">
              <button className="confirm-btn" onClick={confirmDelete}>Sim</button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Teams;
