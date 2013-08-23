define(['mootools', 'mooveestar'], function(MooTools, MooVeeStar) {
    var StatsView = new Class({
        Extends: MooVeeStar.View,
        template: 'stats-view',

        render: function() {
            var data;

            // Create a JSON map of our model
            data = this.model.toJSON();

            var todocount = this.element.getElement('.todo-count');
            data['stats-label'] = ((this.model.get('remaining') == 1) ? "item" : "items") + " left";

            var clearBtn = this.element.getElement('a.clear-completed');
            (this.model.get('done') != 0) ? clearBtn.set('styles', {display: 'block'}) : clearBtn.set('styles', {display: 'none'});

            // Apply our cleaned presentation map to the template
            this.parent(data);
        }
    });

    return StatsView;
});