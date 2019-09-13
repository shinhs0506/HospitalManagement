use DoctorsAppointment;

DROP TABLE IF EXISTS DoctorUnavailable;
DROP TABLE IF EXISTS Nurse;
DROP TABLE IF EXISTS NurseTypeColor;
DROP TABLE IF EXISTS Department;

DROP TABLE IF EXISTS MeetAt;

DROP TABLE IF EXISTS Patient;

DROP TABLE IF EXISTS Insurance;
DROP TABLE IF EXISTS Guardian;
DROP TABLE IF EXISTS Receptionist;
DROP TABLE IF EXISTS AllTime;
DROP TABLE IF EXISTS Doctor;
DROP TABLE IF EXISTS DoctorNumPatients;
DROP TABLE IF EXISTS Room;



CREATE TABLE IF NOT EXISTS AllTime(
ATID char(30) PRIMARY KEY,
Tfrom char(30)
);

CREATE TABLE IF NOT EXISTS DoctorNumPatients(
yearOfExperience int primary key,
numOfPatients int NOT NULL
);

CREATE TABLE IF NOT EXISTS Doctor(
DID int PRIMARY KEY AUTO_INCREMENT,
Dname char(30) NOT NULL,
Daddress char(50) NOT NULL,
Dspec char(20) NOT NULL,
Dexperience int NOT NULL,
Dcontact char(20) UNIQUE NOT NULL,
FOREIGN KEY (DExperience) references DoctorNumPatients (yearOfExperience)
);

CREATE TABLE IF NOT EXISTS DoctorUnavailable(
UID int PRIMARY KEY AUTO_INCREMENT,
ATID char(30) NOT NULL,
DID int NOT NULL,
FOREIGN KEY (ATID) references AllTime (ATID),
FOREIGN KEY (DID) references Doctor (DID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Receptionist(
RID int PRIMARY KEY AUTO_INCREMENT,
Rname char(30) NOT NULL,
Rcontact char(30) NOT NULL,
Raddress char(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS NurseTypeColor(
NType char(30) PRIMARY KEY,
Color char(20) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS Nurse(
Nname char(30) NOT NULL,
Ncontact char(20) NOT NULL,
Naddress char(50) NOT NULL,
Nspecialization char(30) NOT NULL,
DID int,
PRIMARY KEY (Nname, DID),
FOREIGN KEY (Nspecialization) references NurseTypeColor (NType),
FOREIGN KEY (DID) references Doctor (DID)
);


CREATE TABLE IF NOT EXISTS Guardian(
GID int PRIMARY KEY AUTO_INCREMENT,
Gname char(30) NOT NULL,
GBdate char(30) NOT NULL,
Gaddress char(50) NOT NULL,
Gcontact char(20) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS Insurance(
InsuranceID int PRIMARY KEY,
Cost int NOT NULL
);

CREATE TABLE IF NOT EXISTS Department(
DepID int PRIMARY KEY AUTO_INCREMENT,
Office char(50) NOT NULL,
DPaddress char(50) NOT NULL,
Dcontact char(30) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS Room(
Rnumber int PRIMARY KEY,
RLocation char(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS Patient(
PID int PRIMARY KEY AUTO_INCREMENT,
Pname char(30) NOT NULL,
Paddress char(50) NOT NULL,
Pcontact char(20) NOT NULL,
PBdate char(30) NOT NULL,
IID int UNIQUE,
Gcontact char(30),
RID int NOT NULL,
DID int NOT NULL,
FOREIGN KEY (RID) references Receptionist (RID),
FOREIGN KEY (DID) references Doctor (DID),
FOREIGN KEY (Gcontact) references Guardian(Gcontact),
FOREIGN KEY (IID) references Insurance (InsuranceID)
);
 

CREATE TABLE IF NOT EXISTS MeetAt(
PatientID int,
RoomNumber int,
ATID char(30),
FOREIGN KEY (PatientID) references Patient (PID) on DELETE CASCADE,
FOREIGN KEY (RoomNumber) references Room (Rnumber),
FOREIGN KEY (ATID) references AllTime (ATID),
PRIMARY KEY (PatientID, RoomNumber, ATID)
);



commit;

INSERT INTO Room VALUES
(221, 'A-BUILDING'),
(310, 'B-BUILDING'),
(150, 'C-BUILDING'),
(402, 'A-BUILDING'),
(220, 'B-BUILDING');

INSERT INTO DoctorNumPatients VALUES
	(1,3),
	(2,3),
(3,4),
(4,5),
(5,6);

INSERT INTO Doctor VALUES
(NULL, 'Max Albert', '1923 Hasting Street Vancouver', 'Allergy & immunology',  1, '778-827-1092'),
(NULL, 'Benjamin Winks', '481 Main Street Vancouver', 'Anesthesiology', 3, '778-412-1422'
),(NULL, 'Joshua Depay', '1522 Robson Street Vancouver', 'Allergy', 2, '778-533-1010'
),(NULL, 'Alan Thomas', '5211 Cameron Street Burnaby', 'Cardiology', 4, '778-688-6008'
),(NULL, 'Terry Schmidt', '5987 Granville Street Vancouver', 'Addiction', 1, '778-015-1100'
);


INSERT INTO AllTime VALUES
         ('2019070109','2019070109'),
         ('2019070110','2019070110'),
         ('2019070111','2019070111'),
         ('2019070112','2019070112'),
         ('2019070113','2019070113'),
         ('2019070114','2019070114'),
         ('2019070115','2019070115'),
         ('2019070116','2019070116'),
         ('2019070117','2019070117'),
         ('2019070209','2019070209'),
         ('2019070210','2019070210'),
         ('2019070211','2019070211'),
         ('2019070212','2019070212'),
         ('2019070213','2019070213'),
         ('2019070214','2019070214'),
         ('2019070215','2019070215'),
         ('2019070216','2019070216'),
         ('2019070217','2019070217'),
         ('2019070309','2019070309'),
         ('2019070310','2019070310'),
         ('2019070311','2019070311'),
         ('2019070312','2019070312'),
         ('2019070313','2019070313'),
         ('2019070314','2019070314'),
         ('2019070315','2019070315'),
         ('2019070316','2019070316'),
         ('2019070317','2019070317'),
         ('2019070409','2019070409'),
         ('2019070410','2019070410'),
         ('2019070411','2019070411'),
         ('2019070412','2019070412'),
         ('2019070413','2019070413'),
         ('2019070414','2019070414'),
         ('2019070415','2019070415'),
         ('2019070416','2019070416'),
         ('2019070417','2019070417'),
         ('2019070509','2019070509'),
         ('2019070510','2019070510'),
         ('2019070511','2019070511'),
         ('2019070512','2019070512'),
         ('2019070513','2019070513'),
         ('2019070514','2019070514'),
         ('2019070515','2019070515'),
         ('2019070516','2019070516'),
         ('2019070517','2019070517');
         


INSERT INTO Receptionist VALUES
(NULL, 'Ellen Baker', '778-122-4857', '1304 Smithe Street Vancouver'),
(NULL, 'Claire Trippier', '604-543-9821', '983 Rupert Street Vancouver'),
(NULL, 'Alex Son', '778-483-0813', '952 Haro Street Vancouver'),
(NULL, 'Jessica Carlos', '604-384-9761', '212 VCC Street Coquitlam'),
(NULL, 'Julian Creps', '604-533-1502', '152 Rupert Street Vancouver');

INSERT INTO Insurance VALUES 
(5123, 400),
(1232, 600),
(26001, 700),
(1522, 100),
(603912, 400);

INSERT INTO Guardian VALUES
( NULL, 'Asher Conroy', '1970-12-30', '1922 Thurlow Street Vancouver', '778-394-5911'),
( NULL, 'Kofi Anderson', '1968-05-21', '6948 Howe Street Vancouver', '604-394-3493'),
( NULL, 'Lilly-Grace Moyer', '1980-01-01', '3484 Granville Street Vancouver', '604-948-0849'),
( NULL, 'Rhianne Bond', '1966-09-11', '432 12th Ave Vancouver', '604-422-8080'),
( NULL, 'Devonte Cannon', '1980-10-21', '533 10th Ave Vancouver', '604-122-5965');

INSERT INTO Patient VALUES
(NULL, 'John Peterson', '5120 Georgia Street Vancouver', '778-243-1109', '1966-02-01',1232, NULL,1,1
),
(NULL, 'Bernard James', '4532 Burrard Street Vancouver', '778-253-1022', '2000-05-06'
,NULL, '778-394-5911' ,2,2),
(NULL, 'Clayton Douglas', '9987 Robson Street Vancouver', '778-299-0012', '1966-02-01',26001, NULL,3,3
),
(NULL, 'Eve Sandoval', '1522 Granville Street Vancouver', '778-458-1002', '2000-05-06'
,NULL, '604-394-3493' ,4,4),
(NULL, 'Zahra Gregory', '5120 Cameron Street Burnaby', '778-010-9368', '1966-02-01',1522, NULL,5,5
);


INSERT INTO MeetAt VALUES
(1, 221, '2019070110'),
(2, 310, '2019070110'),
(3, 150, '2019070110'),
(4, 150, '2019070111'),
(5, 220, '2019070110');


INSERT INTO Department VALUES 
(NULL, 'Room #304, directly across from the males washroom', '1556 BroadWay Street Vancouver', '778-311-2302'
), 
(NULL, 'Room #2111, near the main elevator', '1557 BroadWay Street Vancouver', '778-311-4022'
),(NULL, 'Room #1020, behind the males washroom', '1556 BroadWay Street Vancouver', '778-311-5022'
),(NULL, 'Room #304, by the side stairs', '1557 BroadWay Street Vancouver', '778-311-2522'
),(NULL, 'Room #102, across from the main elevator', '1557 BroadWay Street Vancouver', '778-311-5002'
);


INSERT INTO NurseTypeColor VALUES
('Registered Nurse', 'White'),
('Emergency Room Nurse', 'Purple'),
('Operating Room Nurse', 'Green'),
('Nurse practitioner', 'Blue'),
('Licensed Practical Nurse', 'Brown');



INSERT INTO Nurse VALUES
('Jenny Alexis', '778-314-2211', '1882 Main Street Vancouver', 'Registered Nurse', 1),
('Bilaal Duffy', '778-593-0158', '4987 Howe Street Vancouver', 'Emergency Room Nurse', 2),
('Maximus Smyth', '778-483-9915', '1882 Kingsway Street Burnaby', 'Operating Room Nurse', 3),
('Pauline Kott', '604-155-2742', '1882 Turott Street Vancouver', 'Nurse practitioner', 4),
('Chase Bryd', '604-731-9641', '1882 UBC street Vancouver', 'Licensed Practical Nurse', 5);

INSERT INTO DoctorUnavailable VALUES
(NULL, '2019070109',1),
(NULL, '2019070109', 2),
(NULL, '2019070109',3),
(NULL, '2019070109', 4),
(NULL, '2019070109', 5);
