import { buscaEndereco } from '../services/cep';
import { useState } from 'react';




const BuscarCep = ({endereco, setEndereco}) => {
  const [erro, setErro] = useState('');
  const [cep, setCep] = useState('');
  
  const [nmrCasa, setNmrCasa] = useState('');
  const [complement, setComplement] = useState('');
  const [rua, setRua] = useState('');
  
  const handleNumberHome = (e) => {
    setNmrCasa(e.target.value);
  };
  
  const handleComplement = (e) => {
    setComplement(e.target.value);
  };
  
  const handleRua = (e) => {
    setRua(e.target.value);
  };
  
  const handleCepChange = (e) => {
    setCep(e.target.value);
  };
  const buscarCep = async () => {
    try {
      const enderecoData = await buscaEndereco(cep);
      setEndereco(enderecoData);
      setErro(''); // Limpa qualquer erro anterior
    } catch (error) {
      setEndereco(null);
      setErro('CEP não encontrado ou inválido.');
    }
  };
  return (
    <div>
      <address className="endereco">
        {endereco && (
          <div className="info-endereco">
            <h6>Endereço atual</h6>
            <div>
              <p>
                {endereco.localidade}/{endereco.uf}
              </p>
              {endereco.logradouro ? (
                <div>
                  <p>{endereco.logradouro}</p>
                  <p>
                    Nmr./Complemento: {nmrCasa}/{complement}
                  </p>
                </div>
              ) : (
                <div>
                  <p>Rua/Av.: {rua}</p>
                  <p>
                    Nmr./Complemento: {nmrCasa}/{complement}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="container-buscador">
          <h6>Buscar Endereço</h6>
          <div className="buscadorCep">
            <input
              type="text"
              onChange={handleCepChange}
              placeholder="Digite o CEP"
            />
            <button onClick={buscarCep}>
              <i className="bi bi-search"></i>
            </button>
          </div>
        </div>

        <div className="complement">
          <div>
            <label htmlFor="rua">Rua:</label>
            <input id="rua" type="text" onChange={handleRua} />
          </div>

          <div>
            <label htmlFor="numero">Número: </label>
            <input id="numero" type="text" onChange={handleNumberHome} />
          </div>

          <div>
            <label htmlFor="complemento">Complemento:</label>
            <input id="complemento" type="text" onChange={handleComplement} />
          </div>

          <button className="editAdress">Atualizar endereço</button>
        </div>
      </address>
    </div>
  );
};

export default BuscarCep;
