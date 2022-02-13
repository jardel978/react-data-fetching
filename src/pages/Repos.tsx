// import { useFetch } from "./hooks/useFetch"
// substiruirá o useFetch
import axios from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export type Repository = {
    full_name: string;
    description: string;
}

export function Repos() {

    //substituído pelo React-Query (é um useFetch  bemmm turbinado e serve para PUT, POST, UPDATE, DELETE ...)
    // const { data: repositories, isFetching } =
    //   useFetch<Repository[]>('/users/jardel978/repos')

    // useQuery("chave de cache - um nome para identificar essa req",
    // função responsável pela chamada)
    const { data: repositories, isFetching } = useQuery<Repository[]>('repos', async () => {
        //   const { data: repositories, isFetching } = useQuery<Repository[]>('repos', 2(numeroPage), async () => { para req com paginação (assim as chamadas de pages diferentes não sobrescreverão as outras no cache)
        // const response = await axios.get('https://api.github.com/users/jardel978/repos?page=2')
        const response = await axios.get('https://api.github.com/users/jardel978/repos')
        return response.data;
    }, {// configurar opções 
        // refetchOnWindowFocus: false,//desativando atualização do conteúdo ao sair e voltar a tela
        staleTime: 1000 * 60, //(1 min) quanto tempo manter os dados que foram buscados em cache e depois disso, se eu sair e voltar a essa página: vai refazer a chamada normalmente

    })

    return (
        <div className="App">
            <h1>Data Fetch</h1>

            {isFetching && <p>carregando</p>}

            {repositories?.map(repo => {
                return (
                    <li key={repo.full_name}>
                        <Link to={`repos/${repo.full_name}`}>{repo.full_name}</Link>
                        <p>{repo.description}</p>
                    </li>
                )
            })

            }
        </div>
    )
}