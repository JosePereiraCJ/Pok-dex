const nomePokemon = document.querySelector('.nome__pokemon');

const numeroPokemon = document.querySelector('.numero__pokemon');

const imgPokemon = document.querySelector('.img__pokemon');

const form = document.querySelector('.form');

const input = document.querySelector('.input__search');

const btnProximo = document.querySelector('.proximo__btn');

const btnAnterior = document.querySelector('.anterior__btn');

const tipoPokemon = document.querySelector('.tipo__pokemon')

let inicialPokemon = 384;

// função para procurar pokemon

const procurarPokemon = async (pokemon) => {
    const respostaApi = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (respostaApi.status == 200) {
        const dadosPokemon = await respostaApi.json();
        return dadosPokemon;
    }
}

// função para receber os dados e mostrar na tela

const mostrarPokemon = async (pokemon) =>{
    nomePokemon.innerHTML = 'Buscando...';

    const dadosPokemon = await procurarPokemon(pokemon);

    if(dadosPokemon){
        nomePokemon.innerHTML = dadosPokemon.name;

        numeroPokemon.innerHTML = dadosPokemon.id;

        tipoPokemon.innerHTML = dadosPokemon['types'] ['0'] ['type'] ['name'];

        imgPokemon.src = dadosPokemon['sprites']['versions'] ['generation-v']['black-white']['animated']['front_default'];

        input.value = '';
    }else {
        nomePokemon.innerHTML = 'Não encontrei :/';
    }
}

// btn anterior e proximo

btnAnterior.addEventListener('click', () =>{
    inicialPokemon -= 1;
    mostrarPokemon(inicialPokemon);
});

btnProximo.addEventListener('click', () =>{
    inicialPokemon += 1;
    mostrarPokemon(inicialPokemon);
});

// funcionalidade para procurar pokemon forms
form.addEventListener('submit', (event) => {

    event.preventDefault();

    mostrarPokemon(input.value.toLowerCase());
});

// pokemon incial

mostrarPokemon(inicialPokemon);

