import sqlite3


class StudentServicesDatabase:
    def __init__(self, db_name='student_services.db'):
        self.db_name = db_name
        self.conn = None
        self.cursor = None

    def connect(self):
        try:
            self.conn = sqlite3.connect(self.db_name)
            self.cursor = self.conn.cursor()
            print(f"Connected to database: {self.db_name}")
        except sqlite3.Error as e:
            print(f"Error connecting to database: {e}")
            raise

    def disconnect(self):
        if self.conn:
            try:
                self.conn.commit()
                self.conn.close()
                print("Disconnected from the database")
            except sqlite3.Error as e:
                print(f"Error disconnecting from the database: {e}")

    def execute_query(self, query):
        try:
            self.cursor.execute(query)
        except sqlite3.Error as e:
            print(f"Error executing query: {e}")
            raise

    def create_tables(self):
        try:
            self.connect()

            # Create user table
            self.execute_query('''
            CREATE TABLE "user" (
                "firstname"	varchar(15) NOT NULL DEFAULT '',
                "lastname"	varchar(15) NOT NULL DEFAULT '',
                "academic_id"	varchar(7) NOT NULL DEFAULT NULL,
                "email"	varchar(30) DEFAULT '',
                "phone"	varchar(10) DEFAULT '',
                "birthday"	date DEFAULT '01-01-0001',
                "gender"	varchar(7) DEFAULT '',
                "father"	varchar(15) DEFAULT '',
                "address"	varchar(30) DEFAULT '',
                "postcode"	INTEGER DEFAULT '',
                "id_num"	varchar(6) DEFAULT '',
                "password"	varchar(80) DEFAULT 0,
                PRIMARY KEY("academic_id")
            );
            ''')

            # Create field table
            self.execute_query('''
            CREATE TABLE "field" (
                "name"	varchar(40),
                "id"	varchar(3) NOT NULL,
                CONSTRAINT "field_PK" PRIMARY KEY("id")
            );
            ''')

            # Create student table
            self.execute_query('''
            CREATE TABLE "student" (
                "student_id"	varchar(7) NOT NULL DEFAULT '',
                "semester"	INTEGER NOT NULL DEFAULT 0,
                "semester_date" date DEFAULT '00-00-0000',
                "fieldID"	varchar(3),
                "registration"	date DEFAULT '00-00-0000',
                FOREIGN KEY("fieldID") REFERENCES "field"("id") ON DELETE CASCADE ON UPDATE CASCADE,
                FOREIGN KEY("student_id") REFERENCES "user"("academic_id") ON UPDATE CASCADE ON DELETE CASCADE,
                PRIMARY KEY("student_id")
            );
            ''')
            
            # Create course table
            self.execute_query('''
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
            ''')

            # Create student_takes_courses table
            self.execute_query('''
            CREATE TABLE "student_takes_courses" (
                "stud_id"	varchar(7) NOT NULL DEFAULT '',
                "course_ID"	varchar(7) NOT NULL DEFAULT '',
                "grade" varchar(4) DEFAULT '',
                "academic_year"	varchar(9) DEFAULT '',
                FOREIGN KEY("course_ID") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE,
                FOREIGN KEY("stud_id") REFERENCES "student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE
            );
            ''')

            # Create certificate table
            self.execute_query('''
            CREATE TABLE "certificate" (
                "id"	varchar(7) NOT NULL DEFAULT '',
                "stud_ID"	varchar(7) NOT NULL DEFAULT '',
                "date"	date DEFAULT '00-00-0000',
                "type"	varchar(20) DEFAULT '',
                FOREIGN KEY("stud_ID") REFERENCES "student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE,
                PRIMARY KEY("id")
            );
            ''')
            ################################################################
            # Create course_cycle table
            self.execute_query('''
            CREATE TABLE "course_cycle" (
                "semester"	INTEGER NOT NULL DEFAULT 0,
                "id"	varchar(7) NOT NULL DEFAULT 'Y00_000',
                "courseID"	varchar(3) NOT NULL DEFAULT 000,
                "academic_year"	INTEGER DEFAULT 0000,
                FOREIGN KEY("courseID") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "cycle_PK" PRIMARY KEY("id")
            );
            ''')

            # Create professor table
            self.execute_query('''
            CREATE TABLE "professor" (
                "specialization"	varchar(20) DEFAULT '',
                "id"	varchar(7) NOT NULL DEFAULT '',
                FOREIGN KEY("id") REFERENCES "user"("academic_id") ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT "proffID_PK" PRIMARY KEY("id")
            );
            ''')

            # Create professor_teaches table
            self.execute_query('''
            CREATE TABLE "professor_teaches" (
                "prof_id"	varchar(7) NOT NULL DEFAULT '',
                "cycle_id"	varchar(7) NOT NULL DEFAULT '',
                FOREIGN KEY("prof_id") REFERENCES "professor"("id") ON DELETE CASCADE ON UPDATE CASCADE,
                FOREIGN KEY("cycle_id") REFERENCES "course_cycle"("id") ON DELETE CASCADE ON UPDATE CASCADE
            );
            ''')


            # Create grade table
            self.execute_query('''
            CREATE TABLE "grade" (
                "state"	varchar(10) DEFAULT '',
                "prof_ID"	varchar(7) NOT NULL DEFAULT '',
                "student_ID"	varchar(7) NOT NULL DEFAULT '',
                "coursecycle_ID"	varchar(7) DEFAULT 'Y00_000',
                FOREIGN KEY("student_ID") REFERENCES "student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE,
                FOREIGN KEY("prof_ID") REFERENCES "professor"("id") ON DELETE CASCADE ON UPDATE CASCADE,
                FOREIGN KEY("coursecycle_ID") REFERENCES "course_cycle"("id") ON DELETE CASCADE ON UPDATE CASCADE
            );
            ''')


            print("Tables created successfully")
        except sqlite3.Error as e:
            print(f"Error creating tables: {e}")
            raise
        finally:
            self.disconnect()

try:
    db = StudentServicesDatabase()
    db.create_tables()
except Exception as e:
    print(f"An error occurred: {e}")