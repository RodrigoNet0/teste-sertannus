import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    nome: "",
    descricao: "",
    quantidade: 0,
    categoria: "",
    imagem: "",
  });
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); // Adicionado estado para a pesquisa

  useEffect(() => {
    const storedItems = localStorage.getItem("items");
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
      [name]: name === "quantidade" ? Number(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewItem((prevItem) => ({
        ...prevItem,
        imagem: reader.result as string,
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAddItem = () => {
    if (
      !newItem.nome ||
      !newItem.descricao ||
      !newItem.quantidade ||
      !newItem.categoria ||
      !newItem.imagem
    ) {
      toast.error("Preencha todos os campos!");
      return;
    }

    if (isEditing !== null) {
      const updatedItems = items.map((item, index) =>
        index === isEditing ? newItem : item
      );
      setItems(updatedItems);
      setIsEditing(null);
    } else {
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
    }

    localStorage.setItem("items", JSON.stringify(items));
    setNewItem({
      nome: "",
      descricao: "",
      quantidade: 0,
      categoria: "",
      imagem: "",
    });
    setIsAdding(false);
  };

  const handleEditItem = (index: number) => {
    setNewItem(items[index]);
    setIsAdding(true);
    setIsEditing(index);
  };

  const handleDeleteItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
  };

  const handleViewDetails = (item: Item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  // Função para lidar com a mudança no termo de pesquisa
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filtrar os itens com base no termo de pesquisa
  const filteredItems = items.filter((item) =>
    item.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <input
              type="search"
              placeholder="Buscar..."
              className="border p-2 mb-2 w-60"
              value={searchTerm} 
              onChange={handleSearchChange} 
            />
            <button
              className="text-gray-500 hover:text-gray-700 bg-gray-200 hover:bg-gray-300 border p-2 mb-2 w-60"
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
            {isEditing !== null ? "Atualizar Item" : "Salvar Item"}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {filteredItems.map((item, index) => (
          <div key={index} className="border p-4 rounded shadow">
            <img
              src={item.imagem}
              alt={item.nome}
              className="w-full h-32 object-cover mb-2"
            />
            <h2 className="text-lg font-bold">{item.nome}</h2>
            <p>{item.descricao}</p>
            <p>Quantidade: {item.quantidade}</p>
            <p>Categoria: {item.categoria}</p>
            <div className="flex space-x-2 mt-2">
              <button
                className="bg-green-500 text-white p-2 rounded"
                onClick={() => handleEditItem(index)}
              >
                Editar
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded"
                onClick={() => handleDeleteItem(index)}
              >
                Excluir
              </button>
              <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={() => handleViewDetails(item)}
              >
                Detalhes
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <img
              src={selectedItem.imagem}
              alt={selectedItem.nome}
              className="w-full h-64 object-cover mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{selectedItem.nome}</h2>
            <p>{selectedItem.descricao}</p>
            <p className="mt-2">Quantidade: {selectedItem.quantidade}</p>
            <p>Categoria: {selectedItem.categoria}</p>
            <button
              className="bg-red-500 text-white p-2 mt-4 rounded"
              onClick={closeModal}
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
}

export default Header;
