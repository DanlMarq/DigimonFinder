var oGrid = this;

// Layout rules
sap.ui.require(["sap/ui/layout/cssgrid/GridBoxLayout"], function(GridBoxLayout) {
    var oLayout = new GridBoxLayout({ 
        boxMinWidth: "250px" 
    }); 
    oGrid.setCustomLayout(oLayout);
});

// Inject Data and Fill ComboBoxes
if (!window.__filtersLoaded && window.extraDigimonData) {
    var oModel = oGrid.getModel();
    var oBinding = oGrid.getBinding("items");
    
    if (oBinding) {
        var aApiData = oModel.getProperty(oBinding.getPath());
        if (aApiData && aApiData.length > 0) {
            
            var aLevels = [], aAttributes = [], aTypes = [];
            
            // Merge data and collect unique values for dropdowns
            aApiData.forEach(function(digi) {
                var extra = window.extraDigimonData.find(function(d) { return d.name === digi.name; });
                if (extra) {
                    digi.type = extra.type;
                    digi.attribute = extra.attribute;
                }
                if (digi.level && !aLevels.includes(digi.level)) aLevels.push(digi.level);
                if (digi.attribute && !aAttributes.includes(digi.attribute)) aAttributes.push(digi.attribute);
                if (digi.type && !aTypes.includes(digi.type)) aTypes.push(digi.type);
            });
            
            oModel.refresh(true); // Tells the grid about the new attributes
            
            // Helper function to build the dropdown options
            function fill(oCombo, arr) {
                if(oCombo) {
                    oCombo.destroyItems();
                    oCombo.addItem(new sap.ui.core.Item({ key: "", text: "All" })); // Clear filter option
                    arr.sort().forEach(function(v) { oCombo.addItem(new sap.ui.core.Item({ key: v, text: v })); });
                }
            }
            
            // Fill the comboboxes 
            if (typeof comboLevel !== "undefined") fill(comboLevel, aLevels);
            if (typeof comboAttr !== "undefined") fill(comboAttr, aAttributes);
            if (typeof comboType !== "undefined") fill(comboType, aTypes);
            
            window.__filtersLoaded = true;
        }
    }
}