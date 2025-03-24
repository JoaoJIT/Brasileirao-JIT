import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../service/api";
import "./styles.css";
import formImage from "../../assets/undraw_goal_rulh.svg";

function NewTeam() {
  const navigate = useNavigate();
  const { teamId } = useParams();
  const isEditing = Boolean(teamId);

  const [id, setId] = useState(null);
  const [nome, setNome] = useState("");
  const [sigla, setSigla] = useState("");
  const [pontos, setPontos] = useState("0");
  const [vitorias, setVitorias] = useState("0");
  const [derrotas, setDerrotas] = useState("0");
  const [empates, setEmpates] = useState("0");
  const [gols_marcados, setGolsMarcados] = useState("0");
  const [gols_sofridos, setGolsSofridos] = useState("0");

  useEffect(() => {
    if(isEditing){
      loadTeam();
    } else {
      // Reset para novo time
      setId(null);
      setNome("");
      setSigla("");
      setPontos("0");
      setVitorias("0");
      setDerrotas("0");
      setEmpates("0");
      setGolsMarcados("0");
      setGolsSofridos("0");
    }
  }, [teamId]);

  async function loadTeam() {
    try {
      const response = await api.get(`/times/${teamId}`);

      if (response.status !== 200) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const teamData = response.data;

      // Verifica se é um array e pega o primeiro elemento
      const team = Array.isArray(teamData) ? teamData[0] : teamData;

      if (!team) {
        throw new Error("Time não encontrado");
      }

      setId(team.id);
      setNome(team.nome);
      setSigla(team.sigla);
      setPontos(team.pontos?.toString() || "0");
      setVitorias(team.vitorias?.toString() || "0");
      setDerrotas(team.derrotas?.toString() || "0");
      setEmpates(team.empates?.toString() || "0");
      setGolsMarcados(team.gols_marcados?.toString() || "0");
      setGolsSofridos(team.gols_sofridos?.toString() || "0");
    } catch (error) {
      console.error("Erro detalhado:", error);
      alert(`Erro ao carregar time: ${error.message}`);
      navigate("/teams");
    }
  }

  function validateNumbers() {
    const numericFields = {
      pontos,
      vitorias,
      derrotas,
      empates,
      gols_marcados,
      gols_sofridos,
    };

    for (const [field, value] of Object.entries(numericFields)) {
      if (isNaN(value) || value.trim() === "") {
        alert(`Campo inválido: ${field}`);
        return false;
      }
    }
    return true;
  }

  async function saveOrUpdate(e) {
    e.preventDefault();

    if (!validateNumbers()) return;

    const numericData = {
      pontos: parseInt(pontos, 10),
      vitorias: parseInt(vitorias, 10),
      derrotas: parseInt(derrotas, 10),
      empates: parseInt(empates, 10),
      gols_marcados: parseInt(gols_marcados, 10),
      gols_sofridos: parseInt(gols_sofridos, 10),
    };

    const data = {
      nome,
      sigla,
      ...numericData,
    };

    try {
      if (isEditing) {
        data.id = id;
        const response = await api.put(`times/${id}`, data);
        console.log("Time atualizado:", response.data);
      } else {
        const response = await api.post("times", data);
        console.log("Time criado:", response.data);
      }
      navigate("/teams");
    } catch (error) {
      console.error("Erro na operação:", error.response?.data || error.message);
      alert(`Erro: ${error.response?.data?.message || error.message}`);
    }
  }

  return (
    <div className="new-team-container">
      <div className="form-image">
        <img src={formImage} alt="Imagem do Formulário" />
      </div>
      <div className="form-content">
        <form onSubmit={saveOrUpdate}>
          <div className="form-header">
            <div className="title">
              <h1>{isEditing ? "Editar" : "Cadastrar novo"} time</h1>
            </div>
            <div className="back-teams">
              <button>
                <Link to="/teams">Ver times</Link>
              </button>
            </div>
          </div>

          <div className="form-inputs">
            <div className="input-box">
              <label htmlFor="nome">Nome:</label>
              <input
                id="nome"
                name="nome"
                type="text"
                placeholder="Digite o nome do time"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className="input-box">
              <label htmlFor="sigla">Sigla:</label>
              <input
                id="sigla"
                name="sigla"
                type="text"
                placeholder="Digite a sigla do time"
                value={sigla}
                onChange={(e) => setSigla(e.target.value)}
              />
            </div>

            <div className="input-box">
              <label htmlFor="vitorias">Vitórias:</label>
              <input
                id="vitorias"
                name="vitorias"
                type="text"
                placeholder="Digite as vitórias do time"
                value={vitorias}
                onChange={(e) => setVitorias(e.target.value)}
              />
            </div>

            <div className="input-box">
              <label htmlFor="derrotas">Derrotas:</label>
              <input
                id="derrotas"
                name="derrotas"
                type="text"
                placeholder="Digite as derrotas do time"
                value={derrotas}
                onChange={(e) => setDerrotas(e.target.value)}
              />
            </div>

            <div className="input-box">
              <label htmlFor="empates">Empates:</label>
              <input
                id="empates"
                name="empates"
                type="text"
                placeholder="Digite os empates do time"
                value={empates}
                onChange={(e) => setEmpates(e.target.value)}
              />
            </div>

            <div className="input-box">
              <label htmlFor="marcados">Gols marcados:</label>
              <input
                id="marcados"
                name="marcados"
                type="text"
                placeholder="Digite os gols marcados do time"
                value={gols_marcados}
                onChange={(e) => setGolsMarcados(e.target.value)}
              />
            </div>

            <div className="input-box">
              <label htmlFor="sofridos">Gols sofridos:</label>
              <input
                id="sofridos"
                name="sofridos"
                type="text"
                placeholder="Digite os gols sofridos pelo time"
                value={gols_sofridos}
                onChange={(e) => setGolsSofridos(e.target.value)}
              />
            </div>

            <div className="input-box">
              <label htmlFor="pontos">Pontos:</label>
              <input
                id="pontos"
                name="pontos"
                type="text"
                placeholder="Digite os pontos do time"
                value={pontos}
                onChange={(e) => setPontos(e.target.value)}
              />
            </div>
          </div>
          <div className="form-button">
            <button type="submit">{isEditing ? "Atualizar" : "Cadastrar"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewTeam;
