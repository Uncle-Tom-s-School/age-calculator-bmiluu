const day = document.getElementById("inputDays")
const month = document.getElementById("inputMonths")
const year = document.getElementById("inputYears")

const outputDays = document.getElementById("outputDays")
const outputMonths = document.getElementById("outputMonths")
const outputYears = document.getElementById("outputYears")

day.addEventListener("input",calculateDates)
month.addEventListener("input",calculateDates)
year.addEventListener("input",calculateDates)


function dateDiff(startingDate, endingDate) {
    let startDate = new Date(new Date(startingDate).toISOString().substr(0, 10));
    if (!endingDate) {
      endingDate = new Date().toISOString().substr(0, 10); // need date in YYYY-MM-DD format
    }
    let endDate = new Date(endingDate);
    if (startDate > endDate) {
      const swap = startDate;
      startDate = endDate;
      endDate = swap;
    }
    const startYear = startDate.getFullYear();
    const february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
    const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    let yearDiff = endDate.getFullYear() - startYear;
    let monthDiff = endDate.getMonth() - startDate.getMonth();
    if (monthDiff < 0) {
      yearDiff--;
      monthDiff += 12;
    }
    let dayDiff = endDate.getDate() - startDate.getDate();
    if (dayDiff < 0) {
      if (monthDiff > 0) {
        monthDiff--;
      } else {
        yearDiff--;
        monthDiff = 11;
      }
      dayDiff += daysInMonth[startDate.getMonth()];
    }
  
    return [yearDiff,monthDiff,dayDiff];
  }

function reset(){
    outputDays.innerHTML = "---"
    outputMonths.innerHTML = "---"
    outputYears.innerHTML = "---"
}

function calculateDates(){
    let now = new Date()
    if(!month.value || !day.value || !year.value){return}
    if(month.value < 1 || month.value > 12){
        month.value = null
        reset()
    }
    if(day.value < 1 || day.value > 31){
        day.value = null
        reset() 
    }
    if(year.value > now.getFullYear()){
        year.value = null
        reset()
    }
    let inputDate = new Date()
    inputDate.setFullYear(year.value)
    inputDate.setMonth(month.value)
    inputDate.setDate(day.value)
    
    outputDays.innerHTML = dateDiff(inputDate,now)[2] - 1
    outputMonths.innerHTML = dateDiff(inputDate, now)[1]
    outputYears.innerHTML = dateDiff(inputDate, now)[0]
}