import { useEffect } from "react";
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
   
     dispatch(reset()); 
    };
  }, [dispatch]);

 
  const handleSearch = (value) => {
    
    dispatch(setSearchTerm(value.trim())); 
    dispatch(setSearchPerformed(true)); 

    if (value.trim()) { 
      
      dispatch(searchByTitle(value.trim())); 
    } else {
      dispatch(setSearchTerm('')); 
      dispatch(reset()); 
    }
  };

  return (
    <div className="search-container">
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Buscar Publicaciones</h2>
      <AntdSearch
        placeholder="Introduce el título del post a buscar..."
        allowClear
        enterButton={<Button type="primary" icon={<SearchOutlined />}>Buscar</Button>}
        size="middle"
        onSearch={handleSearch} 
        value={searchTerm} 
        onChange={(e) => dispatch(setSearchTerm(e.target.value))} 
        className="mb-6 max-w-full" 
      />

    
      {isLoading && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Spin tip="Buscando..." size="large" />
        </div>
      )}

     
      {isError && <Alert message="Error en la búsqueda" description={message} type="error" showIcon className="my-4" />}

      
      {!isLoading && !isError && searchPerformed && posts.length > 0 && (
        <div className="grid grid-cols-1 gap-4">
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}

     
      {!isLoading && !isError && searchPerformed && posts.length === 0 && searchTerm && (
        <Alert message="No se encontraron publicaciones" description="Intenta con otro término de búsqueda." type="info" showIcon className="my-4" />
      )}
      
  
      {!isLoading && !searchPerformed && (
        <p className="text-center text-gray-600">Introduce un término para buscar publicaciones.</p>
      )}
    </div>
     </div>
  );
};

export default Search;