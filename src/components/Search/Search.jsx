import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { searchByTitle, reset, setSearchTerm, setSearchPerformed } from "../../features/post/postSlice"; 
import Post from "../Post/Post";
import { Input, Button, Spin, Alert } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Search: AntdSearch } = Input;

const Search = () => { 
  const dispatch = useDispatch();

  const { posts, isLoading, isError, message, searchTerm, searchPerformed } = useSelector((state) => state.posts);

 
  useEffect(() => {
    return () => {
      console.log("Search.jsx useEffect: Componente desmontado. Despachando reset().");
      dispatch(reset()); 
    };
  }, [dispatch]);

  // Función para manejar la búsqueda cuando el usuario presiona Enter o el botón de búsqueda
  const handleSearch = (value) => {
    // Actualiza el término de búsqueda en el estado de Redux
    dispatch(setSearchTerm(value.trim())); // <-- Correcto: dispatching la acción de Redux
    // Indica que se ha realizado una búsqueda
    dispatch(setSearchPerformed(true)); 

    if (value.trim()) { // Solo busca si el valor no está vacío
      console.log("Search.jsx handleSearch: Despachando searchByTitle con valor:", value.trim());
      dispatch(searchByTitle(value.trim())); // Dispara la acción de búsqueda
    } else {
      // Si el campo está vacío (se borró), resetea el estado de búsqueda.
      console.log("Search.jsx handleSearch: Campo de búsqueda vacío. Despachando reset().");
      dispatch(setSearchTerm('')); // <-- Correcto: dispatching la acción de Redux para limpiar el término
      dispatch(reset()); // Esto resetea otros estados como posts, isError, etc.
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Buscar Publicaciones</h2>
      <AntdSearch
        placeholder="Introduce el título del post a buscar..."
        allowClear
        enterButton={<Button type="primary" icon={<SearchOutlined />}>Buscar</Button>}
        size="middle"
        onSearch={handleSearch} // Llama a handleSearch cuando se presiona Enter o el botón
        value={searchTerm} // El valor del input se controla desde el estado de Redux
        // *** ¡CORRECCIÓN CLAVE AQUÍ! Actualiza el término de búsqueda en Redux con cada cambio en el input ***
        onChange={(e) => dispatch(setSearchTerm(e.target.value))} // <-- Correcto: dispatching la acción de Redux
        style={{ width: 700 }} 
        className="mb-6 max-w-full" 
      />

      {/* Muestra un spinner de carga */}
      {isLoading && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Spin tip="Buscando..." size="large" />
        </div>
      )}

      {/* Muestra un mensaje de error si la búsqueda falla */}
      {isError && <Alert message="Error en la búsqueda" description={message} type="error" showIcon className="my-4" />}

      {/* Muestra los resultados de la búsqueda solo si se ha realizado una búsqueda
          y no está cargando ni hay error, y hay posts.
      */}
      {!isLoading && !isError && searchPerformed && posts.length > 0 && (
        <div className="grid grid-cols-1 gap-4">
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}

      {/* Muestra un mensaje si no se encontraron publicaciones con el término buscado */}
      {!isLoading && !isError && searchPerformed && posts.length === 0 && searchTerm && (
        <Alert message="No se encontraron publicaciones" description="Intenta con otro término de búsqueda." type="info" showIcon className="my-4" />
      )}
      
      {/* Muestra un mensaje de instrucción al inicio, antes de cualquier búsqueda
          y solo si no está cargando.
      */}
      {!isLoading && !searchPerformed && (
        <p className="text-center text-gray-600">Introduce un término para buscar publicaciones.</p>
      )}
    </div>
  );
};

export default Search;