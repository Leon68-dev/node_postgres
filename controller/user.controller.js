const db = require('../db');

class UserController {
    async createUser(req, res) {
        try{
            const { name, surname } = req.body;
            console.log(name, surname);
            const newPerson = await db.query(`INSERT INTO person(name, surname) values($1, $2) RETURNING *`, [name, surname]);
            res.json(newPerson?.rows[0]);
        } catch(e) {
            res.status(500).json(e);
        }
    }

    async getUsers(req, res) {
        try {
            const users = await db.query(`SELECT * FROM person`);
            res.json(users?.rows);
        } catch(e) {
            res.status(500).json(e);
        }
    }

    async getOneUser(req, res) {
        try{
            const id = req.params.id;
            const user = await db.query(`SELECT * FROM person where id = $1`, [id]);
            res.json(user?.rows[0]);
        } catch(e) {
            res.status(500).json(e);
        }
    }

    async updateUser(req, res) {
        try{
            const { id, name, surname } = req.body;
            const user = await db.query(
                `UPDATE person SET name = $2, surname = $3 where id = $1 RETURNING *`, 
                [id, name, surname]);
            res.json(user?.rows[0]);
        } catch(e) {
            res.status(500).json(e);
        }
    }

    async deleteUser(req, res) {
        try{
            const id = req.params.id;
            const user = await db.query(`DELETE FROM person where id = $1`, [id]);
            res.json(user?.rows[0]);
        } catch(e) {
            res.status(500).json(e);
        }
    }

}

module.exports = new UserController();