function fourSquare(location) {
    console.log(location);
    $.get(
        'https://api.foursquare.com/v2/venues/search' +
        '?client_id=BNDGPC13FY511GOP2TNMHF41AMYDYCGOHNRFM1NRGUC5BIQH' +
        '&client_secret=4WYPCXAI1CJ4NA23WVOFWFMU1IUMFY554JMYQNKBWP1PKFEX' +
        '&v=20140220' +
        '&near=' + encodeURI(location) +
        '&categoryId=4bf58dd8d48988d1fa931735',
        function(data) {
            console.log(data);
        }
    );
}f