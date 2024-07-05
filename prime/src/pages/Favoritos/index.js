import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import './favoritos.css';

export default function Favoritos() {

  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const entry = '@primeflix'
    const minhaLista = localStorage.getItem(entry);
    let filmesSalvos = JSON.parse(minhaLista) || [];

    setFilmes(filmesSalvos);
    setLoading(false);
  }, []);

  function removerFilme(id) {
    const entry = '@primeflix'
    const minhaLista = localStorage.getItem(entry);
    let filmesSalvos = JSON.parse(minhaLista) || [];

    const newFilmes = filmesSalvos.filter(filme => filme.id !== id);

    localStorage.setItem(entry, JSON.stringify(newFilmes));
    setFilmes(newFilmes);

    toast.success('Filme removido com sucesso!');
  }

  if (loading) {
    return (
      <div>
        <h1>Carregando filmes...</h1>
      </div>
    );
  }

  return (
    <div className='favoritos'>
      <h1>Meus Filmes Favoritos</h1>

      {filmes.length === 0 && <h2>Você não possui filmes salvos ☹️</h2>}

      <ul className='items'>
        {filmes.map(filme => (
          <li className='item' key={filme.id}>
            
            <img src={`https://image.tmdb.org/t/p/original${filme.poster_path}`} alt={filme.title} />
            
            <div className='content'>
              
              <h2>{filme.title}</h2>
              
              <div className='buttons'>
                <Link
                  className='button info'
                  to={`/filme/${filme.id}`}
                >
                  Ver detalhes
                </Link>

                <button
                  className='button danger'
                  onClick={() => removerFilme(filme.id)}
                >
                  Remover
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

}