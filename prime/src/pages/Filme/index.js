import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

import './filme.css';

export default function Filme() {

  const { id } = useParams();
  const [filme, setFilme] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadFilme() {
      await api.get(`/movie/${id}`, {
        params: {
          api_key: 'e25ce4c1fd8672c1ee97853eae8f8704',
          language: 'pt-BR',
        }
      })
        .then(response => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(error => {
          if (error.response.status === 404) {
            setFilme([]);
            setLoading(false);
            navigate('/', { replace: true });
          }
        });

    }

    loadFilme();

    return () => {

    }
  }, [id, navigate]);

  function salvarFilme() {
    const entry = '@primeflix'
    const minhaLista = localStorage.getItem(entry);
    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some(filmeSalvo => filmeSalvo.id === filme.id);

    if (hasFilme) {
      alert('Você já possui esse filme salvo.');
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem(entry, JSON.stringify(filmesSalvos));
    alert('Filme salvo com sucesso!');
  }

  if (loading) {
    return (
      <div>
        <h1>Carregando filme...</h1>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original${filme.backdrop_path}`} alt={filme.title} />

      <h2>Sinopse</h2>
      <p>{filme.overview}</p>

      <h2>Informações</h2>
      <div>
        <strong>Título Original:</strong> {filme.original_title}
      </div>
      <div>
        <strong>Nota:</strong> {filme.vote_average.toFixed(2)}/10
      </div>
      <div>
        <strong>Número de votos:</strong> {filme.vote_count}
      </div>
      <div>
        <strong>Lançamento:</strong> {new Date(filme.release_date).toLocaleDateString('pt-BR')}
      </div>

      <div className="buttons">
        <button
          className="button success"
          onClick={salvarFilme}
        >
          Favoritar
        </button>
        <a
          href={`https://www.youtube.com/results?search_query=${filme.title} trailer`}
          target="blank"
          rel="external"
          className="button info"
        >
          Trailer
        </a>
        <Link className="button" to="/">Voltar</Link>
      </div>

    </div>
  );
}
