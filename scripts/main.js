requirejs.config({
    baseUrl: 'scripts',
    paths: {
        // major libraries
        //crossroads: 'vendor/crossroads/crossroads.min',
        //signals: 'vendor/js-signals/signals.min',
        mootools : 'vendor/mootools/mootools-core-1.4.5-full-compat',
        mooveestar: 'vendor/mooveestar/mooveestar'
    },
    useStrict: true,
    shim: {
        'mootools': {
            exports: 'MooTools'
        },
        'mooveestar': {
            exports: 'MooVeeStar'
        }
    }
});

// start the main app logic
requirejs(['mootools', 'mooveestar', 'views/app'], function(MooTools, MooVeeStar, AppView) {
    //console.log(crossroads.getNumRoutes());

    document.body.grab(AppView);
});

