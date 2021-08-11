let pin = document.getElementById('pincode');
let userdate = document.getElementById('date');
let btn = document.getElementById('btn')

btn.addEventListener('click', function (e) {

    let pincode = pin.value;
    let user = userdate.value;
    let dateSplit = user.split("-");

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`, true);

    xhr.onload = function () {
        if (this.status == 200) {
            let json = JSON.parse(this.responseText);
            {
                if (json.centers.length > 0) {
                    for(j in json){
                        for (let i = 0; i < json[j].length; i++) {
                            document.getElementById('cowin-1').innerHTML +=
                                `<tr>
                                    <th scope="col">${i + 1}</th>
                                    <td>${json.centers[i].name}</td>
                                    <td>${json.centers[i].sessions[0].vaccine}</td>
                                    <td>${json.centers[i].sessions[0].available_capacity}</td>
                                    <td>${json.centers[i].sessions[0].min_age_limit}</td>
                                    <td>${json.centers[i].sessions[0].available_capacity_dose1}</td>
                                    <td>${json.centers[i].sessions[0].available_capacity_dose2}</td>
                                    <td>${json.centers[i].fee_type}</td>
                                </tr>`

    

                            document.getElementById('vaccineBtn').style.display = "block"
                        }
                    }

                }
                else {

                    let alertclass = document.getElementsByClassName('alertclass')[0];
                    alertclass.style.top = "50px"
                    setTimeout(function () {
                        alertclass.style.top = "-1px"
                    }, 4000);
                }
            }
        }
        if(this.status == 300 || this.status == 400 || this.status == 500) {
            alert("Something is missing ! ")
        }


        // <--------------------------------------------------------------------------->

        // <--------------------------------------------------------------------------->
    }

    xhr.send();

    if (document.getElementById('cowin-1').innerHTML === null) {
        document.getElementById('myAlert').innerHTML = `<div class="alert alert-danger" role="alert">
            Sorry Vaccine Not Found Please Try For Other Date!
            </div>`
    }
    else {
        pin.value = null
        userdate.value = null
        document.getElementById('cowin-1').innerHTML = null
    }
    e.preventDefault();
});










