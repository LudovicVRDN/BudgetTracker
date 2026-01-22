/*Créer un système de CRUD permettant de gérer plus facilement le budget de l'utilisateur . Il aura accès à sa liste de dépenses ainsi qu'a sa liste de revenus qui devront être remplies via le formulaire proposé sur le bouton "Ajouter une nouvelle entrée".
- Les données de ce formulaire seront stockés dans le localStorage afin de ne pas perdre les informations à chaque refresh de la page. X
- Les données stocker ainsi dans le LocalStorage seront ensuite ajouté dans le DOM sous forme de liste. X
- Les "cartes"  dépenses ou revenus auront une couleur de bordures propres a leur catégorie. X
- Les éléments des deux liste pourront être supprimées via un bouton. X
- Afficher les totaux de chaque catégorie.X
- Filtrer les cartes par date.*/
//Create function closeForm and openForm
function openForm(): void {
    formAdd.classList.add('flex');
    formAdd.classList.remove('hidden');
}
function closeForm(): void {
    formAdd.classList.add('hidden');
    formAdd.classList.remove('flex');
}

//ID Generator 
function IDgenerator(): string {
    let id: string = Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    return id
}
function afficherTotal(euroArray: ICartesListes[], text: any): void {
    //Get revenusMontants
    const montants = euroArray.map((entree) => entree.montant);
    //Get revenusTotal
    const montantTotal = montants.reduce((accumulator, montant) => accumulator + Number(montant), 0);
    //Select total for Revenus in HTML
    text.innerText = `Total : ${montantTotal} €`;
}
const totalRevenuText = document.getElementById('totalRevenu') as HTMLElement;
const totalDepenseText = document.getElementById('totalDepense') as HTMLElement;
//Create interface
interface ICartesListes {
    id: string
    categorie: string
    montant: string,
    motif: string,
    date: string
}

function filterDate(array: ICartesListes[], liste: any): void {
    liste.innerHTML = ""
    array.sort((a: ICartesListes, b: ICartesListes) => b.date.localeCompare(a.date));
    array.forEach((cartes) => {
        let newCard = document.createElement('li');
        newCard.classList.add("border-2", "rounded-2xl", "shadow-md", "mt-3", "px-5", "py-2", "flex", "justify-between",);
        newCard.setAttribute('data-id', cartes.id);
        newCard.innerHTML = `
        <p> Montant : ${cartes.montant} €</p>
        <p> Motif : ${cartes.motif} </p>
        <p> Date: ${cartes.date} </p>
        <button> <i class="fa-solid fa-xmark" > </i></button > `
        if (cartes.categorie === "Dépenses") {
            newCard.classList.add('border-red-400')
            listeDepenses.appendChild(newCard);
        } else if (cartes.categorie === "Revenus") {
            newCard.classList.add('border-green-400')
            listeRevenus.appendChild(newCard);
        }

        newCard.addEventListener('click', (e: MouseEvent) => {
            let targetBttn = e.target as HTMLElement
            if (targetBttn.closest('button')) {
                newCard.remove();
                //Set in local storage
                let newLocalStorageCartes: ICartesListes[] = localStorageCartes.filter((card) => card.id !== newCard.dataset.id);
                localStorageCartes = newLocalStorageCartes;
                localStorage.setItem("expenses_data", JSON.stringify(localStorageCartes));
                //remove from depensesArray
                depensesArray = depensesArray.filter((depenses) => depenses.id !== newCard.dataset.id)
                //remove from revenusArray
                revenusArray = revenusArray.filter((revenus) => revenus.id !== newCard.dataset.id)
                afficherTotal(revenusArray, totalRevenuText);
                afficherTotal(depensesArray, totalDepenseText);

            }
        })
    })
}
//Create function for new li 
function createNewLi(cartes: ICartesListes): void {
    if (cartes.categorie === 'Revenus') {
        filterDate(revenusArray, listeRevenus);
    } else {
        filterDate(depensesArray, listeDepenses);;
    }
    //Choose the good array
    afficherTotal(revenusArray, totalRevenuText);
    afficherTotal(depensesArray, totalDepenseText);
}

//Open form with the bttn
//Select AddBttn
const addBttn = document.querySelector("#addBttn") as HTMLElement;

//Select form
const formAdd = document.querySelector("form") as HTMLFormElement

//Add EventListener
addBttn?.addEventListener("click", () => {
    openForm()
})

//Select closeBttn
const closeBttn = document.querySelector("#closeBttn");

//AddEventListener on closeBttn
closeBttn?.addEventListener('click', (e) => {
    e.preventDefault();
    closeForm()
})

//Create localStorage Array
let localStorageCartes: ICartesListes[] = [];

//Select ul in HTML
const listeRevenus = document.getElementById('listeRevenus') as HTMLUListElement;
const listeDepenses = document.getElementById('listeDepenses') as HTMLUListElement;

//Create Array for depenses & revenus
let depensesArray: ICartesListes[] = [];
let revenusArray: ICartesListes[] = [];

//formAdd addEventListener
formAdd.addEventListener("submit", (e) => {
    //Select Input
    const motifInput = document.querySelector('#motif') as HTMLInputElement;
    const dateInput = document.querySelector('#date') as HTMLInputElement;
    const categorieInput = document.querySelector('input[name="categorie"]:checked') as HTMLInputElement;
    const montantInput = document.querySelector('#montant') as HTMLInputElement;
    //stop refresh
    e.preventDefault();
    //Create cartes object
    let newLi: ICartesListes = {
        id: IDgenerator(),
        categorie: categorieInput.value,
        montant: montantInput.value,
        motif: motifInput.value,
        date: dateInput.value
    }
    if (newLi.categorie === "Dépenses") {
        depensesArray.push(newLi);
    } else if (newLi.categorie === "Revenus") {
        revenusArray.push(newLi)
    }
    localStorageCartes.push(newLi)
    //Reset formAdd
    closeForm()
    formAdd?.reset()
    //Add To localStorage
    localStorage.setItem("expenses_data", JSON.stringify(localStorageCartes));
    //Add to HTML
    createNewLi(newLi);
})
//Get "expenses_data" from storage
localStorageCartes = JSON.parse(localStorage.getItem("expenses_data") || "[]");
localStorageCartes.forEach((post) => {
    createNewLi(post);
})

//Get depensesMontants
const depensesMontant = depensesArray.map((depenses) => depenses.montant);
console.log(depensesMontant);



