import React, { useState, useEffect } from 'react';
import DefaultLayout from './../components/DefaultLayout';
import api from '../helper.js';
import { Modal } from 'antd';
import ItemList from '../components/ItemList';
import { categories } from '../data.js';

const Homepage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const getAllItems = async () => {
      try {
        const { data } = await api.get('/api/items/get-item');
        setItemsData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllItems();
  }, []);

  const openModal = (categoryName) => {
    setSelectedCategory(categoryName);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setModalVisible(false);
  };

  return (
    <DefaultLayout>
      <h2 className="category-title">CATEGORIES</h2>
      <div className="category-grid">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`category ${
              selectedCategory === category.name && 'category-active'
            }`}
            onClick={() => openModal(category.name)}
          >
            <h5 className="category-name">{category.name}</h5>
            <img
              src={category.imageUrl}
              alt={category.name}
              height="40"
              width="60"
            />
          </div>
        ))}
      </div>
      <Modal
        title={`Items in ${selectedCategory}`}
        visible={modalVisible}
        onCancel={closeModal}
        footer={null}
        width={900}
        style={{ top: '18%', left: '6%'}}
        bodyStyle={{ padding: '15px', marginBottom: '50px' }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '18px',
            height: '380px',
            overflow: 'auto'
          }}
        >
          {itemsData
            .filter((item) => item.category === selectedCategory)
            .map((item) => (
              <div key={item.id}>
                <ItemList item={item} />
              </div>
            ))}
        </div>
      </Modal>
    </DefaultLayout>
  );
};

export default Homepage;
