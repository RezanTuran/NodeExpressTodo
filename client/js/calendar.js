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

function formatDate(date) {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 101).toString().substring(1);
    const day = (date.getDate() + 100).toString().substring(1);
    return year + "-" + month + "-" + day;
}
getDays()


function getDays() {
    makeRequest("https://api.dryg.net/dagar/v2.1/2020", "GET", null, (result) => {

            const month = new Array();
            month[0] = "Januari";
            month[1] = "Februari";
            month[2] = "Mars";
            month[3] = "April";
            month[4] = "Maj";
            month[5] = "Juni";
            month[6] = "Juli";
            month[7] = "Augusti";
            month[8] = "September";
            month[9] = "Oktober";
            month[10] = "November";
            month[11] = "December";
          
            const d = new Date();
            const showMonth = month[d.getMonth()];
            //console.log(showMonth);     

        let getMonth = document.getElementById("month")
        getMonth.innerText = showMonth
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




