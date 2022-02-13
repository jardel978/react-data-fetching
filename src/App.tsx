import { useFetch } from "./hooks/useFetch"

type Repository = {
  full_name: string;
  description: string;
}

function App() {

  const { data: repositories, isFetching } =
    useFetch<Repository[]>('/users/jardel978/repos')

  return (
    <div className="App">
      <h1>Deus é Bom D+</h1>

      {isFetching && <p>carregando</p>}

      {repositories?.map(repo => {
        return (
          <li key={repo.full_name}>
            <strong>{repo.full_name}</strong>
            <p>{repo.description}</p>
          </li>
        )
      })

      }
    </div>
  )
}

export default App
