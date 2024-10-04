async function fetchData() {
    try {
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase(); 
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!response.ok) {
            alert("This Pokémon doesn't exist :(");
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();

        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById("pokemonSprite");
        const pokemonID = document.getElementById("id");
        const pokemonType = document.getElementById("type");
        const pokemonWeight = document.getElementById("weight");
        const pokemonAbility = document.getElementById("ability");
        const pokemonBaseXP = document.getElementById("base-xp");
        const pokemonMove = document.getElementById("move");

        // handle multiple types
        const types = data.types.map(typesInfo => typesInfo.type.name).join(', ');

        // handle multiple abilities
        const abilities = data.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');

        // handle multiple moves
        const moves = data.moves.length > 0 ? data.moves.slice(0, 5).map(movesInfo => movesInfo.move.name).join(', ') : "no moves available";

        // display pokemon sprite
        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";

        // display pokemon id
        pokemonID.innerHTML = "id: " + data.id;
        pokemonID.style.display = "block";

        // display pokemon type
        pokemonType.innerHTML = "type: " + types;
        pokemonType.style.display = "block";

        // display base XP
        pokemonBaseXP.innerHTML = "base xp: " + data.base_experience;
        pokemonBaseXP.style.display = "block";

        // display pokemon ability
        pokemonAbility.innerHTML = "abilities: " + abilities;
        pokemonAbility.style.display = "block";

        // display pokemon moves
        pokemonMove.innerHTML = "moves: " + moves;
        pokemonMove.style.display = "block";

        // display pokemon weight
        pokemonWeight.innerHTML = "weight: " + data.weight;
        pokemonWeight.style.display = "block";

    } catch (error) {
        console.error(error);
    }
}

const enterBtn = document.getElementById("enter");

enterBtn.addEventListener("click", fetchData);
addEventListener("keydown", (e)=>{
    if(e.key == "Enter"){
        fetchData();
        document.getElementById("pokemonName").value = "";
    }
})