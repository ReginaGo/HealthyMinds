import React, { useEffect, useState } from 'react';


function Blog() {
  const [explicitWords, setExplicitWords] = useState([]);
  const [posts, setPosts] = useState([]);

  // Lista de posts
  const [title, setTitle] = useState(''); // Título del nuevo post
  const [description, setDescription] = useState(''); // Descripción del nuevo post
  const [error, setError] = useState(null); // Manejo de errores para las solicitudes
  const username = 'currentUser'; // Cambiar esto según el usuario actual

  const ApiUrl = process.env.API_URL;
  // Obtener los posts existentes desde el backend
  useEffect(() => {
    fetch(`${ApiUrl}/blog`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            window.location.href = "/login";
          }
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Asegúrate de que `posts` sea un arreglo
        setPosts(Array.isArray(data.posts) ? data.posts : []);
      })
      .catch((error) => {
        console.error("Error loading posts:", error);
        setError("Failed to load blog posts.");
      });
  }, []);

  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validación: Número máximo de palabras
    const countWords = (text) => {
      if (!text || typeof text !== "string") return 0;
      const words = text.split(/\s+/); // Divide el texto en palabras separadas por espacios
      let count = 0;
      for (const word of words) {
        if (word.trim()) {
          count++;
        }
      }
      return count;
    };
  
    if (countWords(description) > 500) {
      alert("Your post exceeds the 500-word limit.");
      return;
    }
  
    // Validación: Palabras explícitas
    const containsExplicitWords = explicitWords.some((word) =>
      description.toLowerCase().includes(word)
    );
    if (containsExplicitWords) {
      alert("Your post contains inappropriate language.");
      return;
    }
  
    // Enviar datos al backend
    fetch(`${ApiUrl}/create-post`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username, // Asegúrate de que este valor esté definido
        title,
        description,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create post");
        }
        return response.json(); // Aquí el backend debe devolver el nuevo post creado
      })
      .then((newPost) => {
        // Actualizar el estado con el nuevo post
        setPosts((prevPosts) => [newPost, ...prevPosts]);
  
        // Limpiar el formulario
        setTitle("");
        setDescription("");
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      {/* Navbar */}
      <nav
        style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, backgroundColor: 'black' }}
        className="navbar navbar-expand-lg"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Healthy Minds
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/conditions">
                  Discover
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/logout">
                  Logout
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/blog">
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Blog Form */}
      <div className="container mt-5" style={{marginTop: '150px'}}>
        <br />
        <br />
        <h1>Share your journey with the community!</h1>
        <h4>You are not alone</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>

        {/* Existing Blog Posts */}
        <h2 className="mt-5">Existing Blog Posts</h2>
        {error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <div className="row">
          {Array.isArray(posts) && posts.some(Boolean) ? (
            posts.map((post, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      By {post.username}
                    </h6>
                    <p className="card-text">{post.description}</p>
                    <p className="card-text">
                      <small className="text-muted">
                        Posted on{' '}
                        {new Date(post.createdAt).toLocaleDateString()}
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            ))
            ) : (
              <p>No blog posts available. Add a new post to get started!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Blog;
