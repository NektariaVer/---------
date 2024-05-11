CREATE TABLE "user" (
                "firstname"	varchar(15) NOT NULL DEFAULT '',
                "lastname"	varchar(15) NOT NULL DEFAULT '',
                "academic_id"	varchar(7) PRIMARY KEY AUTOINCREMENT,
                "email"	varchar(20) DEFAULT '',
                "phone"	INTEGER DEFAULT '0000000000',
                "birthday"	date DEFAULT '01-01-0001',
                "gender"	varchar(7) DEFAULT '',
                "father"	varchar(15) DEFAULT '',
                "address"	varchar(25) DEFAULT '',
                "postcode"	INTEGER DEFAULT '0000',
                "id_num"	varchar(6) DEFAULT '',
                "hashedpassword"	varchar(50) DEFAULT 0
            );

CREATE TABLE "student" (
                "student_id"	varchar(7) NOT NULL DEFAULT '',
                "semester"	INTEGER NOT NULL DEFAULT 0,
                "fieldID"	varchar(3),
                "registration"	date DEFAULT '01-01-0001',
                FOREIGN KEY("fieldID") REFERENCES "field"("id") ON DELETE CASCADE ON UPDATE CASCADE,
                FOREIGN KEY("student_id") REFERENCES "user"("academic_id") ON UPDATE CASCADE ON DELETE CASCADE,
                PRIMARY KEY("student_id")
            );

CREATE TABLE "professor" (
                "specialization"	varchar(20) DEFAULT '',
                "id"	varchar(7) NOT NULL DEFAULT '',
                FOREIGN KEY("id") REFERENCES "user"("academic_id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "proffID_PK" PRIMARY KEY("id")
            );

CREATE TABLE "professor_teaches" (
                "prof_id"	varchar(7) NOT NULL DEFAULT '',
                "cycle_id"	varchar(7) NOT NULL DEFAULT '',
                FOREIGN KEY("prof_id") REFERENCES "professor"("id") ON DELETE CASCADE ON UPDATE CASCADE,
                FOREIGN KEY("cycle_id") REFERENCES "course_cycle"("id") ON DELETE CASCADE ON UPDATE CASCADE
            );

CREATE TABLE "course" (
                "id"	varchar(7) NOT NULL DEFAULT '',
                "name"	varchar(20) DEFAULT '',
                "credits"	INTEGER DEFAULT 0,
                "weight"	INTEGER DEFAULT 0,
                "fieldID" varchar(3) DEFAULT '000',
                "semester" INTEGER  DEFAULT '',
                CONSTRAINT "course_PK" PRIMARY KEY("id"),
                FOREIGN KEY("fieldID") REFERENCES "field"("id") ON DELETE CASCADE ON UPDATE CASCADE
            );

CREATE TABLE "course_cycle" (
                "semester"	INTEGER NOT NULL DEFAULT 0,
                "id"	varchar(7) NOT NULL DEFAULT 'Y00_000',
                "courseID"	varchar(3) NOT NULL DEFAULT 000,
                "academic_year"	INTEGER DEFAULT 0000,
                FOREIGN KEY("courseID") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "cycle_PK" PRIMARY KEY("id")
            );

 CREATE TABLE "student_takes_courses" (
                "stud_id"	varchar(7) NOT NULL DEFAULT '',
                "cycle_ID"	varchar(7) NOT NULL DEFAULT '',
                "state"	varchar(10) DEFAULT '',
                FOREIGN KEY("cycle_ID") REFERENCES "course_cycle"("id") ON DELETE CASCADE ON UPDATE CASCADE,
                FOREIGN KEY("stud_id") REFERENCES "student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE
            );

CREATE TABLE "grade" (
                "state"	varchar(10) DEFAULT '',
                "prof_ID"	varchar(7) NOT NULL DEFAULT '',
                "student_ID"	varchar(7) NOT NULL DEFAULT '',
                "coursecycle_ID"	varchar(7) DEFAULT 'Y00_000',
                FOREIGN KEY("student_ID") REFERENCES "student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE,
                FOREIGN KEY("prof_ID") REFERENCES "professor"("id") ON DELETE CASCADE ON UPDATE CASCADE,
                FOREIGN KEY("coursecycle_ID") REFERENCES "course_cycle"("id") ON DELETE CASCADE ON UPDATE CASCADE
            );

CREATE TABLE "field" (
                "name"	varchar(20),
                "id"	varchar(3) NOT NULL,
                CONSTRAINT "field_PK" PRIMARY KEY("id")
            );

CREATE TABLE "certificate" (
                "id"	varchar(7) NOT NULL DEFAULT '',
                "stud_ID"	varchar(7) NOT NULL DEFAULT '',
                "date"	date DEFAULT '00-00-0000',
                "type"	varchar(20) DEFAULT '',
                FOREIGN KEY("stud_ID") REFERENCES "student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE,
                PRIMARY KEY("id")
            );

