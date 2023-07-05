let input: HTMLInputElement = document.querySelector(".input")!;
let btns = document.querySelectorAll("button")!;
let degToRad = document.getElementById("degToRad")!;
let ndbtn = document.getElementById("2nd")!;
let trigonometry = document.getElementById("trigonometry")!;
let trigonometry_two = document.getElementById("trigonometry-two")!;
let trigonometry_one = document.getElementById("trigonometry-one")!;
let darkBtn = document.getElementById("darkIcon")! as HTMLImageElement;

darkBtn.onclick = function () {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
      darkBtn.src = "assets/sun.png";
  } else {
    darkBtn.src = "assets/moon.png";
  }
};

function execute(value: any) {
  let isExp = value.search(" EXP ");

  if (isExp === 1) {
    let splitExp = value.split(" EXP ");
    splitExp.splice(1, 0, "10");

    input.value = Number(splitExp[0] * splitExp[1] ** splitExp[2]).toString(0);

  } else if (value.includes(" MOD ")) {
    let splitMod = value.split(" MOD ");
    console.log(splitMod);
    input.value = Number(splitMod[0] % splitMod[1]).toString();
  } else if (value.includes("10^")) {
    let splitTen = value.split("^");
    let mul = 10;
    for (let i = 1; i < Number(splitTen[1]); i++) {
      mul = mul * 10;
    }
    input.value = mul.toString();
  } else if (value.includes("log")) {
    let logVal = value.replace("log", "");
    input.value = Math.log((logVal) / Math.LN10).toString();
  } else if (value.includes("^")) {
    let splitVal = value.split("^");
    let doubleMul = splitVal[0] ** splitVal[1];
    input.value = doubleMul.toString();
  } else if (value.includes("ln")) {
    let logVal = value.replace("ln", "");
    input.value = Math.log(logVal).toString();
  } else if (value.includes("Sin")) {
    findTrigonometry("Sin", value);
  } else if (value.includes("Cos")) {
    findTrigonometry("Cos", value);
  } else if (value.includes("Tan")) {
    findTrigonometry("Tan", value);
  } else if (value.includes("asin")) {
    findTrigonometry("asin", value);
  } else if (value.includes("acos")) {
    findTrigonometry("acos", value);
  } else if (value.includes("atan")) {
    findTrigonometry("atan", value);
  } else {
    input.value = eval(value);
  }
}

// calculate Factorial
function findFactorial(num: number): any {
  if (num < 0) return -1;
  else if (num == 0) return 1;
  else {
    return num * findFactorial(num - 1);
  }
}

// toggleDegToRad
function toggleDegToRad(inputVal:string, btnVal:string) {
  if (inputVal === "") {
    alert("Please Enter Input Value!");
  }
  if (btnVal === "DEG") {
    let pi = Math.PI;
    input.value = (+inputVal * (180 / pi)).toString();
    degToRad.innerText = "RAD";
  } else {
    let pi = Math.PI;
    input.value = (+inputVal * (pi / 180)).toString();

    degToRad.innerText = "DEG";
  }
}

// Toggle Button
function toggleBtn(value: string) {
  console.log(value);
  if (value == "2nd") {
    ndbtn.innerText = "1st";
    trigonometry_two.style.display = "none";
  } else {
    ndbtn.innerText = "2nd";
    trigonometry_one.style.display = "none";
  }
}

// Add Operator
function addOperator(value: string) {
  input.value = (-value).toString();
}

// Trigonometry
function findTrigonometry(type:string, value: string) {
  let numberArr: string[] = value.split(" ");
  let number = numberArr[1];
  let res;
  switch (type) {
    case "Sin":
      res = Math.sin((+number * Math.PI) / 180.0);
      input.value = res.toString();
      break;
    case "Cos":
      res = Math.cos((+number * Math.PI) / 180.0);
      input.value = res.toString();
      break;
    case "Tan":
      res = Math.tan((+number * Math.PI) / 180.0);
      input.value = res.toString();
      break;
    case "asin":
      res = (Math.asin(+number * 180)) / Math.PI;
      input.value = res.toString();
      break;
    case "acos":
      res = (Math.acos(+number) * 180) / Math.PI;
      input.value = res.toString();
    case "atan":
      res = (Math.atan(+number) * 180) / Math.PI;
      input.value = res.toString();
    default:
      break;
  }
}

let operators = ["+", "-", "*", "/", ".", "x"];
document.addEventListener("keydown", (event) => {
  var value = event.key;

  if (Number(value) || operators.includes(value) || value === "0") {
    input.value += value;
  }

  if (value === "Enter" || value === "=") {
    execute(input.value);
  }

  if (value === "Backspace") {
    input.value = input.value.substr(0, input.value.length - 1);
  }
});

btns.forEach((btn) => {
  btn.addEventListener("click", (e)=> {
    let btnVal = (e.target as HTMLElement).innerText;
    switch (btnVal) {
      case "÷":
        input.value += "/";
        break;
      case "C":
        input.value = "";
        break;
      case "e":
        input.value += "2.7182818285*";
        break;
      case "=":
        execute(input.value);
        break;
      case "π":
        input.value += "3.14159265359";
        break;
      case "x2":
        input.value += "*" + input.value;
        break;
      case "1/x":
        input.value += `1/`;
        break;
      case "x":
        input.value += "*";
        break;
      case "| x |":
        console.log(Math.abs(+input.value));
        input.value = Math.abs(+input.value).toString();
        break;
      case "exp":
        input.value += " EXP ";
        break;
      case "mod":
        input.value += " MOD ";
        break;
      case "√x":
        input.value = Math.sqrt(+input.value).toString();
        break;
      case "n!":
        input.value = findFactorial(+input.value);
        break;
      case "xy":
        input.value += "^";
        break;
      case "10x":
        input.value += "10^";
        break;
      case "log":
        input.value += "log";
        break;
      case "ln":
        input.value += "ln";
        break;
      case "+/-":
        addOperator(input.value);
        break;
      case "DEG":
        toggleDegToRad(input.value, btnVal);
        break;
      case "RAD":
        toggleDegToRad(input.value, btnVal);
        break;
      case "MR":
        input.value += localStorage.getItem("inputVal");
        break;
      case "MC":
        localStorage.removeItem("inputVal");
        break;
      case "M+":
        input.value = (Number(localStorage.getItem("inputVal")) + +input.value).toString();
        break;
      case "M-":
        input.value = (+input.value - Number(localStorage.getItem("inputVal"))).toString();
        break;
      case "MS":
        localStorage.setItem("inputVal", input.value);
        break;
      case "Sin":
        input.value = "Sin ";
        break;
      case "Cos":
        input.value = "Cos ";
        break;
      case "Tan":
        input.value = "Tan ";
        break;
      case "Round":
        input.value = Math.round(+input.value).toString();
        break;
      case "Ceil":
        input.value = Math.ceil(+input.value).toString();
        break;
      case "Floor":
        input.value = Math.floor(+input.value).toString();
        break;
      case "2nd":
        toggleBtn("2nd");
        break;
      case "1st":
        toggleBtn("1st");
        break;
      case "asin":
        input.value = "asin ";
        break;
      case "acos":
        input.value = "acos ";
        break;
      case "atan":
        input.value = "atan ";
        break;
      case "F-E":
        let numFe = +input.value;
        input.value = numFe.toExponential();
        break;
      case ".":
        if (input.value === "") {
          input.value = "0.";
        } else {
          input.value += ".";
        }
        break;
      case "":
        input.value = input.value.substr(0, input.value.length - 1);
        break;
      case btnVal:
        input.value += btnVal;
        break;
      default:
        alert("Invalid Input!");
        break;
    }
  });
});