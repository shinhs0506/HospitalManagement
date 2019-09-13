var express  = require("express"), server = express();
var bodyParser = require('body-parser');
server.use(bodyParser.json())
//use(bodyParser.urlencoded({ extended: false }))
var mysql = require('mysql');
const Promise = require('bluebird');
const HttpStatus = require('http-status-codes');
const fs = Promise.promisifyAll(require('fs'));
const Errors = require('./errors'); // my collection of custom exceptions

var con = mysql.createConnection({
  host: "cpsc304project.cgjfu2jm6dbw.us-east-2.rds.amazonaws.com",
  user: "shinhs0506",
  password: "abcd1234",
  database: "DoctorsAppointment"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
// routes get all Patients
server.get('/getPatients', (req,res) => {
var stuff_i_want = '';
    con.query("SELECT * FROM DoctorAppointment.Patients", function (err, result, fields) {
      if (err) {
        if (err instanceof Errors.BadRequest)
          return res.status(HttpStatus.BAD_REQUEST).send({ message: err.message }); // 400
        if (err instanceof Errors.Forbidden)
          return res.status(HttpStatus.FORBIDDEN).send({ message: err.message }); // 403
        if (err instanceof Errors.NotFound)
          return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
        if (err instanceof Errors.UnprocessableEntity)
          return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message }); // 422
            console.log(err);
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
      }
      else{
      console.log(result);
      res.send(result);}
  });

});

// ROUTER TO RETRIEVER ALL UPCOMING APPOINTMENTS FROM A SPECIFIC DOCTOR
server.get('/upcomingAppointmentsDoc', (req,res) => {
    var doctor_id= req.query.doctor_id;
    var query ="SELECT Patient.Pname, MeetAt.RoomNumber, MeetAt.ATID FROM MeetAt INNER JOIN Patient on MeetAt.PatientID = Patient.PID WHERE Patient.DID  = ? order by MeetAt.ATID";
    con.query(query, [doctor_id], function (err, result, fields) {
      if (err) {
        if (err instanceof Errors.BadRequest)
          return res.status(HttpStatus.BAD_REQUEST).send({ message: err.message }); // 400
        if (err instanceof Errors.Forbidden)
          return res.status(HttpStatus.FORBIDDEN).send({ message: err.message }); // 403
        if (err instanceof Errors.NotFound)
          return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
        if (err instanceof Errors.UnprocessableEntity)
          return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message }); // 422
            console.log(err);
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
      }
      else{
      console.log(result);
      res.send(result);}
  });

});
// ROUTER TO RETRIEVE ALL UNAVAILABLE TIMES OF A DOCTOR
server.get('/AllUnTimesDoc', (req,res) => {
  var doctor_id= req.query.doctor_id;
  var query = "SELECT DoctorUnavailable.UID, DoctorUnavailable.ATID FROM DoctorUnavailable WHERE DoctorUnavailable.DID = ?";
  // TODO: MODYFI THIS QUERY

  con.query(query, [doctor_id], function (err, result, fields) {
    if (err){
      if (err instanceof Errors.BadRequest)
        return res.status(HttpStatus.BAD_REQUEST).send({ message: err.message }); // 400
      if (err instanceof Errors.Forbidden)
        return res.status(HttpStatus.FORBIDDEN).send({ message: err.message }); // 403
      if (err instanceof Errors.NotFound)
        return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
      if (err instanceof Errors.UnprocessableEntity)
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message }); // 422
          console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
    }
    else{
    console.log(result);
    res.send(result);}
});

});
// get all available times
server.get('/AllTimesDoc', (req,res) => {
    var doctor_id= req.query.doctor_id;
    // TODO: MODYFI THIS QUERY
    var query= "SELECT * FROM AllTime WHERE AllTime.ATID NOT IN (SELECT d.ATID FROM DoctorUnavailable d where d.DID = ?) and AllTime.ATID NOT IN (select m.ATID from MeetAt m, Doctor d, Patient p where m.PatientID = p.PID and p.DID = d.DID and d.DID = ?) Order by AllTime.ATID";
      con.query(query,[doctor_id, doctor_id], function (err, result, fields) {
      if (err){
        if (err instanceof Errors.BadRequest)
          return res.status(HttpStatus.BAD_REQUEST).send({ message: err.message }); // 400
        if (err instanceof Errors.Forbidden)
          return res.status(HttpStatus.FORBIDDEN).send({ message: err.message }); // 403
        if (err instanceof Errors.NotFound)
          return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
        if (err instanceof Errors.UnprocessableEntity)
          return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message }); // 422
            console.log(err);
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
      }
      else{
      console.log(result);
      res.send(result);}
  });

});

//
// ROUTE TO CREATE  A NEW UNAVAILABLE date
//
server.post('/newUnDateDoc', (request,res)=>{
  // query = ADD FROM DoctorAppointment.DateUnavailable WHERE TTo = time_to AND TFrom = time_from;
  console.log("this is the body   "+ request.body.toString());
  var time_from = request.body.time_from.toString();
  var doc_id=request.body.doctor_id;
  var query="INSERT into DoctorUnavailable VALUES (NULL, ?, ?)";
  console.log("this is the query" + query);
  con.query(query, [time_from ,doc_id],function (err, result, fields) {
    if (err){
      if (err instanceof Errors.BadRequest)
        return res.status(HttpStatus.BAD_REQUEST).send({ message: err.message }); // 400
      if (err instanceof Errors.Forbidden)
        return res.status(HttpStatus.FORBIDDEN).send({ message: err.message }); // 403
      if (err instanceof Errors.NotFound)
        return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
      if (err instanceof Errors.UnprocessableEntity)
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message }); // 422
          console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
    }
    else{
    console.log(result);
    res.send(result);}
  });
});
// remove an unavailable date from doctors
server.post('/removeDate', (request,res)=>{

  console.log(request.body.time_id);
  var time_id= request.body.time_id.toString();
  console.log(time_id+ "gere");
  var query="DELETE from DoctorUnavailable WHERE UID ="+ time_id;
  console.log(query);
  con.query(query, function (err, result, fields) {
    if (err) {
      if (err instanceof Errors.BadRequest)
        return res.status(HttpStatus.BAD_REQUEST).send({ message: err.message }); // 400
      if (err instanceof Errors.Forbidden)
        return res.status(HttpStatus.FORBIDDEN).send({ message: err.message }); // 403
      if (err instanceof Errors.NotFound)
        return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
      if (err instanceof Errors.UnprocessableEntity)
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message }); // 422
          console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
    }
    else{
    console.log(result);
    res.send(result);}
});
});



// ROUTER TO ALL RECEPTIONIST PATIENTS APPOINMENTS
server.get('/allAppointmentsRecept', (req,res) => {
    var id= req.query.receptionist_id;
    // TODO: MODYFI THIS QUERY
    var query= "SELECT Patient.Pname, MeetAt.RoomNumber, MeetAt.ATID, Doctor.Dname FROM MeetAt INNER JOIN Patient on MeetAt.PatientID = Patient.PID INNER JOIN Doctor on Patient.DID = Doctor.DID WHERE Patient.RID = ? Order by MeetAt.ATID";
    con.query(query,[id], function (err, result, fields) {
      if (err){
        if (err instanceof Errors.BadRequest)
          return res.status(HttpStatus.BAD_REQUEST).send({ message: err.message }); // 400
        if (err instanceof Errors.Forbidden)
          return res.status(HttpStatus.FORBIDDEN).send({ message: err.message }); // 403
        if (err instanceof Errors.NotFound)
          return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
        if (err instanceof Errors.UnprocessableEntity)
          return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message }); // 422
            console.log(err);
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
      }
      else{
      console.log(result);
      res.send(result);}
  });

});
// ROTUER TO CREATE A NEW Doctor
server.post('/newDoctor', (request,res)=>{

  console.log(request.body);
  var name= request.body.doctor_name;
  var specialization= request.body.doctor_specs;
  var yrs = request.body.doctor_year;
  var address = request.body.doctor_address;
  var phoneNumber= request.body.doctor_contact;
  //var birthdate= request.body.doctor_birthdate;
  var query = "INSERT into Doctor VALUES (NULL, ? , ? , ?, ?, ?)";
  con.query(query,[name,address,specialization,yrs,phoneNumber], function (err, result, fields) {
    if (err) {
      if (err instanceof Errors.BadRequest)
        return res.status(HttpStatus.BAD_REQUEST).send({ message: err.message }); // 400
      if (err instanceof Errors.Forbidden)
        return res.status(HttpStatus.FORBIDDEN).send({ message: err.message }); // 403
      if (err instanceof Errors.NotFound)
        return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
      if (err instanceof Errors.UnprocessableEntity)
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message }); // 422
          console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
    }
    else{
    console.log(result);
    res.send(result);}
  });

  // insert query to remove the data
});

// ROTUER TO CREATE A NEW PATIENT with guard
server.post('/newPatientGuard', (request,res)=>{

  console.log(request.body);
  var name= request.body.patient_name;
  var address = request.body.patient_address;
  var phoneNumber= request.body.patient_contact;
  var birthdate= request.body.patient_bdate;
  // need to the query
  var Gname= request.body.guardian_name;
  var Gaddres = request.body.guardian_address;
  var guardian_contact= request.body.guardian_contact;
  var Gbirthdate= request.body.guardian_bdate;
  var doctor_id = request.body.doctor_id;
  var receptionist_id= request.body.receptionist_id;
  var query1= "  INSERT into Patient VALUES  (NULL, ?, ?, ?, ?, NULL, ?, ?, ?)";
  var query2=  "INSERT into Guardian VALUES (NULL,?, ?, ?, ?)";


  con.query(query2,[Gname,Gbirthdate,Gaddres,guardian_contact], function (err, result2, fields) {
    if (err) {
      if (err instanceof Errors.BadRequest)
        return res.status(HttpStatus.BAD_REQUEST).send({ message: err.message }); // 400
      if (err instanceof Errors.Forbidden)
        return res.status(HttpStatus.FORBIDDEN).send({ message: err.message }); // 403
      if (err instanceof Errors.NotFound)
        return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
      if (err instanceof Errors.UnprocessableEntity)
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message }); // 422
          console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
    }
    else{
        console.log("result query1 "+ result2);
        con.query(query1,[name,address, phoneNumber,birthdate,guardian_contact ,receptionist_id,doctor_id], function (err2, result, fields) {
        if (err2) {
          if (err2 instanceof Errors.BadRequest)
            return res.status(HttpStatus.BAD_REQUEST).send({ message: err.message }); // 400
          if (err2 instanceof Errors.Forbidden)
            return res.status(HttpStatus.FORBIDDEN).send({ message: err.message }); // 403
          if (err2 instanceof Errors.NotFound)
            return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
          if (err2 instanceof Errors.UnprocessableEntity)
            return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message }); // 422
              console.log(err2);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
        }
        else{
         console.log(result.toString() + "second query "+ result2.toString());
         res.send("success");}
      });
    }
  //

  });
});


//new patient with insurance
server.post('/newPatientInsurance', (request,res)=>{

  console.log(request.body);
  var patient_name= request.body.patient_name;
  var patient_address = request.body.patient_address;
  var patient_contact= request.body.patient_contact;
  var patient_bdate= request.body.patient_bdate;
  var insurance_id= request.body.insurance_id;
  var doctor_id = request.body.doctor_id;
  var receptionist_id= request.body.receptionist_id;
  var insurance_cost= request.body.insurance_cost;
  var query1= "  INSERT into Patient VALUES  (NULL, ?, ?, ?, ?, ?, NULL, ?, ?)";
      var query2=  "INSERT into Insurance VALUES   (?, ?)";
  con.query(query2,[insurance_id,insurance_cost], function (err, result2, fields) {

    if (err) {
      if (err instanceof Errors.BadRequest)
        return res.status(HttpStatus.BAD_REQUEST).send({ message: err.message }); // 400
      if (err instanceof Errors.Forbidden)
        return res.status(HttpStatus.FORBIDDEN).send({ message: err.message }); // 403
      if (err instanceof Errors.NotFound)
        return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
      if (err instanceof Errors.UnprocessableEntity)
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message }); // 422
          console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
    }
    else{

    con.query(query1,[patient_name,patient_address, patient_contact, patient_bdate,insurance_id, receptionist_id,doctor_id], function (err2, result, fields) {
        if (err2) {
          if (err2 instanceof Errors.BadRequest)
            return res.status(HttpStatus.BAD_REQUEST).send({ message: err.message }); // 400
          if (err2 instanceof Errors.Forbidden)
            return res.status(HttpStatus.FORBIDDEN).send({ message: err.message }); // 403
          if (err2 instanceof Errors.NotFound)
            return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
          if (err2 instanceof Errors.UnprocessableEntity)
            return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message }); // 422
              console.log(err2);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
        }
      });
          //console.log(result + "second query "+ result2);
          res.send("success");
    }


  });
});
// return all appoinment from  a patient
server.get('/allAppointmentsPat', (req,res) => {
    var patient_id= req.query.patient_id;
    // TODO: MODYFI THIS QUERY
    var query="SELECT Doctor.Dname, AllTime.Tfrom, MeetAt.RoomNumber FROM Patient INNER JOIN Doctor on Patient.DID = Doctor.DID INNER JOIN MeetAt on Patient.PID = MeetAt.PatientID INNER JOIN AllTime on MeetAt.ATID = AllTime.ATID WHERE Patient.PID = ? Order by MeetAt.ATID";
      con.query(query,[patient_id], function (err, result, fields) {
      if (err){
        if (err instanceof Errors.BadRequest)
          return res.status(HttpStatus.BAD_REQUEST).send({ message: err.message }); // 400
        if (err instanceof Errors.Forbidden)
          return res.status(HttpStatus.FORBIDDEN).send({ message: err.message }); // 403
        if (err instanceof Errors.NotFound)
          return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
        if (err instanceof Errors.UnprocessableEntity)
          return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message }); // 422
            console.log(err);
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
      }
      else{
      console.log(result);
      res.send(result);}
  });

});



/// update patient information for underage
server.post('/updatePatunder', (request,res)=>{

  console.log(request.body);
  var name= request.body.patient_name.toString();
  var address = request.body.patient_address.toString();
  var phoneNumber= request.body.patient_phoneNumber.toString();
  var birthdate= "1998-06-01";
  // need to the query
  var patient_id= request.body.patient_id;
  var Gname= request.body.guardian_name.toString();
  var Gaddres = request.body.guardian_address.toString();
  var GphoneNumber= request.body.guardian_number.toString();
  var Gbirthdate= "1998-06-11";
  // send appropiate query with this  info

  var query ="UPDATE DoctorAppointment.Patients SET Pname = ? , PAddress = ? ,PContact = ? , PBdate = ? WHERE PID = ?";

  console.log("quer is"+ query);
  con.query(query,[name,address,phoneNumber,birthdate,patient_id], function (err, result, fields) {
    if (err){
      if (err instanceof Errors.BadRequest)
        return res.status(HttpStatus.BAD_REQUEST).send({ message: err.message }); // 400
      if (err instanceof Errors.Forbidden)
        return res.status(HttpStatus.FORBIDDEN).send({ message: err.message }); // 403
      if (err instanceof Errors.NotFound)
        return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
      if (err instanceof Errors.UnprocessableEntity)
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message }); // 422
          console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
    }
    else{
    console.log(result);
    res.send(result);}
  });

});

// return receptionist from patient id
server.get('/getRecept', (req,res) => {
    var patient_id= req.query.patient_id;
    var query="SELECT Receptionist.Rname, Receptionist.Rcontact FROM Patient INNER JOIN Receptionist on Patient.RID = Receptionist.RID WHERE Patient.PID = ?"

    console.log("bid data comming " + patient_id);
    // TODO: MODYFI THIS QUERY
    con.query(query,[patient_id] , function (err, result, fields) {
      if (err){
        if (err instanceof Errors.BadRequest)
          return res.status(HttpStatus.BAD_REQUEST).send({ message: err.message }); // 400
        if (err instanceof Errors.Forbidden)
          return res.status(HttpStatus.FORBIDDEN).send({ message: err.message }); // 403
        if (err instanceof Errors.NotFound)
          return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
        if (err instanceof Errors.UnprocessableEntity)
          return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message }); // 422
            console.log(err);
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
      }
      else{
      console.log(result);
      res.send(result);}
  });

});

// return patient information from patient id
server.get('/getPatient', (req,res) => {
    var patient_id= req.query.patient_id;
    var query="Select Patient.Pname, Patient.Paddress, Patient.Pcontact FROM Patient WHERE Patient.PID = ?"

    console.log("bid data comming " + patient_id);
    // TODO: MODYFI THIS QUERY
    con.query(query,[patient_id] , function (err, result, fields) {
      if (err){
        if (err instanceof Errors.BadRequest)
          return res.status(HttpStatus.BAD_REQUEST).send({ message: err.message }); // 400
        if (err instanceof Errors.Forbidden)
          return res.status(HttpStatus.FORBIDDEN).send({ message: err.message }); // 403
        if (err instanceof Errors.NotFound)
          return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
        if (err instanceof Errors.UnprocessableEntity)
          return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message }); // 422
            console.log(err);
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
      }
      console.log(result);
      res.send(result);
  });

});
// return patient information from patient id
server.get('/getAvailability', (req,res) => {
    var patient_id= req.query.patient_id;
    var query="select a.ATID, a.Tfrom from AllTime a where a.ATID not in (select du.ATID from DoctorUnavailable du, Patient p where p.DID = du.DID and p.PID = ?) and a.ATID not in (select m.ATID from MeetAt m where m.PatientID = ?) and a.ATID not in (select m.ATID from MeetAt m, Patient p where m.PatientID = p.PID and p.DID in (select pa.DID from Patient pa where pa.PID = ?))";

    console.log("bid data comming " + patient_id);
    // TODO: MODYFI THIS QUERY
    con.query(query,[patient_id, patient_id, patient_id] , function (err, result, fields) {
      if (err){
        if (err instanceof Errors.BadRequest)
          return res.status(HttpStatus.BAD_REQUEST).send({ message: err.message }); // 400
        if (err instanceof Errors.Forbidden)
          return res.status(HttpStatus.FORBIDDEN).send({ message: err.message }); // 403
        if (err instanceof Errors.NotFound)
          return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
        if (err instanceof Errors.UnprocessableEntity)
          return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message }); // 422
            console.log(err);
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
      }
      else{
      console.log(result);
      res.send(result);}
  });

});
/// create a new appoinment
server.post('/newAppointment', (request,res)=>{

  console.log(request.body);
  var time_from= request.body.time_from.toString();
  // need to the query
  var patient_id= request.body.patient_id.toString();

  // send appropiate query with this  info

  var query ="insert into MeetAt values (?, (select min(Rnumber) from Room where Rnumber not in (select m.RoomNumber from MeetAt m where m.ATID = ?)), ?) ";

  console.log("quer is"+ query);
  con.query(query,[patient_id,time_from, time_from], function (err, result, fields) {
    if (err){
      if (err instanceof Errors.BadRequest)
        return res.status(HttpStatus.BAD_REQUEST).send({ message: err.message }); // 400
      if (err instanceof Errors.Forbidden)
        return res.status(HttpStatus.FORBIDDEN).send({ message: err.message }); // 403
      if (err instanceof Errors.NotFound)
        return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
      if (err instanceof Errors.UnprocessableEntity)
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message }); // 422
          console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
    }
    else{
    console.log(result);
    res.send(result);}
  });

});


// update information of a patient post request
server.post('/updatePatient', (request,res)=>{

  console.log(request.body);
  var patient_contact= request.body.patient_contact.toString();
  var patient_name= request.body.patient_name.toString();
  var patient_address = request.body.patient_address.toString();
  var patient_id= request.body.patient_id;
  // send appropiate query with this  info

  var query ="Update Patient Set  Patient.Paddress = ?, Patient.Pcontact = ?, Patient.Pname = ?  Where Patient.PID = ?";

  console.log("quer is"+ query);
  con.query(query,[patient_address,patient_contact,patient_name,patient_id], function (err, result, fields) {
    if (err){
      if (err instanceof Errors.BadRequest)
        return res.status(HttpStatus.BAD_REQUEST).send({ message: err.message }); // 400
      if (err instanceof Errors.Forbidden)
        return res.status(HttpStatus.FORBIDDEN).send({ message: err.message }); // 403
      if (err instanceof Errors.NotFound)
        return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
      if (err instanceof Errors.UnprocessableEntity)
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message }); // 422
          console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
    }
    else{
    res.send(result);}
  });

});


/// get all the doctors and patoents

server.get('/getDoctorsPatients', (req,res) => {
  var query ="(select d.DID, d.Dname, d.Dspec, COUNT(*) as NumPatients from Patient p, Doctor d where p.DID = d.DID group by d.DID, d.Dname, d.Dspec) union  (select d.DID, d.Dname, d.Dspec, 0 from Doctor d where d.DID not in (select d.DID from Patient p, Doctor d where p.DID = d.DID))";

  console.log("quer is"+ query);
  con.query(query, function (err, result, fields) {
      if (err){
      if (err instanceof Errors.BadRequest)
        return res.status(HttpStatus.BAD_REQUEST).send({ message: err.message }); // 400
      if (err instanceof Errors.Forbidden)
        return res.status(HttpStatus.FORBIDDEN).send({ message: err.message }); // 403
      if (err instanceof Errors.NotFound)
        return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
      if (err instanceof Errors.UnprocessableEntity)
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message }); // 422
          console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
      }
      else{
      console.log(result);
      res.send(result);}
  });

});
/// get  the peak hours in the hospital

server.get('/getPeakHour', (req,res) => {
  var query ="Select DoctorsAppointment.AllTime.TFrom From DoctorsAppointment.AllTime Where not exists (Select * from DoctorsAppointment.DoctorUnavailable Where not exists (Select DoctorsAppointment.Doctor.DID From DoctorsAppointment.Doctor, DoctorsAppointment.MeetAt Where DoctorsAppointment.AllTime.ATID != DoctorsAppointment.DoctorUnavailable.ATID And  DoctorsAppointment.AllTime.ATID != DoctorsAppointment.MeetAt.ATID And DoctorsAppointment.Doctor.DID = DoctorsAppointment.DoctorUnavailable.DID))";
  console.log("quer is"+ query);
  con.query(query, function (err, result, fields) {
      if (err){
      if (err instanceof Errors.BadRequest)
        return res.status(HttpStatus.BAD_REQUEST).send({ message: err.message }); // 400
      if (err instanceof Errors.Forbidden)
        return res.status(HttpStatus.FORBIDDEN).send({ message: err.message }); // 403
      if (err instanceof Errors.NotFound)
        return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
      if (err instanceof Errors.UnprocessableEntity)
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message }); // 422
          console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
      }
      else{
      console.log(result);
      res.send(result);}
  });

});

/// get  the peak hours in the hospital

server.get('/DoctorsVacation', (req,res) => {
  var query ="Select DoctorsAppointment.AllTime.TFrom From DoctorsAppointment.AllTime Where not exists (Select * from DoctorsAppointment.DoctorUnavailable Where not exists (Select DoctorsAppointment.Doctor.DID, AllTime.ATID From DoctorsAppointment.Doctor Where DoctorsAppointment.AllTime.ATID = DoctorsAppointment.DoctorUnavailable.ATID And DoctorsAppointment.Doctor.DID = DoctorsAppointment.DoctorUnavailable.DID))";
  console.log("quer is"+ query);
  con.query(query, function (err, result, fields) {
      if (err){
      if (err instanceof Errors.BadRequest)
        return res.status(HttpStatus.BAD_REQUEST).send({ message: err.message }); // 400
      if (err instanceof Errors.Forbidden)
        return res.status(HttpStatus.FORBIDDEN).send({ message: err.message }); // 403
      if (err instanceof Errors.NotFound)
        return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
      if (err instanceof Errors.UnprocessableEntity)
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message }); // 422
          console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
      }
      else{
      console.log(result);
      res.send(result);}
  });

});








// get all doctors
server.get('/getDoctors', (req,res) => {
var stuff_i_want = '';
    con.query("SELECT * FROM DoctorAppointment.Patients", function (err, result, fields) {
      if (err){
        if (err instanceof Errors.BadRequest)
          return res.status(HttpStatus.BAD_REQUEST).send({ message: err.message }); // 400
        if (err instanceof Errors.Forbidden)
          return res.status(HttpStatus.FORBIDDEN).send({ message: err.message }); // 403
        if (err instanceof Errors.NotFound)
          return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
        if (err instanceof Errors.UnprocessableEntity)
          return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message }); // 422
            console.log(err);
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
      }
      else{
      console.log(result);
      res.send(result);}
  });

});
// get all rooms at one time;
server.get('/getRooms', (req,res) => {
var time = req.query.time;
    con.query("SELECT * FROM DoctorAppointment.Patients", function (err, result, fields) {
      if (err){
      if (err instanceof Errors.BadRequest)
        return res.status(HttpStatus.BAD_REQUEST).send({ message: err.message }); // 400
      if (err instanceof Errors.Forbidden)
        return res.status(HttpStatus.FORBIDDEN).send({ message: err.message }); // 403
      if (err instanceof Errors.NotFound)
        return res.status(HttpStatus.NOT_FOUND).send({ message: err.message }); // 404
      if (err instanceof Errors.UnprocessableEntity)
        return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send({ message: err.message }); // 422
          console.log(err);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ error: err, message: err.message });
      }
      else{
      console.log(result);
      res.send(result);}
  });

});




server.get('*', (req,res) => {

res.end("not valid");

// connect to the db and return information for login information
});
server.post('*', (req,res) => {

res.end("not valid");

// connect to the db and return information for login information
});
server.listen(3000, function() {
  console.log("server listening to port 3000");
});
