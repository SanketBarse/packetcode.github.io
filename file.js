let pin = document.getElementById('pincode');
let userdate = document.getElementById('date');

let btn = document.getElementById('btn')
btn.addEventListener('click', function (e) {
    e.preventDefault();

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
                
                    for (j in json) {
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

                            let longit = json.centers[i].long;
                            let latit = json.centers[i].lat;
                            console.log( "first" ,longit)
                            console.log("first" , latit)
                            
                            new mapboxgl.Marker()
                                .setLngLat([longit, latit])
                                .addTo(map);

                        }
                    }
                    document.getElementById('vaccineBtn').style.display = "block"
                    function success(pos) {
                        var crd = pos.coords;

                        new mapboxgl.Marker()
                                .setLngLat([crd.longitude, crd.latitude])
                                .addTo(map);
                      
                        console.log('Your current position is:');
                        console.log(`Longitude: ${crd.longitude}`);
                        console.log(`Latitude : ${crd.latitude}`);
                        console.log(`More or less ${crd.accuracy} meters.`);
                    }
                    navigator.geolocation.getCurrentPosition(success)


                }
                else {

                    let alertclass = document.getElementsByClassName('alertclass')[0];
                    alertclass.style.top = "0px"
                    setTimeout(function () {
                        alertclass.style.top = "-70px"
                    }, 4000);
                }
            }
        }
        else if (this.status == 300 || this.status == 400 || this.status == 500) {
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










