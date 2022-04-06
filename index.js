const displayDiv = document.getElementById("nameResult");

function mySearch() {
    getData(countNames);
}

function getData (myCallback) {
    fetch('nameSearchPop300.json')
    .then(Response => Response.json())
    .then(data => {
        const docs = data['response']['docs'];
        myCallback(docs);
    });
}

function countNames(names) {
    let searchResult = [];
    let countResult = 0;
    let nameType;
    const inputName = document.getElementById("inputName").value;
    const wholeName = inputName.split(" ");

    wholeName.forEach(wholeNamePart => {
        searching = wholeNamePart.toUpperCase();
        for(let i=0; i<names.length; i++) {
            if(names[i].name === searching) {
                if (names[i].count < 4) {
                    countResult = "0-3"
                } else {
                    countResult = names[i].count;
                }
                switch(names[i].type) {
                    case "firstgiven":
                        nameType = "første fornavn";
                        break;
                    case "onlygiven":
                        nameType = "eneste fornavn";
                        break;
                    case "family":
                        nameType = "etternavn";
                        break;
                    default:
                        nameType = "uspesifisert";
                }

                const prettyName = firstLetterBig(wholeNamePart);

                searchResult.push({
                    "nameType":nameType,
                    "antall":countResult,
                    "searchedName":prettyName
                })
            }
        }
    })
    displayResult(searchResult);
}

function displayResult(searchResult) {
    const inputName = document.getElementById("inputName").value;
    const prettyName = firstLetterBig(inputName)
    let output = `<h3 class="ssb-title">Resultat</h3>`;
    if(searchResult.length > 0) {
        searchResult.forEach(element => {
            output += `<p>
            Det har ${element.antall} som har <strong>${element.searchedName}</strong> som sitt ${element.nameType}
            </p>`;
            
        });
    } else {
        output += `
        Det er færre enn fire person som har navnet <strong>${prettyName}</strong>`;
    }
    displayDiv.innerHTML = output;

}

function firstLetterBig(name) {
    let properCase = name.toLowerCase();
    const letter = properCase.charAt(0);

    return properCase.replace(properCase.charAt(0), letter.toUpperCase());
}
