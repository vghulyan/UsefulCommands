// export variable with immediately invoked function
const RouteSearch = (function () {
    // region public function
    /**
     * This is the main function that takes an array of waypoints as an argument
     * and returns a list of waypoints by going from the nearest waypoint of the 0:0 coordinate
     * to the nearest waypoint of the just found waypoint etc. until it reaches
     * the last waypoint in the list and returns to it's starting waypoint.
     *
     * @param {array} waypoints array of objects with x and y coordinates
     *
     * @returns {array} array of objects with x and y coordinates in the order they get visited
     */
    this.getRoute = function (waypoints) {
        // put the 0:0 as the starting point into the graph
        let path = [
            {x: 0, y: 0}
        ];
        // for each waypoint find the nearest neighbour waypoint and add it to the path
        while (waypoints.length > 0) {
            // get nearest waypoint from the waypoint we visited last on the path (last path element)
            const nearestPointIndex = getNearestWaypointIndex(path[path.length - 1], waypoints);
            // remove the nearest waypoint from the available waypoints and add it to the path
            const removedWaypoint = waypoints.splice(nearestPointIndex, 1)[0];
            path.push(removedWaypoint);
        }
        // remove 0:0 point
        path.shift();

        // push first item to the last position again to make the start waypoint also the end waypoint
        // if the path has more than one waypoint
        if (path.length > 1) {
            path.push(path[0]);
        }

        return path;
    };

    /**
     * Calculates distance between two points
     *
     * @param {object} pointA object with x and y coordinates
     * @param {object} pointB object with x and y coordinates
     *
     * @returns {number} distance between point A and point B
     */
    this.getDistance = function (pointA, pointB) {
        // get difference in x direction
        const distWidth = pointA.x - pointB.x;
        // get difference in y direction
        const distHeight = pointA.y - pointB.y;

        // return complete distance by using Pythagorean theorem
        return Math.sqrt(Math.pow(distWidth, 2) + Math.pow(distHeight, 2));
    };
    // endregion public functions

    // region private functions
    /**
     * Searches the index of the nearest waypoint to the origin
     *
     * @param {object} origin object with x and y coordinates
     * @param {array} waypoints array of objects with x and y coordinates
     *
     * @returns {number} index of the nearest waypoint to the origin from the waypoints array
     */
    function getNearestWaypointIndex(origin, waypoints) {
        let nearestWaypointIndex = 0
        // loop over all the given waypoints
        waypoints.forEach((current, currentIndex) => {
            // get the currently nearest waypoint to the origin
            const nearestWaypoint = waypoints[nearestWaypointIndex];
            // if the distance from the origin to the current waypoint is smaller than from the origin to
            // the currently nearest waypoint, we set the nearest waypoint index to the current index
            if (getDistance(origin, current) < getDistance(origin, nearestWaypoint)) {
                nearestWaypointIndex = currentIndex;
            }
        });

        return nearestWaypointIndex;
    }
    // endregion private functions

    // return this with the public getRoute function
    return this;
})();