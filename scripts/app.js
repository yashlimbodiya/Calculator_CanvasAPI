//Creating canvas variable to hold HTML canvas element
const canvas = document.getElementById("calculator");

//Setting context to 2D rendering
const ctx = canvas.getContext("2d");

//variable to hold values
let expressionValues = "";
let result = "";

//All top grey buttons
const grey_buttons = [
    { label: "", x: 0, y: 171, width: 80, height: 80 },
    { label: "", x: 81, y: 171, width: 80, height: 80 },
    { label: "", x: 162, y: 171, width: 80, height: 80 },
    { label: "%", x: 243, y: 171, width: 80, height: 80 },
];

//All orange buttons
const orange_buttons = [
    { label: "/", x: 324, y: 171, width: 80, height: 80 },
    { label: "x", x: 324, y: 252, width: 80, height: 80 },
    { label: "-", x: 324, y: 333, width: 80, height: 80 },
    { label: "+", x: 324, y: 414, width: 80, height: 80 },
    { label: "=", x: 324, y: 495, width: 80, height: 80 },
];

//All light_grey buttons
const light_grey_buttons = [
    { label: "(", x: 0, y: 252, width: 80, height: 80 },
    { label: "7", x: 81, y: 252, width: 80, height: 80 },
    { label: "8", x: 162, y: 252, width: 80, height: 80 },
    { label: "9", x: 243, y: 252, width: 80, height: 80 },

    { label: ")", x: 0, y: 333, width: 80, height: 80 },
    { label: "4", x: 81, y: 333, width: 80, height: 80 },
    { label: "5", x: 162, y: 333, width: 80, height: 80 },
    { label: "6", x: 243, y: 333, width: 80, height: 80 },

    { label: "Back", x: 0, y: 414, width: 80, height: 80 },
    { label: "1", x: 81, y: 414, width: 80, height: 80 },
    { label: "2", x: 162, y: 414, width: 80, height: 80 },
    { label: "3", x: 243, y: 414, width: 80, height: 80 },

    { label: "0", x: 0, y: 495, width: 242, height: 80 },
    { label: ".", x: 243, y: 495, width: 80, height: 80 },
];

// Function to draw the calculator buttons
function drawButtons() {
    for (const button of grey_buttons) {
        ctx.fillStyle = "#5F6065";
        ctx.fillRect(button.x, button.y, button.width, button.height);
        ctx.fillStyle = "#fff";
        ctx.font = "20px Arial";
        ctx.fillText(button.label, button.x + 35, button.y + 50);
    }
    for (const button of orange_buttons) {
        ctx.fillStyle = "#ff9f0c";
        ctx.fillRect(button.x, button.y, button.width, button.height);
        ctx.fillStyle = "#fff";
        ctx.font = "20px Arial";
        ctx.fillText(button.label, button.x + 35, button.y + 50);
    }
    for (const button of light_grey_buttons) {
        ctx.fillStyle = "#B0B1B4";
        ctx.fillRect(button.x, button.y, button.width, button.height);
        ctx.fillStyle = "#fff";
        ctx.font = "20px Arial";
        //Creating Back button
        if (button.label == "Back") {
            ctx.fillText(button.label, button.x + 20, button.y + 50);
        } else if (button.label == "0") {
            //Creating 0 button bigger
            ctx.fillText(button.label, button.x + 120, button.y + 50);
        } else {
            ctx.fillText(button.label, button.x + 35, button.y + 50);
        }
    }
}

drawButtons(); //Calling draw button function to display all the buttons

//Function to draw maximize, minimize, close buttons
function windowButtons() {

    //Syntax for creating circle
    ctx.beginPath();
    ctx.fillStyle = "#ff5757";
    ctx.arc(20, 15, 6, 0, 2 * Math.PI);
    ctx.fill();

    //Syntax for creating circle
    ctx.beginPath();
    ctx.fillStyle = "#ffc457";
    ctx.arc(40, 15, 6, 0, 2 * Math.PI);
    ctx.fill();

    //Syntax for creating circle
    ctx.beginPath();
    ctx.fillStyle = "#81ff57";
    ctx.arc(60, 15, 6, 0, 2 * Math.PI);
    ctx.fill();
}
 
// Function to update the expression
function updateExpressions() {
    ctx.fillStyle = "#333";
    ctx.fillRect(0, 30, 405, 100);
    ctx.font = "20px Arial";
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.fillText(expressionValues, 380, 80);
}

//Function to update result
function updateResult() {
    ctx.fillStyle = "#333";
    ctx.fillRect(0, 130, 405, 40);
    ctx.font = "bold 28px Arial";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "right";
    ctx.fillText(result, 380, 130);
}

//calling functions
updateExpressions();
updateResult();
windowButtons();

//Event listener for button clicks
canvas.addEventListener("click", (e) => {

    //Getting click positions
    const x = e.clientX - canvas.getBoundingClientRect().left;
    const y = e.clientY - canvas.getBoundingClientRect().top;

    //Iterating for grey buttons to handle clicks
    for (const button of grey_buttons) {
        if (
            x >= button.x &&
            x <= button.x + button.width &&
            y >= button.y &&
            y <= button.y + button.height
        ) {
            evaluateExpressions(button.label);
            break;
        }
    }

    //Iterating for orange buttons to handle clicks
    for (const button of orange_buttons) {
        if (
            x >= button.x &&
            x <= button.x + button.width &&
            y >= button.y &&
            y <= button.y + button.height
        ) {
            evaluateExpressions(button.label);
            break;
        }
    }

    //Iterating for light grey buttons to handle clicks
    for (const button of light_grey_buttons) {
        if (
            x >= button.x &&
            x <= button.x + button.width &&
            y >= button.y &&
            y <= button.y + button.height
        ) {
            evaluateExpressions(button.label);
            break;
        }
    }
});

// Function to handle button clicks
function evaluateExpressions(buttonLabel) {
    if (buttonLabel === "=") {
        try {
            if(expressionValues === "") return;
            //Using built eval function to evaluate expression
            //result = eval(expressionValues).toString();

            //Regular Expression to remove spaces
            const expressionArr = expressionValues.replace(/\s+/g, "").match(/(\d+\.\d+|\d+|[-+*/()])/g);
            console.log(expressionArr);

            //checking if "parenthesis" present but no operator present
            let isBracketPresent = false;
            let isOperatorPresent = false;
            for (const exp of expressionArr) {
                if(exp === "(" || exp === ")") {
                    isBracketPresent = true;
                } else if (exp === "*" || exp === "/" || exp === "+" || exp === "-") {
                    isOperatorPresent = true;
                }
            }

            if(isBracketPresent && !isOperatorPresent) {
                throw new Error();
            }

            //Calling evaluate function to calculate expression
            result = evaluate(expressionArr);
            //alert(expressionArr[expressionArr.length-1]);
            if(result == undefined || isNaN(result) || (expressionArr[expressionArr.length-2] == "(" && expressionArr[expressionArr.length-1] == ")")) {
                throw new Error();
            }
            //updating result
            updateResult();
            
            return;
        } catch (error) {

            //Setting expression as Invalid if invalid inputs provided
            //alert(error);
            expressionValues = "Invalid Expression";
        }
        //When pressed back button expression clears from the screen
    } else if (buttonLabel === "Back") {
        if(expressionValues === "Invalid Expression") {
            expressionValues = "";
            updateExpressions();
            return;
        }
        let temp1 = expressionValues.charAt(expressionValues.length-1);
        if(temp1 === ' ') {
            expressionValues = expressionValues.substring(0,expressionValues.length-1);
        }
        expressionValues = expressionValues.substring(0,expressionValues.length-1);
        let temp2 = expressionValues.charAt(expressionValues.length-1);
        if(temp2 === ' ') {
            expressionValues = expressionValues.substring(0,expressionValues.length-1);
        }
    } else if (buttonLabel === "/" || buttonLabel === "(" || buttonLabel === ")" || buttonLabel === "x" || buttonLabel === "+" || buttonLabel === "-") {
       //Changing expressionValue from x to * for calculations
        if(buttonLabel === "x") {
            buttonLabel = "*";
        }
        expressionValues += (" " + buttonLabel + " ");
    } else {
        //Appending inputs
        expressionValues += buttonLabel;
    }

    updateExpressions();
}

//Function to calculate expression 
function evaluate(expression) {
    //Maintaining operator and their priority
    const operatorsAndPriority = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2,
    };

    const operators = []; //Stack to store operators
    const values = []; //Stack to store values

    for (const exp of expression) {
        if (!isNaN(exp)) {
            values.push(parseFloat(exp));
        } else if (exp in operatorsAndPriority) {
            while (
                operators.length > 0 &&
                operatorsAndPriority[exp] <= operatorsAndPriority[operators[operators.length - 1]]
            ) {
                solve(operators, values);
            }
            operators.push(exp);
        } else if (exp === "(") {
            operators.push(exp);
        } else if (exp === ")") {
            while (operators.length > 0 && operators[operators.length - 1] !== "(") {
                solve(operators, values);
            }
            if (operators[operators.length - 1] === "(") {
                operators.pop();
            } else {
                throw new Error();
            }
        }
    }

    while (operators.length > 0) {
        solve(operators, values);
    }

    if (operators.length !== 0 || values.length !== 1) {
        throw new Error();
    }

    return values[0];
}

//Method to perform calculation between two numbers
function solve(operators, values) {
    const operator = operators.pop();
    const rightValue = values.pop();
    const leftValue = values.pop();

    switch (operator) {
        case "+" : values.push(leftValue + rightValue); break;
        case "-" : values.push(leftValue - rightValue); break;
        case "*" : values.push(leftValue * rightValue); break;
        case "/" : values.push(leftValue / rightValue); break;
    }
}
