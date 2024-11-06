const EmptyCart = ({ onNavigateHome }) => (
  <div className="empty-cart cart-container">
    <h1>Carrinho Vazio</h1>
    <button onClick={onNavigateHome}>Voltar às compras</button>
  </div>
);

export default EmptyCart;