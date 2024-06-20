const { User } = require('../models');
class GetController {
    static io = null;

    static setIo(io) {
        this.io = io;
    }

    static async fetchUsers() {
        const users = await User.findAll();
        return users.map(user => ({ id: user.id, email: user.email }));
    }

    static async getData(req, res, next) {
        try {
            const users = await this.fetchUsers();
            res.status(200).json(users);
            if (this.io) {
                this.io.emit('user', users);
            }
        } catch (err) {
            next(err);
        }
    }
}

module.exports = GetController;