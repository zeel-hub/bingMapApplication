/**
 * Assignment by Zeel K Patel, 000824838
 * I, Zeel Patel, student number 000824838, certify that this material is my original work. No other person's work has been used without due acknowledgment and I have not made my work available to anyone else.
 */
function loadMapScenario() {
    // Adding bing maps to the web app
    let map = new Microsoft.Maps.Map(document.getElementById("column2"), { center: new Microsoft.Maps.Location(43.2557, -79.871),
    })

    // Adding Directions Module 
    Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function() {
        directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map)
    })

    userCurrentLocation()

    /**
     * A method to get users current location and place a pushpin on that location.
     */
    function userCurrentLocation() {
        navigator.geolocation.getCurrentPosition(function (position) {
            var loc = new Microsoft.Maps.Location(
                position.coords.latitude,
                position.coords.longitude);
    
            //Add a pushpin at the user's location.
            var pin = new Microsoft.Maps.Pushpin(loc);

            let userInfoBox = new Microsoft.Maps.Infobox(loc, { 
                title: "User Location",
                description: "Longitude: " + position.coords.longitude  + "<br>Latitude: " + position.coords.latitude,
            visible: false})
            userInfoBox.setMap(map)

            Microsoft.Maps.Events.addHandler(pin, 'click', function () {
                userInfoBox.setOptions({ visible: true });
            });

            map.entities.push(pin);
        }, errorCallback);    
    }
    
    /**
     * A method to display error message if any of the following error occurs. 
     * @param {error} error 
     */
    function errorCallback(error) {
        let errMsg
        switch (error.code) {
            case error.PERMISSION_DENIED:
                errMsg = 'User denied the request for geolocation'
                break
            case error.POSITION_UNAVAILABLE:
                errMsg = 'Location information is unavailable'
                break
            case error.TIMEOUT:
                errMsg = 'The request to get user location timed out'
                break
            case error.UNKNOWN_ERROR:
            default:
                errMsg = 'An unknown error occurred'
                break
        }
        $('#error').html(`Error: ${errMsg}`)
    }

    // To display all the pushpins on map when the page first loads. 
    for (i = 0; i < education.length; i++) {
        displayPushpins()
    }

    let infobox = new Microsoft.Maps.Infobox(map.getCenter(), { visible: false})
    infobox.setMap(map)

    // To display all the pushpins
    $("#All").click(function() {
        directionsManager.clearDisplay()
        removePushPins()
        userCurrentLocation()
        for (i = 0; i < education.length; i++) {
            displayPushpins()
        }
    })
 
    $("#Elementary").click(function() {
        directionsManager.clearDisplay()
        removePushPins()
        userCurrentLocation()
        for (i = 0; i < education.length; i++) 
            if (education[i].CATEGORY === "Elementary School") 
                displayPushpins()

    })

    $("#Middle").click(function() {
        directionsManager.clearDisplay()
        removePushPins()
        userCurrentLocation()
        for (i = 0; i < education.length; i++) 
            if (education[i].CATEGORY === "Middle School") 
                displayPushpins()

    })

    $("#Secondary").click(function() {
        directionsManager.clearDisplay()
        removePushPins()
        userCurrentLocation()
        for (i = 0; i < education.length; i++) 
            if (education[i].CATEGORY === "Secondary School") 
                displayPushpins()

    })

    $("#Post-Secondary").click(function() {
        directionsManager.clearDisplay()
        removePushPins()
        userCurrentLocation()
        for (i = 0; i < education.length; i++) 
            if (education[i].CATEGORY === "Post Secondary") 
                displayPushpins()

    })

    $("#Alternative").click(function() {
        directionsManager.clearDisplay()
        removePushPins()
        userCurrentLocation()
        for (i = 0; i < education.length; i++) 
            if (education[i].CATEGORY === "Alternative Education") 
                displayPushpins()

    })

    $("#Adult").click(function() {
        directionsManager.clearDisplay()
        removePushPins()
        userCurrentLocation()
        for (i = 0; i < education.length; i++) 
            if (education[i].CATEGORY === "Adult Learning") 
                displayPushpins()
    })

    // To display the pushpin user added
    $("#submit").click(function() {
        let name = document.getElementById("name").value
        let address = document.getElementById("address").value
        //console.log(address)

        // Adding Search Module
        Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
            searchManager = new Microsoft.Maps.Search.SearchManager(map)
            geocodeQuery(address, name)
        })
    })

    /**
     * A method to search for the location user entered and add a pushpin to it.
     * @param {query} query 
     * @param {n} n 
     */
    function geocodeQuery(query, n) {
        let searchRequest = {
            where: query,
            callback: function(r) {
                if (r && r.results && r.results.length > 0) {
                    let newPin = new Microsoft.Maps.Pushpin(r.results[0].location, {title: n})
                    console.log(r.results[0].location)
                    map.entities.push(newPin)

                } else {
                    alert('Error')
                }
            },
            errorCallback: function (e) {
                // If there is an error, alert the user about it
                alert('No results found')
            },
        }
    
        // Make the geocode request
        searchManager.geocode(searchRequest)
    }

    /**
     * A method to display all the pushpins
     */
    function displayPushpins() {
        let location = new Microsoft.Maps.Location(
            education[i].LATITUDE,
            education[i].LONGITUDE
        )

        // accessing each associate array element
        pushpin = new Microsoft.Maps.Pushpin(location, {
            title: education[i].NAME,
        })
        pushpin.metadata = {
            myTitle: education[i].NAME, 
            myDescription: "<a href='" + education[i].WEBSITE + "'>" + education[i].NAME + "</a><br>" + education[i].ADDRESS + "<br>" + education[i].CATEGORY + "<br>" + education[i].COMMUNITY + "<br>" + "<a href='#' onclick=' return " + directions +"(" + education[i].LATITUDE + "," + education[i].LONGITUDE + ");" + "'>Directions</a>" 
        }

        Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked)

        map.entities.push(pushpin)

        function pushpinClicked(e) { // pushpin which is just clicked
            let infoboxNewOptions = {
                location: e.target.getLocation(),
                title: e.target.metadata.myTitle,
                description: e.target.metadata.myDescription,
                visible: true,
            }
            infobox.setOptions(infoboxNewOptions)
        }
    }

    /**
     * A method to display direction when user clicks on the directions link.
     * @param {lat1} lat1 
     * @param {long1} long1 
     */
    function directions(lat1,long1) {
        console.log(lat1)
        console.log(long1)
        //removeWaypoints()
        directionsManager.clearDisplay()

        let addr = new Microsoft.Maps.Location(lat1,long1)
        console.log(addr)

        let loc = new Microsoft.Maps.Location(43.234701,-79.8762204)
        console.log(loc)

        let panel = document.getElementById("panel")

        let way1 = new Microsoft.Maps.Directions.Waypoint({
            location: addr
        })
        directionsManager.addWaypoint(way1)

        let way2 = new Microsoft.Maps.Directions.Waypoint({
            location: loc
        })
        directionsManager.addWaypoint(way2)

        directionsManager.setRenderOptions({
            itineraryContainer: panel
        })

        directionsManager.calculateDirections()     
    }

    // to clear the directions
    $("#clear").click(function() {
        directionsManager.clearDisplay()
    })

    // To remove all the pushpins from the screen.
    function removePushPins() {
        for (let i = map.entities.getLength() - 1; i >= 0; i--)
        {
            let pushpin = map.entities.get(i)
            if (pushpin instanceof Microsoft.Maps.Pushpin)
                map.entities.removeAt(i)
        }
    }

    // trying to remove the waypoints
    /*function removeWaypoints() {
        for (let i = map.entities.getLength() - 1; i >= 0; i--)
        {
            let waypoint = map.entities.get(i)
            if (waypoint instanceof Microsoft.Maps.Directions.Waypoint)
                map.entities.removeAt(i)
        }
    }*/
}
