import React from 'react';
import { Button, Card } from 'antd';
import { useDispatch } from 'react-redux';
const ItemList = ({ item }) => {
  const dispatch = useDispatch();
  //update cart handler
  const handleAddTOCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...item, quantity: 1 }
    });
  };
  const { Meta } = Card;
  return (
    <div className="item-card">
   <Card
  hoverable
  style={{ width: 200, marginBottom: 20 }}
  cover={<img alt={item.name} src={item.image} style={{ height: 160 }} />}
>
    <div className="item-content">
      <Meta title={item.name} description={`$${item.price}`} />
      <div className="item-button">
        <Button onClick={() => handleAddTOCart()}>Add to cart</Button>
      </div>
    </div>
  </Card>
</div>

  );
};

export default ItemList;
