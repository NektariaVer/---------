CREATE TABLE "user" (
                "firstname"	varchar(15) NOT NULL DEFAULT '',
                "lastname"	varchar(15) NOT NULL DEFAULT '',
                "academic_id"	varchar(7) NOT NULL DEFAULT NULL,
                "email"	varchar(20) DEFAULT '',
                "phone"	INTEGER DEFAULT '0000000000',
                "birthday"	date DEFAULT '01-01-0001',
                "gender"	varchar(7) DEFAULT '',
                "father"	varchar(15) DEFAULT '',
                "address"	varchar(25) DEFAULT '',
                "postcode"	INTEGER DEFAULT '0000',
                "id_num"	varchar(6) DEFAULT '',
                "hashedpassword"	varchar(50) DEFAULT 0,
                PRIMARY KEY("academic_id")
            );
