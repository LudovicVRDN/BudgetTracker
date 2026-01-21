/*Créer un système de CRUD permettant de gérer plus facilement le budget de l'utilisateur . Il aura accès à sa liste de dépenses ainsi qu'a sa liste de revenus qui devront être remplies via le formulaire proposé sur le bouton "Ajouter une nouvelle entrée".
- Les données de ce formulaire seront stockés dans le localStorage afin de ne pas perdre les informations à chaque refresh de la page.
- Les données stocker ainsi dans le LocalStorage seront ensuite ajouté dans le DOM sous forme de liste.
- Les "cartes"  dépenses ou revenus auront une couleur propres a leur catégorie.
- Les éléments des deux liste pourront être supprimées via un bouton.
- Afficher les totaux de chaque catégorie.
- Filtrer les cartes par date.*/
//Open form with the bttn
//Select AddBttn
const addBttn = document.querySelector("#addBttn");
//Select form
const formAdd = document.querySelector("form");
//Add EventListener
addBttn?.addEventListener("click", () => {
    formAdd?.classList.add('flex');
    formAdd.classList.remove('hidden');
});
//Select closeBttn
const closeBttn = document.querySelector("#closeBttn");
//AddEventListener on closeBttn
closeBttn?.addEventListener('click', (e) => {
    e.preventDefault();
    formAdd.classList.add('hidden');
    formAdd.classList.remove('flex');
});
export {};
//# sourceMappingURL=index.js.map