// Display information about the next upcoming launch
let nextId;
// fetch next launch to get its id
fetch('https://api.spacexdata.com/v4/launches/next')
.then(response => response.json())
.then(data => {
    // fetch with next launch id to get detailed information
    fetch('https://api.spacexdata.com/v4/launches/' + data.id)
    .then(response => response.json())
    .then(data2 => {
        let rocket = document.getElementById("next");
        rocket.innerHTML = "Flight Number: " + data2.flight_number;
        rocket.innerHTML += "<br/>Date: " + data2.date_local;
        // fetch to get data about the rocket for the next launch
        fetch('https://api.spacexdata.com/v4/rockets/' + data2.rocket)
        .then(response => response.json())
        .then(data3 => {
            rocket.innerHTML += "<br/>Rocket Type: " + data3.name;
            rocket.innerHTML += "<br/>Rocket Success rate: " + data3.success_rate_pct + "%<br/>";            
            if(data2.crew.length == 0)
                    rocket.innerHTML += "No crew for this launch"
            
        })
        .catch(function(error) {
            console.log(error);
        });
    })
    .catch(function(error) {
        console.log(error);
    }); 
})
.catch(function(error) {
            console.log(error);
});   
  
// Last Launches
document.getElementById("f").addEventListener("submit", function(e){
    e.preventDefault();
    let num = document.getElementById("number").value;
    fetch('https://api.spacexdata.com/v3/launches/past?limit=' + num)
        .then(response => response.json())
        .then(data => {
            let rocket = document.getElementById("last");
            rocket.innerHTML = "";
            for(let i = 0; i < num; i++){
                rocket.innerHTML += "<br/>Mission Name: " + data[i].mission_name;
                rocket.innerHTML += "<br/>Launch Number: " + data[i].flight_number;
                rocket.innerHTML += "<br/>Launch Year: " + data[i].launch_year;
                // Adds a bit of color for success True/False
                if(data[i].launch_success)
                    rocket.innerHTML += "<br/>Launch Success: <span style='color: green'>True</span><br/>";     
                else
                    rocket.innerHTML += "<br/>Launch Success: <span style='color: red'>False</span><br/>";        
            }
        })
        .catch(function(error) {
            console.log(error);
        });   
});
// Displays the name of the rocket
for(let i = 0; i < 4; i++) {
    fetch('https://api.spacexdata.com/v4/rockets/')
        .then(response => response.json())
        .then(data => {
            let rocket = document.getElementById("0" + i);
            rocket.innerHTML = data[i].description;
        })
        .catch(function(error) {
            console.log(error);
        });
}
//displays advanced information
// adds event listener on all buttons, and when one is clicked, it knows the index, and can pick the correct rocket
document.querySelectorAll('.rocket').forEach((button, index)=>{
    button.addEventListener('click', function(){
        fetch('https://api.spacexdata.com/v4/rockets/')
        .then(response => response.json())
        .then(data => {
            let rocket = document.getElementById(0 + index.toString());
            if(document.getElementById(index).innerText == "More Details"){                
                rocket.innerHTML = data[index].description;
                rocket.innerHTML += "<br/>First Flight: " + data[index].first_flight;
                rocket.innerHTML += "<br/>Cost Per Launch: " + formatter.format(data[index].cost_per_launch);
                rocket.innerHTML += "<br/>Success rate: " + data[index].success_rate_pct + "%";
                document.getElementById(index).innerText = "Less Details";
            }
            else{
                rocket.innerHTML = data[index].description;
                document.getElementById(index).innerText = "More Details"
            }
            
            // Gets the right location to put text
            
            
        })
        .catch(function(error) {
            console.log(error);
        });
    });
});

// formatter for money
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

// for my crazy css
  var frog = new Audio("./Crazy/frog.mp3");
  document.getElementById("crazy").addEventListener("click", function(e){
      let link = document.getElementById("link");
      if(link.getAttribute('href') == "./normal.css") {
            link.setAttribute('href', "./Crazy/crazy.css");     
            document.getElementById("c1").src = "./Crazy/border.gif";
            document.getElementById("c2").src = "./Crazy/pikapika.png";
            document.getElementById("c3").src = "./Crazy/swirls.gif";
            document.getElementById("c4").src = "./Crazy/rocket1.gif";
            document.getElementById("c5").src = "./Crazy/rocket1.gif";
            document.getElementById("crazy").innerText = "CRAZY MODE!!! Click me to go back"
            frog.play();
      }
      else{
            frog.pause();
            link.setAttribute('href', "./normal.css");
            for(let i = 1; i < 6; i++){
                document.getElementById("c" + i).src = "./";
            }
            document.getElementById("crazy").innerText = "You know what? That was pretty cool. Take me back."
      }
});