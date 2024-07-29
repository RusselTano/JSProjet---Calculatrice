const calc = document.querySelector(".calc");
const ecran = document.querySelector(".calc__ecran");

const buttons = document.querySelectorAll(".calc__button");
const operatorsRegex = /[+\-x/]/;
let tab = [];
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let key = e.target.innerText;
    checkSymbols(key);
  });
});

function checkSymbols(key) {
  if(key === "=") return;
  if (key.toLocaleLowerCase() === "c") {
    // Efface tout
    tab.length = 0;
    ecran.innerText = tab.join("");

  } else if (key.toLocaleLowerCase() === "ce") {
    // Efface le dernier élément
    tab.pop();
    ecran.innerText = tab.join("");

  } else if (operatorsRegex.test(key)) {
    // Si la touche est un opérateur
    if (tab.length === 0 || operatorsRegex.test(tab[tab.length - 1])) {
      // Si le tableau est vide ou le dernier élément est déjà un opérateur, on ne fait rien
      console.log("Impossible d'ajouter un opérateur après un autre opérateur");
    } else {
      tab.push(key);
      ecran.innerText = tab.join("");
    }
  } else {
    // Ajouter le symbole et mettre à jour l'écran
    tab.push(key);
    ecran.innerText = tab.join('');
  }
}

function checkOperator(key) {}
