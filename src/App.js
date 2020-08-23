import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
     });
}, []);
 
  async function handleAddRepository() {
     api.post('repositories', {
         title: `Novo repositorio ${Date.now()}`, 
      	 url: "https://github.com/lest",
	        techs: ["uma", "dois"]

      }).then(responde => {
           const repository = responde.data;  

           setRepositories([...repositories, repository]);
      });

     
  }

  async function handleRemoveRepository(id) {
    
      api.delete('repositories/' + id).then(responde => { 
        setRepositories(repositories.filter(repo => repo.id !== id)); 
      });  
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repo => 
        <>
           <li key={repo.id}>{repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
               Remover
              </button>
          </li> 
        </>
          )} 
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
