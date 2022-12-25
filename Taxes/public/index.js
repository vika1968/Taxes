"use strict";
// https://www.kolzchut.org.il/he/%D7%9E%D7%93%D7%A8%D7%92%D7%95%D7%AA_%D7%9E%D7%A1_%D7%94%D7%9B%D7%A0%D7%A1%D7%94
const input = document.querySelector(".getSalary");
const destSalarySpan = document.querySelector(".span1");
const destTaxSpan = document.querySelector(".span2");
const spanInfoPercentage = document.querySelector("#spanInfoPercentage");
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    input.value = input.value.replace(',', '').replace('.', '');
    if (!Number(input.value)) {
        alert("Please, enter numeric value.");
        setDefaultScreen();
        return;
    }
    else if (Number(input.value) <= 0) {
        alert("Please, enter numeric value more than 0.");
        setDefaultScreen();
        return;
    }
    calculateSalaryAfterTax(Number(input.value));
});
class TaxStep {
    constructor(minSalary, maxSalary, taxPercentage) {
        this.minSalary = minSalary;
        this.maxSalary = maxSalary;
        this.taxPercentage = taxPercentage;
    }
}
const taxSteps = [
    new TaxStep(0, 6450, 0.10),
    new TaxStep(6450, 9240, 0.14),
    new TaxStep(9240, 14840, 0.20),
    new TaxStep(14840, 20620, 0.31),
    new TaxStep(20620, 42910, 0.35),
    new TaxStep(42910, 55270, 0.47),
    new TaxStep(55270, Infinity, 0.50),
];
const calculateSalaryAfterTax = (salaryBeforeTax) => {
    let totalTax = 0;
    let salaryAfterTax = 0;
    let taxPercentage = 0;
    taxSteps.forEach(taxStep => {
        if (salaryBeforeTax < taxStep.minSalary) {
            return;
        }
        totalTax += (Math.min(salaryBeforeTax, taxStep.maxSalary) - taxStep.minSalary) * taxStep.taxPercentage;
    });
    salaryAfterTax = salaryBeforeTax - totalTax;
    taxPercentage = totalTax / salaryBeforeTax;
    showResult(totalTax, salaryAfterTax, taxPercentage);
};
const showResult = (taxValue, endSalaryValue, taxPercentage) => {
    destSalarySpan.style.color = "red";
    destTaxSpan.style.color = "blue";
    changeHeaderInfo("h3", "Your net salary is : ");
    changeHeaderInfo("h4", "Your taxes are : ");
    destSalarySpan.textContent = endSalaryValue.toString();
    destTaxSpan.textContent = taxValue.toString();
    changeSpanInfo(" shekel.");
    spanInfoPercentage.textContent += `\n The tax percentage is : ${(taxPercentage * 100).toFixed(1).toString()}%.`;
    console.log(spanInfoPercentage.textContent);
};
const btnClearForm = document.querySelector(".btnClear");
const setDefaultScreen = () => {
    input.value = '';
    destSalarySpan.textContent = '';
    destTaxSpan.textContent = '';
    spanInfoPercentage.textContent = '';
    changeSpanInfo('');
    changeHeaderInfo("h3", "Enter your salary to get the result");
    changeHeaderInfo("h4", "Your taxes will be shown here ...");
};
btnClearForm.addEventListener("click", setDefaultScreen);
const changeSpanInfo = (sString) => {
    document.querySelectorAll(".wordShek").forEach((spanElement) => {
        spanElement.textContent = sString;
    });
};
const changeHeaderInfo = (el, sStr) => {
    const head = document.querySelector(el);
    head.textContent = sStr;
};
