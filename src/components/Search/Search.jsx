import React, { useState, useEffect } from "react"; // Importa useState
import { useDispatch, useSelector } from "react-redux"; // Importa useSelector
import { searchByTitle, reset } from "../../features/post/postSlice";
import Post from "../Post/Post"; // Asume que Post es el componente que muestra la lista de posts
import { Input, Button, Spin, Alert } from "antd"; // Componentes de Ant Design
import { SearchOutlined } from "@ant-design/icons";

const { Search: AntdSearch } = Input; // Renombra Input.Search para evitar conflictos

const Search = () => { // Renombrado a SearchComponent para evitar conflicto con la ruta
  const dispatch = useDispatch();
  const { posts, isLoading, isError, message } = useSelector((state) => state.posts); // Obtén los posts del estado

  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

  // useEffect para limpiar el estado al desmontar el componente
  useEffect(() => {
    return () => {
      dispatch(reset()); // Limpia el estado de posts al salir de la página de búsqueda
    };
  }, [dispatch]);

  // Función para manejar la búsqueda cuando el usuario presiona Enter o el botón de búsqueda
  const handleSearch = (value) => {
    if (value.trim()) { // Solo busca si el valor no está vacío
      setSearchTerm(value.trim()); // Guarda el término de búsqueda en el estado
      dispatch(searchByTitle(value.trim())); // Dispara la acción de búsqueda
    } else {
      setSearchTerm('');
      dispatch(reset()); // Si el campo está vacío, resetea la búsqueda
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Buscar Publicaciones</h2>
      <AntdSearch
        placeholder="Introduce el título del post a buscar..."
        allowClear
        enterButton={<Button type="primary" icon={<SearchOutlined />}>Buscar</Button>}
        size="large"
        onSearch={handleSearch} // Llama a handleSearch cuando se busca
        className="mb-6"
      />

      {isLoading && <Spin tip="Buscando..." className="block text-center my-4" />}
      {isError && <Alert message="Error en la búsqueda" description={message} type="error" showIcon className="my-4" />}

      {/* Muestra los resultados de la búsqueda */}
      {!isLoading && !isError && posts.length > 0 && (
        <div className="grid grid-cols-1 gap-4">
          {posts.map((post) => (
            <Post key={post._id} post={post} /> // Asegúrate de que 'Post' reciba 'post' como prop
          ))}
        </div>
      )}

      {!isLoading && !isError && posts.length === 0 && searchTerm && (
        <Alert message="No se encontraron publicaciones" description="Intenta con otro término de búsqueda." type="info" showIcon className="my-4" />
      )}
      
      {!isLoading && !isError && posts.length === 0 && !searchTerm && (
        <p className="text-center text-gray-600">Introduce un término para buscar publicaciones.</p>
      )}
    </div>
  );
};

export default Search; // Exporta el componente renombrado