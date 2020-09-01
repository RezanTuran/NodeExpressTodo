// ### Externt API From SvenskaDagar ### // 

function makeRequest(url, method, formdata, callback) {
    fetch(url, {
        method: method,
        body: formdata
    }).then((data) => {
        return data.json()
    }).then((result) => {
        callback(result)
    }).catch((err) => {
        console.log("Error: ", err)
    })
}

function getDays() {
    makeRequest("https://api.dryg.net/dagar/v2.1/2020", "GET", null, (result) => {

		let showDays = document.getElementById("days")

		for (let i = 1; i < result.dagar.length; i++) {

			let days = (result.dagar[i].veckodag);
            let date = (result.dagar[i].datum);
            

            let row = document.createElement("div");
            
            if(date < formatDate(new Date())){
                row.style.display = "none"
            }

			let dayNameTag = document.createElement("p");
            let datemTag = document.createElement("p");
            
            if(date === formatDate(new Date())){
                datemTag.style.color = "red"
                dayNameTag.style.color = "red"
                row.style.borderColor = "turquoise"
            }

			dayNameTag.innerText = days;
            datemTag.innerText = date;

			row.appendChild(dayNameTag);
            row.appendChild(datemTag);

			showDays.appendChild(row);

            row.onclick = function () {
             alert("Det kommer")
            }
            
		}
        console.log(result.dagar);
	})
}

function formatDate(date) {
    var year = date.getFullYear().toString();
    var month = (date.getMonth() + 101).toString().substring(1);
    var day = (date.getDate() + 100).toString().substring(1);
    return year + "-" + month + "-" + day;
}


getDays()

// const calendar  = document.querySelector("#app-calendar");


// for (let day = 1; day < 31; day++ ){
//     console.log(day);

//     calendar.insertAdjacentHTML("beforeend", `<div class="day">${day}</div>`)
// }