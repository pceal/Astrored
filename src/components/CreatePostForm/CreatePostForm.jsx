import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, reset } from '../../features/post/postSlice'; // Importa la acción createPost
import { Input, Button, Form, Upload, message as AntMessage, Spin, Alert } from 'antd'; // Importa componentes de Ant Design
import { UploadOutlined } from '@ant-design/icons'; // Icono para subir archivo
import { useNavigate } from 'react-router-dom'; // Para redirigir después de crear

const { TextArea } = Input;

const CreatePostForm = () => {
  const [form] = Form.useForm(); // Hook para controlar el formulario de Ant Design
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Obtén el estado de creación de post desde Redux
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.posts); // Asume que tu slice se llama 'posts'

  const [fileList, setFileList] = useState([]); // Estado para el archivo de imagen

  // Maneja los mensajes de éxito/error después de la creación
  useEffect(() => {
    if (isSuccess) {
      AntMessage.success(message);
      form.resetFields(); // Limpia los campos del formulario
      setFileList([]); // Limpia la lista de archivos
      dispatch(reset()); // Resetea el estado de creación en Redux
      navigate('/'); // Redirige a la página principal o donde quieras
    }
    if (isError) {
      AntMessage.error(message);
      dispatch(reset()); // Resetea el estado de error en Redux
    }
  }, [isSuccess, isError, message, dispatch, form, navigate]);

  // Función para manejar la subida de archivos (Ant Design Upload)
  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  // Función para manejar el envío del formulario
  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('content', values.content);

    // Si hay un archivo seleccionado, añádelo al FormData
    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append('images', fileList[0].originFileObj); // 'images' debe coincidir con upload.single('images') en tu backend
    }

    console.log("Enviando datos:", values);
    dispatch(createPost(formData)); // Despacha la acción de crear post
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '24px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#333' }}>Crear Nueva Publicación</h2>
      <Form
        form={form}
        name="create_post"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="Título"
          name="title"
          rules={[{ required: true, message: 'Por favor, introduce el título de la publicación!' }]}
        >
          <Input placeholder="Título de tu publicación" />
        </Form.Item>

        <Form.Item
          label="Contenido"
          name="content"
          rules={[{ required: true, message: 'Por favor, introduce el contenido de la publicación!' }]}
        >
          <TextArea rows={4} placeholder="Escribe aquí el contenido de tu publicación..." />
        </Form.Item>

        {/* Componente de subida de archivo de Ant Design */}
        <Form.Item label="Añadir foto" name="image">
          <Upload
            listType="picture"
            fileList={fileList}
            onChange={handleFileChange}
            beforeUpload={() => false} // Evita la subida automática de Ant Design
            maxCount={1} // Solo permite una imagen
          >
            <Button icon={<UploadOutlined />}>Seleccionar foto</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading} style={{ width: '100%' }}>
            {isLoading ? 'Creando...' : 'Crear Publicación'}
          </Button>
        </Form.Item>

        {/* Mensajes de estado (opcional, ya que AntMessage se encarga de esto) */}
        {/* {isSuccess && <Alert message={message} type="success" showIcon style={{ marginTop: '16px' }} />}
        {isError && <Alert message={message} type="error" showIcon style={{ marginTop: '16px' }} />} */}
      </Form>
    </div>
  );
};

export default CreatePostForm;
