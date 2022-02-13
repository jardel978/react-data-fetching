import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom"

type Repository = {
  full_name: string;
  description: string;
}

export function Repo() {

  const params = useParams();

  const currentRepository = params['*'] as string;

  const queryClient = useQueryClient();

  // invalida o staleTime definido para que sempre que os dados atualizarem atualizar também o cache
  // para quando precisamos dos dados sempre frescos e atualizados para os usuários
  async function handleChangeRepositoryDescription() {
    // await queryClient.invalidateQueries(['repos'])//vai invalidar toda a requisição

    // fazer chamada para atualizar descriçaõ do repositório normalmente

    // então, essa perte seguinte será responsável por atualizar o cache e exibir a lista de repos atualizada, porém 
    // SEM TER QUE CHAMAR A API NOVAMENTE PARA PEGAR ESSES DADOS ATUALIZADOS
    const previousRepos = queryClient.getQueryData<Repository[]>('repos')// retorna apenas a lista de repos da chamada
    if (previousRepos) {

      const nextRepos = previousRepos.map(repo => {
        if (repo.full_name === currentRepository) {
          return { ...repo, description: 'testando' }
        } else {
          return repo;
        }
      })

      queryClient.setQueryData('repos', nextRepos)
    }
  }


  return (
    <div>
      <h1>{currentRepository}</h1>
      <button onClick={handleChangeRepositoryDescription}>Alterar repositório</button>
    </div>
  )
}