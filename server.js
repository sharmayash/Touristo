const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");

const app = express();

// middlewares

app.set("view engine", "ejs");
app.set("views", __dirname + "/views/");

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(
  "mongodb+srv://yash1:yash1234@cluster0-scoen.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

// ---- multer specs -----

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Image File Not Allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  limit: {
    fileSize: 1024 * 1024 * 10 // 10 mb
  },
  fileFilter: fileFilter
});

//----- importing database models -----

const Transport = require("./models/Transport");
const Driver = require("./models/Driver");
const Company = require("./models/Company");
const Vehicle = require("./models/Vehicle");
const Booking = require("./models/Booking");

//---------- get routes -----------

app.get("/", (req, res) => {
  Vehicle.find({}, (err1, vehicles) => {
    if (err1) console.log(err1);

    Driver.find({}, (err2, drivers) => {
      if (err2) console.log(err2);

      res.render("index", { allDrivers: drivers, allVehicles: vehicles });
    });
  });
});

app.get("/addCompany", (req, res) => {
  Company.find({}, (err, companies) => {
    if (err) console.log(err);

    res.render("addCompany", { companies: companies });
  });
});

app.get("/addDriver", (req, res) => {
  Driver.find({}, (err, drivers) => {
    if (err) console.log(err);

    res.render("addDriver", { drivers: drivers });
  });
});

app.get("/addTransport", (req, res) => {
  Transport.find({}, (err, transports) => {
    if (err) console.log(err);
    Vehicle.find({}, (err, vehicles) => {
      if (err) console.log(err);

      res.render("addTransport", {
        transports: transports,
        vehicles: vehicles
      });
    });
  });
});

app.get("/allBookings", (req, res) => {
  Booking.find({}, (err, bookings) => {
    if (err) console.log(err);

    res.render("allBookings", { bookings: bookings });
  });
});

// ---------- post routes---------

app.post("/newBooking", (req, res) => {
  let {
    name,
    customerNo,
    address,
    details,
    bookie,
    bookiePhNo,
    driverName,
    vehicleName,
    rate,
    meterReading1,
    meterReading2,
    totalReading,
    departureDate,
    departureTime,
    arrivalDate,
    arrivalTime,
    days,
    night,
    totalAmount,
    advance,
    balance
  } = req.body;

  let newBooking = {
    customerName: name,
    customerNo,
    address,
    details,
    bookie,
    bookiePhNo,
    driverName,
    vehicleName,
    rate,
    meterReading1,
    meterReading2,
    totalReading,
    departureDate,
    departureTime,
    arrivalDate,
    arrivalTime,
    days,
    night,
    totalAmount,
    advance,
    balance
  };

  Booking.create(newBooking, (err, newBooking) => {
    if (err) console.log(err);

    Vehicle.find({}, (err1, vehicles) => {
      if (err1) console.log(err1);

      Driver.find({}, (err2, drivers) => {
        if (err2) console.log(err2);

        res.render("index", { allDrivers: drivers, allVehicles: vehicles });
      });
    });
  });
});

app.post("/addCompany", upload.single("logo"), (req, res) => {
  let { companyName, founderName, email, phone, gst } = req.body;

  let newCompany = {
    name: companyName,
    founderName,
    email,
    contactNo: phone,
    gstin: gst,
    logo: req.file.path.slice(6)
  };

  Company.create(newCompany, (err, newCompany) => {
    if (err) console.log(err);

    Company.find({}, (err, companies) => {
      if (err) console.log(err);

      res.render("addCompany", { companies: companies });
    });
  });
});

app.post("/addDriver", (req, res) => {
  let { driverName, phone, email, licenceNo, dob } = req.body;

  let newDriver = {
    name: driverName,
    contactNo: phone,
    email,
    licenceNo,
    dob
  };

  Driver.create(newDriver, (err, newDriver) => {
    if (err) console.log(err);

    Driver.find({}, (err, drivers) => {
      if (err) console.log(err);

      res.render("addDriver", { drivers: drivers });
    });
  });
});

app.post("/addTransport", (req, res) => {
  let { transport } = req.body;

  Transport.create({ transportName: transport }, (err, newTransport) => {
    if (err) console.log(err);

    Transport.find({}, (err, transports) => {
      if (err) console.log(err);
      Vehicle.find({}, (err, vehicles) => {
        if (err) console.log(err);

        res.render("addTransport", {
          transports: transports,
          vehicles: vehicles
        });
      });
    });
  });
});

app.post("/addVehicle", (req, res) => {
  let { vehicleType, vehicleName, vehicleNumber } = req.body;

  let newVehicle = {
    vehicleType,
    name: vehicleName,
    number: vehicleNumber
  };

  Vehicle.create(newVehicle, (err, newVehicle) => {
    if (err) console.log(err);

    Transport.find({}, (err, transports) => {
      if (err) console.log(err);
      Vehicle.find({}, (err, vehicles) => {
        if (err) console.log(err);

        res.render("addTransport", {
          transports: transports,
          vehicles: vehicles
        });
      });
    });
  });
});

app.listen(1200, err => {
  if (err) res.send(err);

  console.log("Server Started on PORT 1200");
});
