import { buscaEndereco } from '../services/cep';
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const BuscarCep = ({ endereco, setEndereco }) => {
  const [erro, setErro] = useState('');
  const [cep, setCep] = useState('');

  const [nmrCasa, setNmrCasa] = useState('');
  const [complement, setComplement] = useState('');
  const [rua, setRua] = useState('');
  const [completAdress, setCompleteAdress] = useState({
    logradouro: '',
    complemento: '',
    number: '',
    localidade: '',
    uf: '',
  });
  const storageCompleteAdress = JSON.parse(
    localStorage.getItem('completeAdress')
  );
  console.log(storageCompleteAdress);

  const handleNumberHome = (e) => {
    setNmrCasa(e.target.value);
    setCompleteAdress({
      ...completAdress,
      number: e.target.value,
    });
  };

  const handleComplement = (e) => {
    setComplement(e.target.value);
    setCompleteAdress({
      ...completAdress,
      complemento: e.target.value,
    });
  };

  const handleRua = (e) => {
    setRua(e.target.value);
    setCompleteAdress({
      ...completAdress,
      logradouro: e.target.value,
    });
    console.log(rua);
  };

  const handleCepChange = (e) => {
    setCep(e.target.value);
  };

  const handleCompleteAdress = (e) => {
    e.preventDefault();
    console.log(completAdress);
    localStorage.setItem('completeAdress', JSON.stringify(completAdress));
  };

  const buscarCep = async () => {
    try {
      const enderecoData = await buscaEndereco(cep);
      setEndereco(enderecoData);
      setCompleteAdress({
        ...completAdress,
        logradouro: enderecoData.logradouro,
        localidade: enderecoData.localidade,
        uf: enderecoData.uf,
      });
      localStorage.setItem('completeAdress', JSON.stringify(completAdress));
      setErro(''); // Limpa qualquer erro anterior
    } catch (error) {
      setEndereco(null);
      setErro('CEP não encontrado ou inválido.');
    }
  };
  return (
    <div>
      <address className="endereco">
        {storageCompleteAdress && (
          <div className="info-endereco">
            <h6>Endereço atual</h6>
            <div>
              <p>
                {storageCompleteAdress.localidade}/{storageCompleteAdress.uf}
              </p>
              {storageCompleteAdress.logradouro ? (
                <div>
                  <p>Rua/Av.: {storageCompleteAdress.logradouro}</p>
                  <p>
                    Nmr./Complemento: {storageCompleteAdress.number}/
                    {storageCompleteAdress.complemento}
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

        <Dropdown className="container-buscador">
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
          <div className='toggle-div'>
            <Dropdown.Toggle className="btn-toggle">
              Complete o endereço
            </Dropdown.Toggle>
          </div>
          <Dropdown.Menu>
            <form
              onSubmit={(e) => handleCompleteAdress(e)}
              className="complement"
            >
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
                <input
                  id="complemento"
                  type="text"
                  onChange={handleComplement}
                />
              </div>

              <button type="submit" className="editAdress">
                Atualizar endereço
              </button>
            </form>
          </Dropdown.Menu>
        </Dropdown>
      </address>
    </div>
  );
};

export default BuscarCep;
