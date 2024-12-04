console.clear();

if (document.cookie.indexOf(',counter=') >= 0) {
    let counter = document.cookie.split(',')[1].split('=')[1];
    document.getElementById("badge").innerHTML = counter;
}

let cartContainer = document.getElementById('cartContainer');

let boxContainerDiv = document.createElement('div');
boxContainerDiv.id = 'boxContainer';

// Define the dynamicCartSection function correctly
function dynamicCartSection(ob, itemCounter) {
    let boxDiv = document.createElement('div');
    boxDiv.id = 'box';
    boxContainerDiv.appendChild(boxDiv);

    // You might need to define boxImg (it's not defined in your original code)
    let boxImg = document.createElement('img');
    boxImg.src = ob.imageUrl; // Assuming `imageUrl` exists in `ob`
    boxDiv.appendChild(boxImg);

    let boxh3 = document.createElement('h3');
    let h3Text = document.createTextNode(ob.name + ' × ' + itemCounter);
    boxh3.appendChild(h3Text);
    boxDiv.appendChild(boxh3);

    let boxh4 = document.createElement('h4');
    boxDiv.appendChild(boxh4); // You didn't define what `boxh4` should contain

    cartContainer.appendChild(boxContainerDiv);
}

// Define the total container and update functions correctly
let totalContainerDiv = document.createElement('div');
totalContainerDiv.id = 'totalContainer';

let totalDiv = document.createElement('div');
totalDiv.id = 'total';
totalContainerDiv.appendChild(totalDiv);

let totalh2 = document.createElement('h2');
let h2Text = document.createTextNode('Total Amount');
totalh2.appendChild(h2Text);
totalDiv.appendChild(totalh2);

function amountUpdate(amount) {
    let totalh4 = document.createElement('h4');
    let totalh4Text = document.createTextNode('Amount: Rs ' + amount);
    totalh4Text.id = 'toth4';
    totalh4.appendChild(totalh4Text);
    totalDiv.appendChild(totalh4);

    let buttonDiv = document.createElement('div');
    buttonDiv.id = 'button';
    totalDiv.appendChild(buttonDiv);

    let buttonTag = document.createElement('button');
    buttonDiv.appendChild(buttonTag);
    let buttonLink = document.createElement('a');
    buttonLink.href = '/orderPlaced.html?';
    buttonTag.appendChild(buttonLink);
    let buttonText = document.createTextNode('Place Order');
    buttonTag.appendChild(buttonText);

    buttonTag.onclick = function () {
        console.log("clicked");
    };

    totalDiv.appendChild(buttonDiv);
}

let httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            let item = JSON.parse(httpRequest.responseText); // Assuming item data is in JSON format
            let totalAmount = 0;

            for (let i = 1; i <= counter; i++) {
                let itemCounter = 1;

                for (let j = i + 1; j <= counter; j++) {
                    if (item[i - 1] === item[j]) {
                        itemCounter += 1;
                    }
                }

                totalAmount += Number(contentTitle[item[i - 1] - 1].price) * itemCounter;
                dynamicCartSection(contentTitle[item[i - 1] - 1], itemCounter);

                i += itemCounter - 1; // Adjusting for items with multiple counts
            }

            amountUpdate(totalAmount);
        } else {
            console.log('Request failed!');
        }
    }
};

httpRequest.open('GET', 'https://5d76bf96515d1a0014085cf9.mockapi.io/product', true);
httpRequest.send();
