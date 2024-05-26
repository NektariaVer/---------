## Login
Home Page
## Home Page
User Info, Semester, Courses, Student Progress, Certificates
## User Info
Edit User Info, Semester, Courses, Student Progress, Certificates, Home Page
## Edit User Info
User Info, Semester, Courses, Student Progress, Certificates, Home Page
## Semester
User Info, Courses, Student Progress, Certificates, Home Page
## Courses
User Info, Semester, Student Progress, Certificates, Home Page
## Student Progress
User Info, Semester, Courses, Certificates, Home Page
## Certificates
User Info, Semester, Courses, Student Progress, Home Page

```plantuml

@startuml
skinparam linetype ortho
skinparam rectangle {
    FontSize 16
}

left to right direction

rectangle "Login" as Login #b56660
rectangle "Homepage" as Home #d1bb6d
rectangle "User Info" as UserInfo #74b560
rectangle "Edit User Info" as EditUserInfo #60b58c
rectangle "Semester" as Semester #609cb5
rectangle "Courses" as Courses #6066b5
rectangle "Student Progress" as Progress #9760b5
rectangle "Certificates" as Certificates #b56097

Login --> Home #b56660

Home --> UserInfo #Black
Home --> Semester #Black
Home --> Courses #Black
Home --> Progress #Black
Home --> Certificates #Black

UserInfo --> EditUserInfo #74b560
EditUserInfo --> UserInfo #60b58c

UserInfo --> Home #74b560
Semester --> Home #609cb5
Courses --> Home #6066b5
Progress --> Home #9760b5
Certificates --> Home #b56097
EditUserInfo --> Home #60b58c



UserInfo --> Semester #74b560
UserInfo --> Courses #74b560
UserInfo --> Progress #74b560
UserInfo --> Certificates #74b560
UserInfo --> EditUserInfo #74b560

Semester --> UserInfo #609cb5
Semester --> Courses #609cb5
Semester --> Progress #609cb5
Semester --> Certificates #609cb5

Courses --> UserInfo #6066b5
Courses --> Semester #6066b5
Courses --> Progress #6066b5
Courses --> Certificates #6066b5

Progress --> UserInfo #9760b5
Progress --> Semester #9760b5
Progress --> Courses #9760b5
Progress --> Certificates #9760b5

Certificates --> UserInfo #b56097
Certificates --> Semester #b56097
Certificates --> Courses #b56097
Certificates --> Progress #b56097

@enduml

```