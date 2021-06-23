let pin = document.getElementById('pincode')
let userdate = document.getElementById('date')

let btn =document.getElementById('btn')
btn.addEventListener('click',function(e){
    e.preventDefault();
    
    let pincode = pin.value
    let user = userdate.value

    const xhr = new XMLHttpRequest();
        xhr.open('GET',`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${user}`,true);
    
        xhr.onprogress = function(){{
            console.log('on progress');
        }}
    
        xhr.onload = function(){
            if(this.status == 200){
                let json = JSON.parse(this.responseText);
                {
                    for (j in json){
                        for(let i=0;i<json[j].length;i++){
                            document.getElementById('cowin-1').innerHTML +=       
                            `<tr>
                                <th scope="col">${i+1}</th>
                                <td>${json.centers[i].name}</td>
                                <td>${json.centers[i].sessions[0].vaccine}</td>
                                <td>${json.centers[i].sessions[0].available_capacity}</td>
                                <td>${json.centers[i].sessions[0].min_age_limit}</td>
                                <td>${json.centers[i].sessions[0].available_capacity_dose1}</td>
                                <td>${json.centers[i].sessions[0].available_capacity_dose2}</td>
                                <td>${json.centers[i].fee_type}</td>
                            </tr>`
                               
                        }
                    }
                }
            }
            else{
                document.write("Not Found");
            }

            
        }

        xhr.send();
    
    
    
    if(document.getElementById('cowin-1').innerHTML === null){
        alert("not found");
    }
    else{
        pin.value = null
        userdate.value = null
        document.getElementById('cowin-1').innerHTML = null
    }
    e.preventDefault();
});










