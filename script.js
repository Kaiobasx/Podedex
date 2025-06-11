document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("search-btn");
    const pokemonNameInput = document.getElementById("pokemon-name");
    const pokemonImg = document.getElementById("pokemon-img");
    const pokemonTitle = document.getElementById("pokemon-title");
    const pokemonType = document.getElementById("pokemon-type");

    const defaultImageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";

    // Mapeamento de tipos do inglês para o português
    const typeTranslations = {
        "normal": "Normal",
        "fire": "Fogo",
        "water": "Água",
        "grass": "Grama",
        "electric": "Elétrico",
        "ice": "Gelo",
        "fighting": "Lutador",
        "poison": "Veneno",
        "ground": "Terrestre",
        "flying": "Voador",
        "psychic": "Psíquico",
        "bug": "Inseto",
        "rock": "Pedra",
        "ghost": "Fantasma",
        "dragon": "Dragão",
        "steel": "Ferro",
        "fairy": "Fada",
        "dark": "Sombrio"
    };

    const fetchPokemonData = async (nameOrId) => {
        // Limpa e exibe estado de carregamento
        pokemonImg.src = defaultImageUrl;
        pokemonTitle.textContent = "Buscando...";
        pokemonType.textContent = "TIPO: ";

        const url = `https://pokeapi.co/api/v2/pokemon/${nameOrId.toLowerCase()}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                pokemonTitle.textContent = "Pokémon não encontrado!";
                pokemonType.textContent = "TIPO: N/A";
                pokemonImg.src = defaultImageUrl;
                throw new Error("Pokémon não encontrado!");
            }
            const data = await response.json();

            pokemonImg.src = data.sprites.front_default || defaultImageUrl;
            pokemonTitle.textContent = capitalizeFirstLetter(data.name);
            
            // Traduz e exibe os tipos
            const typesInPortuguese = data.types.map(typeInfo => {
                return typeTranslations[typeInfo.type.name] || capitalizeFirstLetter(typeInfo.type.name);
            }).join(", ");
            pokemonType.textContent = "TIPO: " + typesInPortuguese;

        } catch (error) {
            console.error("Erro ao buscar Pokémon:", error);
            // A mensagem de erro já foi definida no bloco if (!response.ok)
        }
    };

    // Função para capitalizar a primeira letra
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    searchBtn.addEventListener("click", () => {
        const pokemonName = pokemonNameInput.value.trim();
        if (pokemonName) {
            fetchPokemonData(pokemonName);
        } else {
            pokemonTitle.textContent = "Digite um nome ou número.";
            pokemonType.textContent = "TIPO: ";
            pokemonImg.src = defaultImageUrl;
        }
    });

    // Permite pesquisar com a tecla Enter
    pokemonNameInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            searchBtn.click();
        }
    });

    // Carrega um Pokémon padrão ao iniciar
    fetchPokemonData("pikachu");
});