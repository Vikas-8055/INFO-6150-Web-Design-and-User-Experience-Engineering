
app.post('/user/create', async (req, res) => {
    try {
      const { fullName, email, password } = req.body;
     
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ fullName, email, password: hashedPassword });
      await user.save();
      res.status(201).send('User created successfully');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  app.post("/user/login", (req, res, next) => {
    let fetchedUser;
    User.findOne({
      email: req.body.email,
    }).then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      fetchedUser = user;
      bcrypt.compare(req.body.password, user.password).then((result) => {
        if (!result) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        res.status(200).json({
          message: "User logged in successfully",
        });
      });
    });
  });
  
  

  app.put('/user/edit', async (req, res) => {
    try {
      const { email, fullName, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(404).send('User not found');
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.updateOne({ email }, { fullName, password: hashedPassword });
      res.send('User updated successfully');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  

  app.delete('/user/delete', async (req, res) => {
    try {
      const { email } = req.body;
      const result = await User.deleteOne({ email });
      if (result.deletedCount === 0) return res.status(404).send('User not found');
      res.send('User deleted successfully');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  
  app.get('/user/getAll', async (req, res) => {
    try {
      const users = await User.find().select('-password'); 
      res.send(users);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  
  app.post('/user/uploadImage', upload.single('image'), async (req, res) => {
    try {
      if (!req.file) return res.status(400).send('No image uploaded');
      
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(404).send('User not found');
      const imagePath = req.file.path;
      
      console.log(`Image ${imagePath}`)
      res.send(`Image uploaded successfully: ${imagePath}`);
    } catch (error) {
      console.log(error.message)
      res.status(500).send(error.message);
    }
  });
  
  app.get('/user/images', (req, res) => {
    const imagesDirectory = path.join(__dirname, 'images'); 
  
    fs.readdir(imagesDirectory, (err, files) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Failed to list images');
      }
  
      const images = files.map(file => {
        return { url: `/images/${file}` }; 
      });
  
      res.json(images);
    });
  });