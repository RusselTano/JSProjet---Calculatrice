const calc = document.querySelector(".calc");
const calculation = document.querySelector(".cacl__calculation");
const result = document.querySelector(".cacl__result");
const buttons = [...document.querySelectorAll(".calc__button")];

const clearBtn = document.querySelector("[data-action='ce']");
clearBtn.addEventListener("click", clear);

function clear() {
  if (calculation.textContent[0] === "0") return;
  else if (calculation.textContent.length === 1) newValue = "0";
  else newValue = calculation.textContent.slice(0, -1);

  calculation.textContent = newValue;
}

const resetBtn = document.querySelector("[data-action='c']");
resetBtn.addEventListener("click", reset);

function reset() {
  calculation.textContent = "0";
  result.textContent = "";
}

const digitsBtns = buttons.filter((button) =>
  /[0-9]/.test(button.getAttribute("data-action"))
);
digitsBtns.forEach((digitBtn) => {
  digitBtn.addEventListener("click", handleDigit);
});

function handleDigit(e) {
  const btnValue = e.target.getAttribute("data-action");
  console.log(btnValue);
  if (btnValue === "0" && calculation.textContent === "0")
    calculation.textContent = "";
  else if (btnValue !== "0" && calculation.textContent === "0")
    calculation.textContent = btnValue;
  else calculation.textContent += btnValue;
}

const operatorsBtns = buttons.filter((button) =>
  /[\/*+-]/.test(button.getAttribute("data-action"))
);
operatorsBtns.forEach((btn) => btn.addEventListener("click", handleOperators));

function handleOperators(e) {
  const btnValue = e.target.getAttribute("data-action");
  calculation.textContent += btnValue;
}
console.log(digitsBtns, operatorsBtns);

function extraireOperateurEtOperandes(expression) {
  // Trouver l'opérateur
  const operateurRegex = /[+\-*/]/;
  const operateur = expression.match(operateurRegex);

  // Séparer les opérandes en utilisant l'opérateur
  const operandes = expression.split(operateur);

  // Convertir les opérandes en nombres
  const operande1 = parseFloat(operandes[0]);
  const operande2 = parseFloat(operandes[1]);

  return {
    operande1,
    operande2,
    operateur: operateur[0],
  };
}

const equalBtn = document.querySelector("[data-action='=']");
equalBtn.addEventListener("click", showResult);

function showResult() {
  const calculationData = extraireOperateurEtOperandes(calculation.textContent);
  result.textContent = calculer(
    calculationData.operande1,
    calculationData.operande2,
    calculationData.operateur
  );
}

function calculer(operande1, operande2, operateur) {
  let resultat;

  switch (operateur) {
    case "+":
      resultat = operande1 + operande2;
      break;
    case "-":
      resultat = operande1 - operande2;
      break;
    case "*":
      resultat = operande1 * operande2;
      break;
    case "/":
      if (operande2 !== 0) {
        resultat = operande1 / operande2;
      } else {
        return "Erreur : division par zéro";
      }
      break;
    default:
      return "Erreur : opérateur non valide";
  }

  return resultat;
}
