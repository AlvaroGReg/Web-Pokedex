let pokeSelector = document.getElementById("pokemonselector")
const altaPokedex = document.getElementById("altapokedex")
const bajaPokedex = document.getElementById("bajapokedex")
let nameCell = document.getElementById("tdname")
let typesCell = document.getElementById("tdtypes")
let heightCell = document.getElementById("tdheight")
let weightCell = document.getElementById("tdweight")

pokeSelector.addEventListener("change" , chargePokemon)

getPokemonList()
chargePokemon()

function getPokemonList(){
    fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=151%22")
    .then(response => response.json())
    .then(data => {


        for(let n = 0; n<152; n++){

            let pokeOption = document.createElement("option")

            pokeOption.textContent = "#" + (n + 1) + " " + data.results[n].name
            pokeOption.value = n
            pokeSelector.appendChild(pokeOption)
        }
    })
}

function chargePokemon(){


    altaPokedex.innerHTML = ""
    nameCell.innerHTML=""
    typesCell.innerHTML=""
    heightCell.innerHTML=""
    weightCell.innerHTML=""

    let id = pokeSelector.value
    id++

    fetch("https://pokeapi.co/api/v2/pokemon/" + id)
    .then(response => response.json())
    .then((data) => {

        let sprite = document.createElement("img")
        sprite.src = data.sprites.front_default
        sprite.id = "imgid"
        let nameP = document.createElement("p")
        nameP.textContent = capitalFirst(data.name)
        nameP.textContent = "#" + id + " " + nameP.textContent
        let typeP = document.createElement("p")

        typeP.innerHTML = "Types: "

        if(data.past_types.length > 0){

        data.past_types.forEach(element => {

            element.types.forEach(elemnto =>{
                typeP.innerHTML += "<span class='"+elemnto.type.name+"'>" +elemnto.type.name + "</span> "
            
            })
            })
        }else{
            data.types.forEach(element => {
                typeP.innerHTML += "<span class='"+element.type.name+"'>" +element.type.name + "</span> "
                
            })
        }

        let heigthP = document.createElement("p")
        heigthP.textContent = "Height: " + data.height

        let wheightP = document.createElement("p")
        wheightP.textContent = "Weight: " + data.weight

        altaPokedex.appendChild(sprite)
        nameCell.appendChild(nameP)
        typesCell.appendChild(typeP)
        heightCell.appendChild(heigthP)
        weightCell.appendChild(wheightP)
})
}

function capitalFirst(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}