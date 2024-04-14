module.exports = {
    getUser: function () {
        const user = sessionStorage.getItem('user');
        if (user === 'undefined' || !user) {
            return null;
        } else {
            return JSON.parse(user);
        }
    },

    setUserSession: function (user_name, email) {
        const user = { user_name, email }; // Create an object with username and useremail
        sessionStorage.setItem('username', JSON.stringify(user.user_name));
        sessionStorage.setItem('useremail', JSON.stringify(user.email)); // Store the object in sessionStorage
    },

    resetUserSession: function () {
        sessionStorage.removeItem('user');
    }
}