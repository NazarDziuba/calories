const weightInp = document.getElementById("weight");
const submit = document.getElementById("submit");
const wetRatio = document.getElementById("wetRatio");
const resultDiv = document.getElementById("result");
const kCal = [];
const normKcal = [20, 32, 42, 51, 60, 68];
const initCal = 368;
const calGram = [];
let selectedWetRatio = 0;
wetRatio.addEventListener("change", (event)=>{
  selectedWetRatio = parseInt(event.target.value, 10)
  //console.log(selectedWetRatio)
  
})

function calculateGrams(weight) {
    if (weight < 1 || weight > 6) {
        console.log("Вес должен быть в диапазоне от 1 до 6 кг.");
        return;
    }
    
    // Определение индекса диапазона
    const index = Math.floor(weight); // Индексы 0–5 для веса 1–6
    const k = normKcal[index] - normKcal[index-1];
    const b = normKcal[index] - k * (index + 1);
    
    // Расчет граммов
    const resGr = k * weight + b;
    const calories = (resGr * initCal * 0.01) * 1.3; // С поправкой на коэффициент
    calGram.push(calories);

    //console.log(`Граммы: ${resGr.toFixed(2)}, Калории: ${calories.toFixed(2)}`);
    return calories;
}
function calculateFood(calories, wetPercent){
  const wetCalories = (calories*wetPercent)/100 // Рассчет кол-во калорий на заданный процент мокрого корма
  const dryCalories = calories - wetCalories// Рассчет кол-ва калорий сухого корма
  console.log(wetCalories)
  console.log(dryCalories)
  console.log(wetPercent)
  console.log(calories)
  
  // 1г мокрого корма = 0.77кал,   1г сухого корма = 3.68кал
  const wetFoodGrams = wetCalories/0.77;
  const dryFoodGrams = dryCalories/3.68;
  
  const resultHTML = `<div class="resDiv"><h1 class="result">Результат:</h1><br><p class="resultText">Потрібно давати ${wetFoodGrams.toFixed(2)}гр. вологого корму та ${dryFoodGrams.toFixed(2)}гр. сухого корму.</div></p>`
  resultDiv.innerHTML = resultHTML;
  return resultHTML
  
};
submit.addEventListener("click", () => {
    const weight = parseFloat(weightInp.value); // Получение веса кота
    const calories = calculateGrams(weight);
  if(calories){
    calculateFood(calories, selectedWetRatio)
  }
});
