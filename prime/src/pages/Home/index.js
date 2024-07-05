import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './home.css';

function Home() {

  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Home';

    async function loadFilmes() {
      const response = await api.get('/movie/now_playing', {
        params: {
          api_key: 'e25ce4c1fd8672c1ee97853eae8f8704',
          language: 'pt-BR',
          page: 1
        }
      });
      setFilmes(response.data.results);
      setLoading(false);
    }

    loadFilmes();

  }, []);

  if (loading) {
    return (
      <div className='loading'>
        <h1>Carregando filmes...</h1>
      </div>
    );
  }

  return (
    <div className='container'>
      <div className='lista-filmes'>
        {filmes.map(filme => (
          <article key={filme.id}>
            <strong>{filme.title}</strong>
            <img src={`https://image.tmdb.org/t/p/w300${filme.poster_path}`} alt={filme.title} />
            <Link to={`/filme/${filme.id}`}>Acessar</Link>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Home;