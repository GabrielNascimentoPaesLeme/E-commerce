import axios from 'axios';

export async function buscaEndereco(cep) {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    
    // Verifica se houve erro no retorno
    if (response.data.erro) {
      throw new Error('CEP não encontrado');
    }

    return response.data;
  } catch (error) {
    console.error('Erro ao buscar o endereço:', error);
    throw error;
  }
}
