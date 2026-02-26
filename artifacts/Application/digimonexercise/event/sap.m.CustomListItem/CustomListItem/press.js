// Get context of the card clicked
var oContext = oEvent.getSource().getBindingContext();
var sName = oContext.getProperty("name");
var sLevel = oContext.getProperty("level");
var sImg = oContext.getProperty("img");

// Look up the extra data using global dictionary
var clickedData = window.extraDigimonData.find(function(digi) {
    return digi.name === sName;
});

// Set the data on the Detail Page components
if (clickedData) {
    txtType.setText("Type: " + clickedData.type);
    txtAttribute.setText("Attribute: " + clickedData.attribute);
}

DigimonNames2.setText(sName);
Image2.setSrc(sImg);
DigimonLevel.setText(sLevel);

// Turn the page
App.to(PageDetail);


// Favorite
var favorites = JSON.parse(localStorage.getItem("digiFavorites") || "[]");
if (favorites.includes(sName)) {
    btnFavorite.setIcon("sap-icon://favorite");
    btnFavorite.setText("Remove Favorite");
} else {
    btnFavorite.setIcon("sap-icon://unfavorite");
    btnFavorite.setText("Add to Favorites");
}