define(['mootools', 'mooveestar'], function(MooTools, MooVeeStar) {
    var ItemView = new Class({
        Extends: MooVeeStar.View,
        template: 'item-view',

        events: {
            'model:change':'render',
            'model:remove':'render'
        },

        // Render is a MooVeeStar.View method that get binds the passed data (or the model.toJSON) to the template
        // We can override it to allow us to sanitize the data bound to the template, as well as other things you may want
        // to take care of (like changing classnames, attributes, etc.)
        render: function(){
            var data;

            // Create a JSON map of our model
            data = this.model.toJSON();

            // Apply our cleaned presentation map to the template
            this.parent(data);
        }
    }); // end ItemView

    return ItemView;
});