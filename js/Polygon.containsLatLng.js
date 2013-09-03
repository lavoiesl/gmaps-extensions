/**
 * @link https://code.google.com/p/google-maps-extensions/source/browse/google.maps.Polygon.getBounds.js
 */

(function(gmaps) {

    gmaps.Polygon.prototype.containsLatLng = function(latLng) {
        // Exclude points outside of bounds as there is no way they are in the poly

        var lat, lng;

        //arguments are a pair of lat, lng variables
        var bounds = this.getBounds();

        if(bounds != null && !bounds.contains(latLng)) {
            return false;
        }
        lat = latLng.lat();
        lng = latLng.lng();

        // Raycast point in polygon method
        var inPoly = false;

        var numPaths = this.getPaths().getLength();
        for(var p = 0; p < numPaths; p++) {
            var path = this.getPaths().getAt(p);
            var numPoints = path.getLength();
            var j = numPoints-1;

            for(var i=0; i < numPoints; i++) {
                var vertex1 = path.getAt(i);
                var vertex2 = path.getAt(j);

                if (vertex1.lng() < lng && vertex2.lng() >= lng || vertex2.lng() < lng && vertex1.lng() >= lng) {
                    if (vertex1.lat() + (lng - vertex1.lng()) / (vertex2.lng() - vertex1.lng()) * (vertex2.lat() - vertex1.lat()) < lat) {
                        inPoly = !inPoly;
                    }
                }

                j = i;
            }
        }

        return inPoly;
    }

})(google.maps);
