const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth.js");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 8;
const path = require("path");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const LocalStrategy = require("passport-local");
const findOrCreate = require("mongoose-findorcreate");
const PORT = process.env.PORT || 3002;
const app = express();
const jwt = require("jsonwebtoken");
const MongoStore = require("connect-mongo");

const secret_key = process.env.SECRET_KEY;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = process.env.MONGODB_KEY || process.env.SERVER_KEY;
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: MongoStore.create({
      mongoUrl: db,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

app.use("/auth", authRoute);

mongoose.connect(db);

mongoose.connection.on("connected", () => {
  console.log("secret mongoose connected ");
});

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  googleId: String,
  secret: [String],
});
userSchema.plugin(findOrCreate); 

const user = new mongoose.model("user", userSchema);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  user.findById(id, function (err, user) {
    done(err, user);
  });
});

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:3002/auth/google/callback", //cb to backend
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       const id = profile.id;
//       console.log(id);
//       user.findOrCreate(
//         {
//           googleId: profile.id,
//           username: profile.displayName,
//           email: profile.email,
//         },
//         function (err, user) {
//           return cb(err, user);
//         }
//       );
//     }
//   )
// );



app.post("/api/postSecret", (req, res) => {
  const secret = req.body.secret;
  const userId = req.body.id;
  user.findById(userId, (err, foundUser) => {
    // const addsec = foundUser.secret;
    foundUser.secret.push(secret);
    foundUser.save();
    res.send("yo");
  });
});

const verifyJWT = (req, res, next) => {
  const token = req.headers[x - access - token];
  console.log(token, "jwt verify token");
  if (!token) {
    res.send("we need token");
  } else {
    jwt.verify(token, secret_key, (err, decode) => {
      if (err) {
        res.json({ auth: false, message: "not auth" });
      } else {
        req.userId = decode.id;
        next();
      }
    });
  }
};
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.post("/api/delete", async (req, res) => {
  const secretz = req.body.secretIndex;
  const id = req.body.id;
  try {
    await user.updateOne({ _id: id }, { $pull: { secret: secretz } });
    res.send("profile deleted");
  } catch (error) {
    console.log(error);
  }
});
app.get("/api/isUserAuth", verifyJWT, (req, res) => {
  res.send("This user is Authenticated");
});

//login password compare 

app.post("/api/login", (req, res) => {
  const loginEmail = req.body.email;
  const loginPassword = req.body.password;


  user.findOne({ email: loginEmail }, (error, foundUser) => {
    if (error) {
      return console.log(error);
      
    } if (foundUser) {
          bcrypt.compare(
            loginPassword,
            foundUser.password,
            (error, response) => {
              if (response) {
                req.session.user = foundUser;
                const id = foundUser.id;
                const token = jwt.sign({ id }, secret_key, {
                  expiresIn: 86400,
                });

                res.json({ auth: true, token: token, result: foundUser }); // we are sending all the info change and send id
              }
            }
          );
        } else {
          res.send("not match")
        }
    
    
  });
});

app.get("/userdata", (req, res) => {
  user.find().then((foundUser) => res.json(foundUser));
});
// create a new user and save hash password
app.post("/api/user", (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    try {
      const userObj = {
        username: req.body.username,
        email: req.body.email,
        password: hash,
      };

      user.create(userObj, (err, item) => {
        if (err) {
          console.log(err);
        } else {
          item.save();
          res.send("profile saved");
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
if (process.env.NODE_ENV === "production") {
}

app.listen(PORT, (req, res) => {
  console.log(`server ${PORT} running`);
});
