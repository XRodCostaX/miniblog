import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocument } from '../../hooks/useFetchDocument';

import { useUpdateDocument } from '../../hooks/useUpdateDocument';
import styles from './EditPost.module.css';

function EditPost() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState('');

  const { users } = useAuthValue();
  const { id } = useParams();
  const { document: post } = useFetchDocument('posts', id);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);
      const textTags = post.tagsArray.join(', ');
      setTags(textTags);
    }
  }, [post]);
  const { updateDocument, response } = useUpdateDocument('posts');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    // validate image URL
    try {
      new URL(image);
    } catch (error) {
      setFormError('A imagem precisa ser uma URL');
    }

    // criar o array de tags
    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase());

    // checar todos os valores
    if (!title || !image || !tags || !body) {
      setFormError('Por favor, preencha todos os campos!');
    }

    if (formError) return;

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: users.uid,
      createdBy: users.displayName,
    };
    updateDocument(id, data);

    // redirect to home page
    navigate('/dashBoard');
  };

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editando Post: {post.title}</h2>
          <p>Altere os dados do Post como desejar</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">
              <span>Título:</span>
              <input
                type="text"
                name="title"
                required
                placeholder="Pense num bom título..."
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>
            <label htmlFor="image">
              <span>URL da imagem:</span>
              <input
                type="text"
                name="image"
                required
                placeholder="Insira uma imagem que representa seu post"
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </label>
            <p className={styles.preview_title}>preview da Imagem atual:</p>
            <img className={styles.image_preview} src={post.image} alt={post.title} />
            <label htmlFor="body">
              <span>Conteúdo:</span>
              <textarea
                name="body"
                required
                placeholder="Insira seu conteúdo do post"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              />
            </label>
            <label htmlFor="tags">
              <span>Tags:</span>
              <input
                type="text"
                name="tags"
                required
                placeholder="Insira as tags separadas por vírgulas"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </label>

            {!response.loading && <button className="btn"> Editar </button>}
            {response.loading && (
              <button className="btn" disabled>
                aguarde...
              </button>
            )}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  );
}

export default EditPost;
