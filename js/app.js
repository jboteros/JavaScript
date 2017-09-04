var calculator = (function() {

    var sum = function(param1, param2) {
        return param1 + param2;
    }

    var subtraction = function(param1, param2) {
        return param1 - param2;
    }

    var multiply = function(param1, param2) {
        return param1 * param2;
    }
    var divide = function(param1, param2) {
        return param1 / param2;
    }

    return {
        sum: sum,
        subtraction: subtraction,
        multiply: multiply,
        divide: divide

    }
})();


var tecla = document.getElementsByClassName("tecla");
sessionStorage.clear();
for (var i = tecla.length - 1; i >= 0; i--) {
    tecla[i].addEventListener("mousedown", pressKey);
    tecla[i].addEventListener("mouseup", releaseKey);
}

function pressKey() {
    console.log('pressKey: ' + this.id)
    document.getElementById(this.id).style = "  padding: 1px 1px 1px 1px;";

    var clickSound = new Audio('sound/ComputerMouse.mp3');
    clickSound.loop = false;
    clickSound.play();

    if (this.id == "on") {
        sessionStorage.clear();
        document.getElementById('display').innerHTML = 0;
    } else if (this.id == "raiz") {
        // Not function assigned
    } else if (this.id == "igual") {

        sessionStorage.setItem("scondValue", sessionStorage.getItem('lastkey'))

        var fristValue = parseFloat(sessionStorage.getItem('fristValue'))
        var secondValue = parseFloat(sessionStorage.getItem('scondValue'))

        switch (sessionStorage.getItem("operation")) {
            case "+":
                console.log("sum: ", fristValue, " + ", secondValue)
                sessionStorage.setItem("lastkey", calculator.sum(fristValue, secondValue));
                var str = sessionStorage.getItem("lastkey");
                if (str.length > 9) str = str.substring(0, 9);
                document.getElementById('display').innerHTML = str;
                console.log(calculator.sum(fristValue, secondValue))
                break;
            case "-":
                console.log("subtraction: ", fristValue, " - ", secondValue)
                sessionStorage.setItem("lastkey", calculator.subtraction(fristValue, secondValue));
                var str = sessionStorage.getItem("lastkey");
                if (str.length > 9) str = str.substring(0, 9);
                document.getElementById('display').innerHTML = str;
                console.log(calculator.subtraction(fristValue, secondValue))
                var lastResult = calculator.subtraction(fristValue, secondValue)
                if (lastResult == 0) {
                    sessionStorage.clear();
                    document.getElementById('display').innerHTML = 0;
                }
                break;
            case "*":
                console.log("multiply: ", fristValue, " * ", secondValue)
                sessionStorage.setItem("lastkey", calculator.multiply(fristValue, secondValue));
                var str = sessionStorage.getItem("lastkey");
                if (str.length > 9) str = str.substring(0, 9);
                document.getElementById('display').innerHTML = str;
                console.log(calculator.multiply(fristValue, secondValue))
                break;
            case "/":
                console.log("divide: ", fristValue, " / ", secondValue)
                sessionStorage.setItem("lastkey", calculator.divide(fristValue, secondValue));
                var str = sessionStorage.getItem("lastkey");
                if (str.length > 9) str = str.substring(0, 9);
                document.getElementById('display').innerHTML = str;
                console.log(calculator.divide(fristValue, secondValue))
                break;
            default:
                break;
        }


    } else if (this.id == "0") {
        var value = document.getElementById('display').innerHTML;

        if (value == 0) {

        } else {
            if (sessionStorage['lastkey'] == null) {
                sessionStorage.setItem("lastkey", this.id);
                document.getElementById('display').innerHTML = sessionStorage.getItem('lastkey');
            } else {
                if (document.getElementById('display').innerHTML.length + 1 <= 8) {
                    console.log(document.getElementById('display').innerHTML.length + 1)
                    sessionStorage.setItem("lastkey", sessionStorage.getItem('lastkey') + this.id);
                    document.getElementById('display').innerHTML = sessionStorage.getItem('lastkey');
                }
            }
        }
    } else if (this.id == ".") {
        console.log('Pide .');
        var str = document.getElementById('display').innerHTML;
        var n = str.indexOf(".");
        if (n > 0) {
            console.log('Si tiene punto');
        } else {
            console.log('No tiene punto');

            if (sessionStorage['lastkey'] == null) {
                sessionStorage.setItem("lastkey", 0 + this.id);
                document.getElementById('display').innerHTML = sessionStorage.getItem('lastkey');
            } else {
                if (document.getElementById('display').innerHTML.length + 1 <= 8) {
                    console.log(document.getElementById('display').innerHTML.length + 1)
                    sessionStorage.setItem("lastkey", sessionStorage.getItem('lastkey') + this.id);
                    document.getElementById('display').innerHTML = sessionStorage.getItem('lastkey');
                }
            }
        }
    } else if (this.id == "mas") {
        sessionStorage.setItem("fristValue", sessionStorage.getItem('lastkey'));
        sessionStorage.setItem("operation", '+')

        sessionStorage.removeItem("lastkey");
        document.getElementById('display').innerHTML = ""

    } else if (this.id == "menos") {
        sessionStorage.setItem("fristValue", sessionStorage.getItem('lastkey'));
        sessionStorage.setItem("operation", '-')

        sessionStorage.removeItem("lastkey");
        document.getElementById('display').innerHTML = ""

    } else if (this.id == "por") {
        sessionStorage.setItem("fristValue", sessionStorage.getItem('lastkey'));
        sessionStorage.setItem("operation", '*')

        sessionStorage.removeItem("lastkey");
        document.getElementById('display').innerHTML = ""

    } else if (this.id == "dividido") {
        sessionStorage.setItem("fristValue", sessionStorage.getItem('lastkey'));
        sessionStorage.setItem("operation", '/')

        sessionStorage.removeItem("lastkey");
        document.getElementById('display').innerHTML = ""

    } else if (this.id == "sign") {
        var value = document.getElementById('display').innerHTML;
        if (value != 0) {
            console.log('press sign');
            var invertNumber = negativeNumber(sessionStorage.getItem('lastkey'));
            document.getElementById('display').innerHTML = invertNumber
            sessionStorage.setItem("lastkey", invertNumber);
        }
    } else {
        if (sessionStorage['lastkey'] == null) {
            sessionStorage.setItem("lastkey", this.id);
            document.getElementById('display').innerHTML = sessionStorage.getItem('lastkey');
        } else {
            if (document.getElementById('display').innerHTML.length + 1 <= 8) {
                console.log(document.getElementById('display').innerHTML.length + 1)
                sessionStorage.setItem("lastkey", sessionStorage.getItem('lastkey') + this.id);
                document.getElementById('display').innerHTML = sessionStorage.getItem('lastkey');
            }
        }
    }
}

function releaseKey() {
    document.getElementById(this.id).style = "  padding: 0px 0px 0px 0px;";
}


function negativeNumber(num) {
    if (num > 0) {
        return -Math.abs(num);
    } else if (num < 0) {
        return Math.abs(num);
    }
}