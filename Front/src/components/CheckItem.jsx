const CheckItem = ({ item, quantidade }) => {
  return (
    <div>
      <ul className="list-item">
        <li>{item.name}</li>
        <div className="info-item">
          <li>{quantidade || 0}x</li>
          <li>R$ {(item.price * quantidade).toFixed(2)}</li>
        </div>
      </ul>
    </div>
  );
};

export default CheckItem;
