import React, {useState, useEffect} from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";

import api from "../../service/api";

import './styles.css';
import formImage from '../../assets/undraw_goal_rulh.svg';

function NewTeam() {

  const navigate = useNavigate();
  const  {teamId} = useParams();

  const [id, setId] = useState(null);
  const [nome, setNome] = useState('');
  const [sigla, setSigla] = useState('');
  const [pontos, setPontos] = useState(0);
  const [vitorias, setVitorias] = useState(0);
  const [derrotas, setDerrotas] = useState(0);
  const [empates, setEmpates] = useState(0);
  const [golsMarcados, setGolsMarcados] = useState(0);
  const [golsSofridos, setGolsSofridos] = useState(0);
  const [saldoGols, setSaldoGols] = useState(0);

  useEffect(() => {
    if(teamId === '0') return;
    else loadBook();
  },[teamId]);

  async function loadBook() {
    try {
      const response = await api.get(`/times/${teamId}`)

      setId(response.data.id);
      setNome(response.data.nome);
      setSigla(response.data.sigla);
      setPontos(response.data.pontos);
      setVitorias(response.data.vitorias);
      setDerrotas(response.data.derrotas);
      setEmpates(response.data.empates);
      setGolsMarcados(response.data.golsMarcados);
      setGolsSofridos(response.data.golsSofridos);
      setSaldoGols(response.data.saldoGols);

    } catch (error) {
      alert('Erro ao salvar um novo time! Tente novamente!')
      navigate('/teams')
    }
  }

  async function saveOrUpdate(e) {
    e.preventDefault();

    const data = {nome, sigla, pontos, vitorias, derrotas, empates, golsMarcados, golsSofridos, saldoGols};

    try {

      if(teamId === '0'){
        await api.post('times', data);
      }else {
        data.id = id;
        await api.put(`times/${id}`, data);
      }
      
      navigate('/teams')
    } catch (error) {
      alert('Erro ao salvar um novo time! Tente novamente!')
    }
  }

  return (
   <div className="new-team-container">
    <div className='form-image'>
      <img src={formImage} alt="Imagem do Formulário" />
    </div>
    <div className='form-content'>
      <form onSubmit={saveOrUpdate}>

          <div className="form-header">
            <div className='title'>
              <h1>{teamId === '0' ? 'Cadastrar novo' : 'Atualizar'} time</h1>
            </div>
            <div className='back-teams'>
              <button><Link to="/teams">Ver times</Link></button>
            </div>
          </div>

          <div className='form-inputs'>

            <div className='input-box'>
              <label htmlFor="nome">Nome:</label>
              <input id="nome" name="nome" type="text" placeholder="Digite o nome do time" 
                value={nome} onChange={e => setNome(e.target.value)} />
            </div>

            <div className='input-box'>
              <label htmlFor="sigla">Sigla:</label>
              <input id="sigla" name="sigla" type="text" placeholder="Digite a sigla do time"  
                value={sigla} onChange={e => setSigla(e.target.value)}/>
            </div>

            <div className='input-box'>
              <label htmlFor="vitorias">Vitórias:</label>
              <input id="vitorias" name="vitorias" type="text" placeholder="Digite as vitórias do time"  
                value={vitorias} onChange={e => setVitorias(e.target.value)}/>
            </div>

            <div className='input-box'>
              <label htmlFor="derrotas">Derrotas:</label>
              <input id="derrotas" name="derrotas" type="text" placeholder="Digite as derrotas do time"  
                value={derrotas} onChange={e => setDerrotas(e.target.value)}/>
            </div>

            <div className='input-box'>
              <label htmlFor="empates">Empates:</label>
              <input id="empates" name="empates" type="text" placeholder="Digite os empates do time"  
                value={empates} onChange={e => setEmpates(e.target.value)}/>
            </div>

            <div className='input-box'>
              <label htmlFor="marcados">Gols marcados:</label>
              <input id="marcados" name="marcados" type="text" placeholder="Digite os gols marcados do time"  
                value={golsMarcados} onChange={e => setGolsMarcados(e.target.value)}/>
            </div>

            <div className='input-box'>
              <label htmlFor="sofridos">Gols sofridos:</label>
              <input id="sofridos" name="sofridos" type="text" placeholder="Digite os gols sofridos pelo time" 
               value={golsSofridos} onChange={e => setGolsSofridos(e.target.value)}/>
            </div>

            <div className='input-box'>
              <label htmlFor="saldo">Saldo de Gols:</label>
              <input id="saldo" name="saldo" type="text" placeholder="Digite o saldo de gols do time"  
                value={saldoGols} onChange={e => setSaldoGols(e.target.value)}/>
            </div>

            <div className='input-box'>
              <label htmlFor="pontos">Pontos:</label>
              <input id="pontos" name="pontos" type="text" placeholder="Digite os pontos do time"  
                value={pontos} onChange={e => setPontos(e.target.value)}/>
            </div>
            
          </div>
          <div className='form-button'>
            <button type='submit'>{teamId === '0' ? 'Cadastrar' : 'Atualizar'}</button>
          </div>
      </form>
    </div>
   </div>
  )
}

export default NewTeam;
