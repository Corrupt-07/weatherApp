console.log("This is index.js");

let apiKey = '76d14abadd8c426991342156210601';

document.getElementById('onSubmit').addEventListener("click", displayData);

function displayData() {
    let getData = document.querySelector('#getData').value;
    console.log(getData)
    if (getData === "") {
        let htmlStr = `
                            <h1>Wrong Details</h1>
                            <p>Please enter the state and try again</p>`
        document.querySelector('#dispData').innerHTML = htmlStr;
    } else {
        const xhr = new XMLHttpRequest();
        console.log(xhr)
        // console.log(apiKey)
        xhr.open('GET', `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${getData}`, true);

        xhr.onload = function () {
            console.log("inside onload func")
            if (this.status === 200) {
                let json = JSON.parse(this.responseText);
                console.log(json);
                let location = json.location;
                let current = json.current;
                console.log(location.name.toLowerCase())
                if (getData.toLowerCase() == location.name.toLowerCase()) {
                    // console.log(current.condition.icon);
                    let htmlStr = `
                            <h1>${location.name}</h1>
                            <p>${current.temp_c}&#8451;</p>
                            <p>Condition:<img src="${current.condition.icon}"</p>`
                    document.querySelector('#dispData').innerHTML = htmlStr;
                }
                else {
                    let htmlStr = `
                            <h1>Wrong state name</h1>
                            <p>Please check the state or spelling and try again</p>`
                    document.querySelector('#dispData').innerHTML = htmlStr;
                }

            }
        }

        xhr.send();
    }
}
