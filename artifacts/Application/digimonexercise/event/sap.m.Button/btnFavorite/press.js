var sName = DigimonNames2.getText();
var favorites = JSON.parse(localStorage.getItem("digiFavorites") || "[]");

if (favorites.includes(sName)) {
    // If already a favorite, remove it
    favorites = favorites.filter(function(name) { return name !== sName; });
    this.setIcon("sap-icon://unfavorite");
    this.setText("Add to Favorites");
} else {
    // If not a favorite, add it
    favorites.push(sName);
    this.setIcon("sap-icon://favorite");
    this.setText("Remove Favorite");
}

// Save the updated list back to the browser
localStorage.setItem("digiFavorites", JSON.stringify(favorites));