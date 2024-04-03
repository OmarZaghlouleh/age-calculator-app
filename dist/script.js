"use strict";
// import moment from "moment";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let button = document.getElementsByClassName("calc-button")[0];
button.onclick = function () {
    return __awaiter(this, void 0, void 0, function* () {
        let inputs = document.getElementsByClassName("input-component");
        let day = "";
        let month = "";
        let year = "";
        let hasError = false;
        for (let i = 0; i < inputs.length; i++) {
            let inputField = inputs[i].getElementsByClassName("input")[0];
            if (inputField.value.length == 0) {
                hasError = true;
                inputs[i].setAttribute("error", "true");
                if (inputs[i].children.length == 2)
                    inputs[i].appendChild(getErrorLabel("This field is required"));
            }
            else {
                let value = parseInt(inputField.value);
                switch (inputField.id) {
                    // Invalid day
                    case "day":
                        day = value.toString();
                        if (value <= 0 || value > 31) {
                            hasError = true;
                            inputs[i].setAttribute("error", "true");
                            if (inputs[i].children.length == 2)
                                inputs[i].appendChild(getErrorLabel("Must be a valid day"));
                        }
                        else {
                            inputs[i].setAttribute("error", "false");
                            if (inputs[i].children.length > 2)
                                inputs[i].children[2].remove();
                        }
                        break;
                    // Invalid month
                    case "month":
                        month = value.toString();
                        if (value <= 0 || value > 12) {
                            hasError = true;
                            inputs[i].setAttribute("error", "true");
                            if (inputs[i].children.length == 2)
                                inputs[i].appendChild(getErrorLabel("Must be a valid month"));
                        }
                        else {
                            inputs[i].setAttribute("error", "false");
                            if (inputs[i].children.length > 2)
                                inputs[i].children[2].remove();
                        }
                        break;
                    // Invalid year
                    case "year":
                        year = value.toString();
                        if (value > new Date().getFullYear()) {
                            hasError = true;
                            inputs[i].setAttribute("error", "true");
                            if (inputs[i].children.length == 2)
                                inputs[i].appendChild(getErrorLabel("Must be in the past"));
                        }
                        else if (value.toString().length < 3) {
                            hasError = true;
                            inputs[i].setAttribute("error", "true");
                            if (inputs[i].children.length == 2)
                                inputs[i].appendChild(getErrorLabel("Invalid year"));
                        }
                        else {
                            inputs[i].setAttribute("error", "false");
                            if (inputs[i].children.length > 2)
                                inputs[i].children[2].remove();
                        }
                        break;
                    default:
                        break;
                }
            }
        }
        let fullDate = `${day}/${month}/${year}`;
        if (!hasError) {
            if (!valDate(fullDate)) {
                console.log(`Date:${fullDate}`);
                // Invalid date
                hasError = true;
                for (let i = 0; i < inputs.length; i++) {
                    inputs[i].setAttribute("error", "true");
                    if (inputs[i].getElementsByClassName('input')[0].id == "day") {
                        if (inputs[i].children.length == 2)
                            inputs[i].appendChild(getErrorLabel("Must be a valid date"));
                    }
                }
            }
        }
        if (!hasError) {
            console.log("Success");
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].removeAttribute("error");
                if (inputs[i].children.length > 2)
                    inputs[i].children[inputs[i].children.length - 1].remove();
            }
            // Show result
            let resultDiv = document.getElementsByClassName("result")[0];
            let age = calcDate(`${year}/${month}/${day}`);
            for (let i = 0; i < resultDiv.children.length; i++) {
                if (resultDiv.children[i].className.includes("days")) {
                    // Days
                    if (resultDiv.children[i].childNodes.length == 2)
                        resultDiv.children[i].childNodes[0].remove();
                    resultDiv.children[i].className = "days";
                    resultDiv.children[i].style.setProperty("--days-value", age[0].toString());
                    resultDiv.children[i].className = `days ${getDaysAnimation()}`;
                }
                else if (resultDiv.children[i].className.includes("months")) {
                    // Months
                    if (resultDiv.children[i].childNodes.length == 2)
                        resultDiv.children[i].childNodes[0].remove();
                    resultDiv.children[i].className = "months";
                    resultDiv.children[i].style.setProperty("--months-value", age[1].toString());
                    resultDiv.children[i].className = `months ${getMonthsAnimation()}`;
                }
                else if (resultDiv.children[i].className.includes("years")) {
                    // Years
                    if (resultDiv.children[i].childNodes.length == 2)
                        resultDiv.children[i].childNodes[0].remove();
                    resultDiv.children[i].className = "years";
                    resultDiv.children[i].style.setProperty("--years-value", age[2].toString());
                    resultDiv.children[i].className = `years ${getYearsAnimation()}`;
                }
            }
        }
    });
};
function getErrorLabel(label) {
    let errorLabel = document.createElement('p');
    errorLabel.className = "error-label";
    errorLabel.append(label);
    return errorLabel;
}
function valDate(date) {
    let dateformat = /^(0?[1-9]|[1-2][0-9]|3[01])[\/](0?[1-9]|1[0-2])/;
    // Matching the date through regular expression      
    if (date.match(dateformat)) {
        let operator = date.split('/');
        // Extract the string into month, date and year      
        let datepart = [];
        if (operator.length > 1) {
            datepart = date.split('/');
        }
        let day = parseInt(datepart[0]);
        let month = parseInt(datepart[1]);
        let year = parseInt(datepart[2]);
        // Create a list of days of a month      
        let ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (month == 1 || month > 2) {
            if (day > ListofDays[month - 1]) {
                //to check if the date is out of range
                // console.log("Invalid date")
                return false;
            }
        }
        else if (month == 2) {
            let leapYear = false;
            if ((!(year % 4) && year % 100) || !(year % 400))
                leapYear = true;
            if ((leapYear == false) && (day >= 29)) {
                console.log("Invalid date");
                return false;
            }
            else if ((leapYear == true) && (day > 29)) {
                console.log('Invalid date format!');
                return false;
            }
        }
    }
    else {
        console.log("Invalid date format!");
        return false;
    }
    return true;
}
function calcDate(date) {
    // let today = new Date()
    const dt_date1 = new Date(date);
    const dt_date2 = new Date();
    //Get the Timestamp
    const date1_time_stamp = dt_date1.getTime();
    const date2_time_stamp = dt_date2.getTime();
    let calc;
    //Check which timestamp is greater
    if (date1_time_stamp > date2_time_stamp) {
        calc = new Date(date1_time_stamp - date2_time_stamp);
    }
    else {
        calc = new Date(date2_time_stamp - date1_time_stamp);
    }
    //Retrieve the date, month and year
    const calcFormatTmp = calc.getDate() + '-' + (calc.getMonth() + 1) + '-' + calc.getFullYear();
    //Convert to an array and store
    const calcFormat = calcFormatTmp.split("-");
    //Subtract each member of our array from the default date
    const days_passed = Number(Math.abs(parseInt(calcFormat[0])) - 1);
    const months_passed = Number(Math.abs(parseInt(calcFormat[1])) - 1);
    const years_passed = Number(Math.abs(parseInt(calcFormat[2])) - 1970);
    return [days_passed, months_passed, years_passed];
}
function getDaysAnimation() {
    return `animate-[counter_1s_ease-out_forwards] [counter-set:_num_var(--num-days)] before:content-[counter(num)]`;
}
function getMonthsAnimation() {
    return `animate-[counter_1s_ease-out_forwards] [counter-set:_num_var(--num-months)] before:content-[counter(num)]`;
}
function getYearsAnimation() {
    return `animate-[counter_1s_ease-out_forwards] [counter-set:_num_var(--num-years)] before:content-[counter(num)]`;
}
