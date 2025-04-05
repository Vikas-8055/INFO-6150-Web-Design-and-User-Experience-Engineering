const exp = require('express')
const app = exp()
const cors = require('cors')
const mongoose = require('mongoose')
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');

app.use(cors())
app.use(exp.json())

// const DB = "mongodb+srv://jakkavignesh2002:VigneshJakka@productpricetracker.6u0wkqb.mongodb.net/"
const DB = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.9"

mongoose.connect(DB).then(()=> {
    console.log("DB connected")
}).catch(err => {
    console.log(err)
})

const userSchema = new mongoose.Schema({
    Name: String,
    email: String,
    password: String,
    profileImage : String,
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/'); // Directory to save uploaded images
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Renaming the file
    },
});

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Only .jpeg, .jpg, .png and .gif formats are allowed!'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
});

const database = mongoose.model("webUsers", userSchema)

var nameRegEx = /^[a-z ,.'-]+$/i;
var emailRegEx = /^[a-zA-Z0-9._%+-]+@northeastern+\.edu$/;
var passwordRegEx = ("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,14})");

app.post('/user/create', async(req, res) => {
    const { Name, email, password } = req.body
    try{
        const user = await database.findOne({email: email})
        if(user){
            res.status(502).send({message: "User already exists", status: false})
        }else{
            if( !Name.trim().match(nameRegEx)) {
                return res.status(400).json("Invalid Full Name");
            }
            else if( !email.trim().match(emailRegEx)) {
                return res.status(400).json("use proper northeastern email id");
            }
            else if(!password.trim().match(passwordRegEx)) {
                return res.status(400).json("use strong password ");
            } 
            else {
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = new database({Name, email, password:hashedPassword });
                await user.save()
                return res.status(201).send({message: "Successfully Registered"})
            }
        }
    }
    catch (err){
        console.log(err)
    }
})

app.post('/user/edit', async (req, res) => {
    const {email, newName, newPassword} = req.body;
    const user = await database.findOne({email: email})
    if (!user) {
        return res.status(502).send({ status: false, message: "User Not found" });
    }
    else {
        if( !newName.trim().match(nameRegEx)) {
            return res.status(400).json("Invalid Full Name");
        }
        else if(!newPassword.trim().match(passwordRegEx)) {
            return res.status(400).json("use strong password ");
        } 
        else {
            user.password = newPassword;
            user.Name = newName;
            await user.save();

            return res.status(201).send({ status: true, message: "Name and Password update successful" });
        }
    }
})

app.delete('/user/delete', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).send({ message: 'Email is required' });
    }

    try {
        const user = await database.findOne({email: email})
        if (!user) {
            return res.status(502).send({ status: false, message: "User Not found" });
        }
        else {
            await user.deleteOne({ email });
            return res.status(200).send({ message: 'User deleted successfully' });
        } 
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
});

app.get('/users/getAll', async (req, res) => {
    try {
        const users = await database.find();
        return res.status(200).send(users);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
});

app.post('/user/uploadImage', upload.single('profileImage'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded' });
    }

    const profileImagePath = req.file.path; // Get the file path if uploaded
    res.status(201).send({ message: 'Image uploaded successfully', path: profileImagePath });
});

app.get('/', (req, res) => {
    res.status(200).send("Hello World")
})

app.listen(3001, () => {
    console.log("Server is running on port 3001")
})