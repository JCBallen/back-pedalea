import { Router } from 'express';
import db from '../firebase.js';

const router = Router();

//? FOR TESTING
router.get('/testme', (req, res) => {
    res.json({ res: "Hello World!" });
});

//? GET all users list
router.get('/getUsers', async (req, res) => {
    try {
        const querySnapshot = await db.collection("users").get()
        console.log(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        res.json({ res: querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) });
    } catch (error) {
        res.json({ res: "Error getting documents", error });
    }
});

//? GET single user by id
router.get('/getUser/:id', async (req, res) => {
    try {
        const docRef = db.collection("users").doc(req.params.id);
        const doc = await docRef.get();
        if (!doc.exists) {
            res.json({ res: "No such document!" });
        } else {
            res.json({ res: { id: req.params.id, ...doc.data() } });
        }
    } catch (error) {
        res.json({ res: "Error getting document", error });
    }
});

//? POST create new user
router.post('/createUser', async (req, res) => {
    try {

        await db.collection("users").add(req.body);
        res.json({ res: "createUser", info: req.body });
    } catch (error) {
        res.json({ res: "Error creating document", error });
    }
});

//? UPDATE single user by id
router.post('/updateUser', async (req, res) => {
    try {
        const { id, ...data } = req.body;
        await db.collection("users").doc(id).update(data);
        res.json({ res: "updateUser", info: req.body, status: true });
    } catch (error) {
        res.json({ res: "Error updating document", error, status: false });
    }
});

//? DELETE single user by id
router.post('/deleteUser', async (req, res) => {
    try {
        await db.collection("users").doc(req.body.id).delete();
        res.json({ res: "deleteUser", info: req.body });
    } catch (error) {
        res.json({ res: "Error deleting document", error });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const querySnapshot = await db.collection("users").where("email", "==", email).where("password", "==", password).get();
        if (querySnapshot.empty) {
            res.json({ res: "No such document!", login: false });
        } else {
            res.json({ res: querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })), login: true });
        }
    } catch (error) {
        res.json({ res: "Error getting documents", error });
    }
});

//? POST create new user
router.post('/register', async (req, res) => {
    try {
        const { _path: { segments: [, docID] } } = await db.collection("users").add(req.body);
        res.json({ res: "register 1", info: req.body, docID, status: true });
    } catch (error) {
        res.json({ res: "Error creating document", error, status: false });
    }
});

export default router;