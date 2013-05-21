module.exports = {
	port: 80,
    title: 'App',
	env: 'public', // public | local
    secret: 'expressSecretShoppingList',
	remoteServiceUrl: null,
    routes: {
        get: [{
            route: '/login',
            view: 'login',
            callback: function (req, res) {
                return {title: 'Anmelden'};
            }
        }, {
            route: '/shopping',
            view: 'shopping',
            callback: function (req, res) {
                return {title: 'Einkaufsliste'};
            }
        }],
        post: [],
        redirect: [{
            route: '/',
            view: 'shopping',
            callback: function (req, res) {
                return {title: ''};
            }
        }]
    }
};

