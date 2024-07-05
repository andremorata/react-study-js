import { Link } from 'react-router-dom';
import './erro.css'

export default function Erro() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Página não encontrada!</h2>
      <Link className='back-button' to="/">Voltar para a Home</Link>
    </div>
  );
}