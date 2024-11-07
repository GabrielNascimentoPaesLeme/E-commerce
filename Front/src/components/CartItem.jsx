const CartItem = ({ item, quantidade, onAdd, onRemove }) => {
  return (
    <div className="item-cart">
      <div className="descriptionCart">
        <img src={'#'} className="w-20 h-20 rounded-lg object-cover" />
        <div>
          <h4>{item.name}</h4>
          <h6>R$ {(item.price * quantidade).toFixed(2)}</h6>
        </div>
      </div>
      <div className="quantidade-itens">
        <button onClick={onRemove} className="quantity-btn">
        {quantidade !== 1 ? '-': <i class="bi bi-x"></i>}
        </button>
        <p>{quantidade || 0}</p>
        <button onClick={onAdd} className="quantity-btn">
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
