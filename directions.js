function loadMapScenario() {
    let map = new Microsoft.Maps.Map(document.getElementById("column2"), { center: new Microsoft.Maps.Location(43.2557, -79.871),
    })

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
    userCurrentLocation()

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

    /*for (i = 0; i < education.length; i++) {
        displayPushpins()
    }*/

    let infobox = new Microsoft.Maps.Infobox(map.getCenter(), { visible: false})
    infobox.setMap(map)


    $("#All").click(function() {
        removePushPins()
        userCurrentLocation()
        for (i = 0; i < education.length; i++) {
            displayPushpins()
        }
    })

    $("#Elementary").click(function() {
        removePushPins()
        userCurrentLocation()
        for (i = 0; i < education.length; i++) 
            if (education[i].CATEGORY === "Elementary School") 
                displayPushpins()

    })

    $("#Middle").click(function() {
        removePushPins()
        userCurrentLocation()
        for (i = 0; i < education.length; i++) 
            if (education[i].CATEGORY === "Middle School") 
                displayPushpins()

    })

    $("#Secondary").click(function() {
        removePushPins()
        userCurrentLocation()
        for (i = 0; i < education.length; i++) 
            if (education[i].CATEGORY === "Secondary School") 
                displayPushpins()

    })

    $("#Post-Secondary").click(function() {
        removePushPins()
        userCurrentLocation()
        for (i = 0; i < education.length; i++) 
            if (education[i].CATEGORY === "Post Secondary") 
                displayPushpins()

    })

    $("#Alternative").click(function() {
        removePushPins()
        userCurrentLocation()
        for (i = 0; i < education.length; i++) 
            if (education[i].CATEGORY === "Alternative Education") 
                displayPushpins()

    })

    $("#Adult").click(function() {
        removePushPins()
        userCurrentLocation()
        for (i = 0; i < education.length; i++) 
            if (education[i].CATEGORY === "Adult Learning") 
                displayPushpins()
    })

    $("#submit").click(function() {
        let name = document.getElementById("name").value
        let address = document.getElementById("address").value
        //console.log(address)

        Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
            searchManager = new Microsoft.Maps.Search.SearchManager(map)
            geocodeQuery(address, name)
        })
    })

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

    function displayPushpins() {
        let location = new Microsoft.Maps.Location(
            education[i].LATITUDE,
            education[i].LONGITUDE
        )

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

    function directions(lat1,long1) {
        console.log(lat1)
        console.log(long1)

        let addr = new Microsoft.Maps.Location(lat1,long1)
        console.log(addr)

        let loc = new Microsoft.Maps.Location(43.234701,-79.8762204)
        console.log(loc)

        let panel = document.getElementById("panel")

        Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function() {
            let directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map)
    
            let way1 = new Microsoft.Maps.Directions.Waypoint({
                address: addr
            })
            directionsManager.addWaypoint(way1)
    
            let way2 = new Microsoft.Maps.Directions.Waypoint({
                address: loc
            })
            directionsManager.addWaypoint(way2)
    
            directionsManager.setRenderOptions({
                itineraryContainer: panel
            })
    
            directionsManager.calculateDirections() 
        })    
    }

    $("#clear").click(function() {
        directionsManager.clearDisplay()
    })

    function removePushPins() {
        for (let i = map.entities.getLength() - 1; i >= 0; i--)
        {
            let pushpin = map.entities.get(i)
            if (pushpin instanceof Microsoft.Maps.Pushpin)
                map.entities.removeAt(i)
        }
    }
}
