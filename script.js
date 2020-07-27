/*--------onClick on """ Generate PIN """ button, each time generates a new PIN number--------*/
document.querySelector(".generate-btn").addEventListener('click', function () {
    function createRandomNumber() {
        let randomNumber = (Math.random() * 10000);
        return randomNumber;
    }

    let getRandomNumber;
    /*checks the generated random number is having 4 digit or not. 
    Ex: 0043(not accepted), 4356(accepted) */
    while (1) {
        getRandomNumber = createRandomNumber();
        if (getRandomNumber / 1000 > 1) {
            break;
        }
        else {
            continue;
        }
    }

    const generatePIN = Math.floor(getRandomNumber);
    document.querySelector("#show-generated-pin").value = generatePIN;
});



/*---------onClick on the digit buttons, shows the digit in the display screen---------*/
var totalButton = document.querySelectorAll('.button');
for (let i = 0; i < totalButton.length; i++) {
    const singleButton = totalButton[i];

    singleButton.addEventListener('click', function () {
        const buttonNumber = this.innerText;

        var pinWritingField = document.querySelector('#write-generated-pin');
        pinWritingField.value = pinWritingField.value + buttonNumber;
    });
}




/*onClick on """ C """ button, clears display screen of user pin input area*/
document.querySelector('#clear').addEventListener('click', function () {
    document.querySelector('#write-generated-pin').value = "";
});



/*onClick on """ < """ button, clears the last digit of user pin input display screen*/
document.querySelector('#backspace').addEventListener('click', function () {
    const writtenPIN = document.querySelector('#write-generated-pin').value;
    const afterBackspace = writtenPIN.slice(0, -1);
    document.querySelector('#write-generated-pin').value = afterBackspace;
});



/*onClick on """" submit """" button, checks system generated PIN is equal to user input PIN or not and also shows succes or failed message*/
document.querySelector('.submit-btn').addEventListener('click', function () {
    const systemGeneratedPIN = parseInt(document.querySelector('#show-generated-pin').value);
    const userInputPIN = parseInt(document.querySelector('#write-generated-pin').value);

    hideActionMessage();

    //checks if we wrote something in user PIN input field
    if (isNaN(userInputPIN)) {
        document.querySelectorAll(".notify")[3].style.display = 'block';
        return;
    }
    //checks if syestem generated PIN is equal to user input PIN
    else if (systemGeneratedPIN == userInputPIN) {
        document.querySelectorAll(".notify")[1].style.display = 'block';
        return;
    }

    document.querySelectorAll(".notify")[0].style.display = 'block';
    document.querySelector('.action-left').style.display = 'block';

    //decrease of remaining attempt
    const nowHaveAttempt = parseInt(document.querySelector('#remaining-attempt').innerText);
    const remainAttempt = nowHaveAttempt - 1;

    document.querySelector('#remaining-attempt').innerText = remainAttempt;
    if (remainAttempt == -1) {
        document.querySelector('.submit-btn').setAttribute('disabled', 'true');
        document.querySelector('.action-left').innerHTML = 'You are out of try';

        hideActionMessage();
        document.querySelectorAll('.notify')[2].style.display = 'block';
    }
});



document.getElementById("backspace").innerText = "<";

/*--------initially hiding all notifications/pop up messages---------*/
function hideActionMessage() {
    document.querySelector('.action-left').style.display = 'none';

    const totalActionMessage = document.querySelectorAll(".notify");
    for (let i = 0; i < totalActionMessage.length; i++) {
        totalActionMessage[i].style.display = 'none';
    }
}
hideActionMessage();
