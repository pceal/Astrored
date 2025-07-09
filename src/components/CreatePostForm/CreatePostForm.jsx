import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, reset } from '../../features/post/postSlice'; 
import { Input, Button, Form, Upload, message as AntMessage, Spin, Alert } from 'antd'; 
import { UploadOutlined } from '@ant-design/icons'; 


const { TextArea } = Input;

const CreatePostForm = () => {
  const [form] = Form.useForm(); 
  const dispatch = useDispatch();


  
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.posts); 

  const [fileList, setFileList] = useState([]); 

 
  useEffect(() => {
    if (isSuccess) {
      AntMessage.success(message);
      form.resetFields(); 
      setFileList([]); 
      dispatch(reset()); 
      //navigate('/'); 
    }
    if (isError) {
      AntMessage.error(message);
      dispatch(reset()); 
    }
  }, [isSuccess, isError, message, dispatch, form, ]); //navigate

 
  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

 
  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('content', values.content);

   
    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append('images', fileList[0].originFileObj); 
    }

    console.log("Enviando datos:", values);
    dispatch(createPost(formData)); 
  };


  return (
  
    <div style={{ 
        maxWidth: '300px', 
        padding: '24px', 
        backgroundColor: '#fff', 
        borderRadius: '8px', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        width: '100%',
        boxSizing: 'border-box' 
    }}>
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

        <Form.Item label="Añadir foto" name="image">
          <Upload
            listType="picture"
            fileList={fileList}
            onChange={handleFileChange}
            beforeUpload={() => false} 
            maxCount={1} 
          >
            <Button icon={<UploadOutlined />}>Seleccionar foto</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading} style={{ width: '100%' }}>
            {isLoading ? 'Creando...' : 'Crear Publicación'}
          </Button>
        </Form.Item>

        {message && (
          <p className={`mt-4 text-center ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>
        )}
      </Form>
    </div>
  );
};


export default CreatePostForm;
