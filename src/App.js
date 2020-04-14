import React, { useState, useEffect } from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([])

  useEffect(() => {
    api.get('repositories')
        .then(({ data }) => {

          setRepository([
                ...repositories,
                ...data
            ])
        })
}, [])
  
  async function handleAddRepository() {
    const { data: repository } = await api.post('repositories', {
      "title": "Desafio ReactJS",
      "url": "https://github.com/airton/gostack-conceitos-reactjs",
      "techs": ["nodejs", "javscript"]
    })

    setRepository([
        ...repositories,
        repository
    ])
  }

  async function handleRemoveRepository(id) {
    const { status } = await api.delete(`repositories/${id}`)

    if (status === 204) {
      const repositoryFiltered = repositories
        .filter(repository => repository.id !== id )

      setRepository([
          ...repositoryFiltered
      ])
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories
          .map(({ title, id }) => {
            return (
              <li key={id}>
                {title}

                <button onClick={() => handleRemoveRepository(id)}>
                  Remover
                </button>
              </li>
            )
          })
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
