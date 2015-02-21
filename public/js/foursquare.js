var category_map = {
    'hotel': '4bf58dd8d48988d1fa931735',
    'convention': '4bf58dd8d48988d1ff931735'
};

function fourSquare(location, category, func) {
    console.log(location);
    $.get(
        'https://api.foursquare.com/v2/venues/search' +
        '?client_id=BNDGPC13FY511GOP2TNMHF41AMYDYCGOHNRFM1NRGUC5BIQH' +
        '&client_secret=4WYPCXAI1CJ4NA23WVOFWFMU1IUMFY554JMYQNKBWP1PKFEX' +
        '&v=20150220' +
        '&near=' + encodeURI(location) +
        '&categoryId=' + category_map[category],
        func
    );
}