/**
 * @http://stackoverflow.com/questions/3818016/google-maps-v3-limit-viewable-area-and-zoom-level
 */

(function(gmaps) {

    gmaps.Map.prototype.setMaxBounds = function(bounds) {
        gmaps.event.addListener(this, 'dragend', function() {
            if (bounds.contains(this.getCenter())) return;

            // We're out of bounds - Move the map back within the bounds

            var c = this.getCenter(),
                x = c.lng(),
                y = c.lat(),
                maxX = bounds.getNorthEast().lng(),
                maxY = bounds.getNorthEast().lat(),
                minX = bounds.getSouthWest().lng(),
                minY = bounds.getSouthWest().lat();

            if (x < minX) x = minX;
            if (x > maxX) x = maxX;
            if (y < minY) y = minY;
            if (y > maxY) y = maxY;

            this.setCenter(new google.maps.LatLng(y, x));
       });
    };

})(google.maps);
