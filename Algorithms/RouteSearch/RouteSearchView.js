// export variable with immediately invoked function
const RouteSearchView = (function () {
    // ui elements
    let waypointForm;
    let waypointInput;
    let calcRouteButton;
    let outputTableBody;

    // region public function
    /**
     * Init function to setup the event handlers
     */
    this.init = function () {
        // get the references to the different UI elements
        waypointForm = document.getElementById('waypointForm');
        waypointInput = document.getElementById('waypointInput');
        calcRouteButton = document.getElementById('calcRouteButton');
        outputTableBody = document.getElementById('outputTableBody');

        // register event handlers
        waypointForm.onsubmit = () => {
            // disable navigation on form submit
            return false
        };
        calcRouteButton.onclick = handleCalcRouteButtonClick;
    };
    // endregion public functions

    // region private functions
    /**
     * Event handler for submit/calcRouteButton click
     */
    function handleCalcRouteButtonClick () {
        // call function to get the waypoint array from the user input
        const waypointArray = getArrayFromWaypointInput();
        // test if the value is a non empty array
        if (waypointArray && typeof waypointArray === 'object' && waypointArray.length > 0) {
            // get route from the RouteSearch class
            const route = RouteSearch.getRoute(waypointArray);
            // display the route
            displayRouteResult(route);
        } else {
            // show message to user if he entered invalid data
            alert('Please enter a non empty waypoint array in the given format.');
        }
    }

    /**
     * Reads the input from the user, parses it to an javascript object/array and returns this value.
     *
     * @returns {object|array} the user input
     */
    function getArrayFromWaypointInput () {
        try {
            // read value
            let inputVal = waypointInput.value;
            // try to parse JSON and return object
            return JSON.parse(inputVal);
        } catch (exc) {
            // if parsing failed we show an alert to the user
            alert('Failed parsing JSON. Please check your input.');
            // return empty array
            return [];
        }
    }

    /**
     * Displays the content of the waypoint in the result table
     *
     * @param {array} waypoints
     */
    function displayRouteResult (waypoints) {
        // local variable for storing total trip length
        let totalDistance = 0;

        // map the array to string of the waypoints for the table
        const output = waypoints.map((waypoint, index) => {
            // get last point (defaults to the first point if index out of arrays bounds is requested)
            const lastPoint = waypoints[Math.max(index - 1, 0)];
            // get the distance from last to current point
            const distance = RouteSearch.getDistance(lastPoint, waypoint);
            // add distance to total distance
            totalDistance += distance;
            // return string for table
            return '<tr>' +
                '<td>' + (index + 1) + '</td>' +
                '<td>' + waypoint.x + '</td>' +
                '<td>' + waypoint.y + '</td>' +
                '<td>' + distance.toFixed(2) + '</td>' +
                '<td>' + totalDistance.toFixed(2) + '</td>' +
                '</tr>';
        }).join('');

        // set the HTML of the table body to the result value
        outputTableBody.innerHTML = output;
    }
    // endregion private functions

    // return namespace with global variables
    return this;
})();