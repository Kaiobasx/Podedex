document.getElementById("search-btn").addEventListener("click", () => {
    const pokemonName = document.getElementById("pokemon-name").value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokémon não encontrado!");
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("pokemon-img").src = data.sprites.front_default;
            document.getElementById("pokemon-title").textContent = data.name.toUpperCase();
            document.getElementById("pokemon-type").textContent = "TYPE: " + data.types.map(type => type.type.name).join(", ");
        })
        .catch(error => {
            alert("ão foi possivel encontrar!");
        });
});
