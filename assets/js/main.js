const button = document.getElementById('button')
const input = document.getElementById('input-ip')

const ip = document.getElementById('output-ip')
const ubication = document.getElementById('output-location')
const timezone = document.getElementById('output-timezone')
const isp = document.getElementById('output-isp')

//Map creation
const map = L.map('map').setView([0, 0], 4);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);


//Set current info (IP, City, timezone & ISP when user load the page.)
document.addEventListener('DOMContentLoaded', () => {


    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximunAge: 0
    }

    //If user has ubication enabled, then the info shows.
    const getPositionSuccess = (pos) => {
        let lat = pos.coords.latitude
        let long = pos.coords.longitude

        map.setView([lat, long], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19
        }).addTo(map);
        var marker = L.marker([lat, long]).addTo(map);


        //Api to get info about the city.
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}
     `)
            .then(res => res.json())
            .then(data => {
                
                ubication.textContent = `${data.locality}, ${data.countryName}`
            })
            setCurrentInfo()
    }

    const error = (err) => console.log(err)

    const geolocation = navigator.geolocation
    geolocation.getCurrentPosition(getPositionSuccess, error, options)

    
})

//Set ip, timezone and isp info.
const setCurrentInfo = () => {

    fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(res => {
            ip.textContent = res.ip
            timezone.textContent = `UTC${res.utc_offset}`
            isp.textContent = res.org
        })
        .catch(err => console.log(err))
}


//Function to show the info about the input value.
let setNewInfo = (ip) => {

    fetch(`https://ipapi.co/${ip}/json/`)
        .then(res => res.json())
        .then(data => {
            
            let ip = document.getElementById('output-ip')
            if (!data.error) {
                ip.textContent = data.ip
                timezone.textContent = `UTC ${data.utc_offset}`
                isp.textContent = data.org
                ubication.textContent = `${data.city}, ${data.region}`

                setNewMap(data)
            }

        })
        .catch(err => console.log(err))
}
//Set the new map location with the new latitute and 
setNewMap = (data) => {
    let newLat = data.latitude
    let newLong = data.longitude
    

    if (newLat != undefined && newLong != undefined) {
        map.setView(new L.LatLng(newLat, newLong), 13);
        var marker = L.marker([newLat, newLong]).addTo(map);
    }

}








button.addEventListener('click', (e) => {
    e.preventDefault()
    let newIp = input.value

    setNewInfo(newIp)

})