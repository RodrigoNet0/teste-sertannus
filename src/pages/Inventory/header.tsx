import React, { useState, useEffect } from 'react';

interface Item {
  nome: string;
  descricao: string;
  quantidade: number; 
  categoria: string;
  imagem: string;
}

function Header() {
  const [isAdding, setIsAdding] = useState(false);
  const [items, setItems] = useState<Item[]>([]); 
  const [newItem, setNewItem] = useState<Item>({
    nome: '',
    descricao: '',
    quantidade: 0, 
    categoria: '',
    imagem: ''
  });

  useEffect(() => {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  const handleAddItemClick = () => {
    setIsAdding(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: name === 'quantidade' ? Number(value) : value 
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewItem((prevItem) => ({
        ...prevItem,
        imagem: reader.result as string
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAddItem = () => {
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
    setNewItem({
      nome: '',
      descricao: '',
      quantidade: 0,
      categoria: '',
      imagem: ''
    });
    setIsAdding(false);
  };

  return (
    <>
      <header>
        <nav className="flex justify-between items-center p-4 bg-gray-100">
          <div className="flex items-center">
            <img
              src="https://th.bing.com/th/id/OIP.YbBndl3F_2S-2k8t83Bk1AHaHa?w=2000&h=2000&rs=1&pid=ImgDetMain"
              alt="Workflow"
              className="h-8 w-auto"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={handleAddItemClick}
            >
              Adicionar Item
            </button>
          </div>
        </nav>
      </header>

      {isAdding && (
        <div className="p-4">
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={newItem.nome}
            onChange={handleInputChange}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="descricao"
            placeholder="Descrição"
            value={newItem.descricao}
            onChange={handleInputChange}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="number"
            name="quantidade"
            placeholder="Quantidade"
            value={newItem.quantidade}
            onChange={handleInputChange}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="categoria"
            placeholder="Categoria"
            value={newItem.categoria}
            onChange={handleInputChange}
            className="border p-2 mb-2 w-full"
          />
          <input
            type="file"
            name="imagem"
            onChange={handleImageChange}
            className="border p-2 mb-2 w-full"
          />
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={handleAddItem}
          >
            Salvar Item
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {items.map((item, index) => (
          <div key={index} className="border p-4 rounded shadow">
            <img src={item.imagem} alt={item.nome} className="w-full h-32 object-cover mb-2" />
            <h2 className="text-lg font-bold">{item.nome}</h2>
            <p>{item.descricao}</p>
            <p>Quantidade: {item.quantidade}</p>
            <p>Categoria: {item.categoria}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Header;
