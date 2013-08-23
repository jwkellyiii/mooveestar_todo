define(['mootools', 'mooveestar', 'models/todo', 'views/item_view', 'views/stats_view'], function(MooTools, MooVeeStar, ToDo, ItemView, StatsView) {
    var AppView = new Class({
        Extends: MooVeeStar.View,
        template: 'app-view',

        events:{
            'collection:change':'onCollectionChange',
            'collection:add': 'addOne',
            'keypress:relay(input.new-todo)': 'createOnEnter',
            'keypress:relay(input.edit)': 'updateTodo',
            'blur:relay(input.edit)': 'cancelTodoUpdate',
            'dblclick:relay(li)': 'editTodo',
            'click:relay(a.destroy)': 'deleteTodo',
            'click:relay(input.toggle)': 'completedTodo',
            'click:relay(input.toggle-all)': 'markAllCompleted',
            'click:relay(a.clear-completed)': 'clearCompleted'
        },

        initialize: function(){
            // Setup anything we want before we call the parent/super MooVeeStar.View.initialize
            // In this case, a collection since we are listening to its events in our events map above
            this.collection = new MooVeeStar.Collection();
            this.parent.apply(this, arguments); // Apply the passed arguments

            // MooVeeStar.View.initialize sets up a bunch of things for us. 'element' is set to the templates
            // container. Additionally, there is an 'elements' field that contains the same element as
            // 'elements.container' and we can use for organization. We'll put our list there to use later.
            this.elements.list = this.element.getElement('ul'); //this.element.getFirst('ul');
            this.elements.footer = this.element.getElement('footer');
        },

        onCollectionChange: function(){
            var todos = this.collection.getAll();
            var done = todos.filter(function(value, key) {
                return value.get('completed') == true
            });

            var stats = new StatsView(new MooVeeStar.Model({
                done: done.length,
                remaining: todos.length
            }));

            this.empty(this.elements.footer);
            this.elements.footer.appendChild($(stats));
        },

        createOnEnter: function(e, target) {
            if (e.code != 13) return;
            if (!target.value) return;

            this.collection.add(new ToDo({
                name: target.value,
                id: String.uniqueID(),
                completed: false
            }));

            target.set('value', '');
        },

        addOne: function() {
            var item = this.collection.getLast();
            this.elements.list.appendChild($(new ItemView(item)));
        },

        editTodo: function(e, target) {
            target.addClass("editing");
            target.getChildren('input')[0].focus();
        },

        updateTodo: function(e, target) {
            if (e.code != 13) return;
            if (!target.value) return;

            var parent = target.getParents('li');
            var todo = this.collection.get(parent.getProperty('data-id'));
            todo.set("name", target.value);

            parent.removeClass("editing");
        },

        cancelTodoUpdate: function(e, target) {
            var parent = target.getParents('li');
            parent.removeClass("editing");
        },

        completedTodo: function(e, target) {
            var parent = target.getParents('li');
            var todo = this.collection.findFirst(parent.getProperty("data-id"));

            if(todo.get('completed')) {
                parent.removeClass("completed");
                todo.set("completed", false);
            } else {
                parent.addClass("completed");
                todo.set("completed", true);
            }
        },

        deleteTodo: function(e, target) {
            var parent = target.getParents('li');
            var todo = parent.getProperty('data-id');
            this.collection.remove(todo);

            parent.destroy();
        },

        markAllCompleted: function(e, target) {
            var done = target.checked;

            this.collection.getAll().forEach(function(todo) {
                todo.set("completed", done);
                var item = document.getElement("li[data-id='"+todo.get('id')+"']");
                var checkbox = document.getElement("li[data-id='"+todo.get('id')+"'] input[type=checkbox]");

                if(done) {
                    item.addClass('completed')
                    checkbox.set("checked", "checked");
                } else {
                    item.removeClass('completed');
                    checkbox.removeProperty("checked");
                }
            });
        },

        clearCompleted: function(e, target) {
            var that = this;
            var done = that.collection.filter(function(value, key) {
                return value.get('completed') == true
            });

            done.forEach(function(todo) {
                if(todo.get('completed')) {
                    var item = document.getElement("li[data-id='"+todo.get('id')+"']");
                    item.destroy();
                    that.collection.remove(todo, true);
                }
            });
        }
    }); // end AppView

    var app = new AppView(new MooVeeStar.Model({
        title: 'MooVeeStar Todo',
        description: 'Todo app made with mooveestar.js'
    }));

    return app;
});