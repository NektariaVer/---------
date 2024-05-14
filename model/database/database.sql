--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

-- Started on 2024-05-14 13:58:36

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 244 (class 1259 OID 16913)
-- Name: certificate; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.certificate (
    id character varying(7) DEFAULT ''::character varying NOT NULL,
    "stud_ID" character varying(7) DEFAULT ''::character varying NOT NULL,
    date date DEFAULT '0001-01-01'::date,
    type character varying(20) DEFAULT ''::character varying
);


ALTER TABLE public.certificate OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 16825)
-- Name: course; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course (
    id character varying(7) DEFAULT ''::character varying NOT NULL,
    name character varying(20) DEFAULT ''::character varying,
    credits integer DEFAULT 0,
    weight integer DEFAULT 0,
    "fieldID" character varying(3) DEFAULT '000'::character varying,
    semester integer DEFAULT 0
);


ALTER TABLE public.course OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 16841)
-- Name: course_cycle; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course_cycle (
    semester integer DEFAULT 0 NOT NULL,
    id character varying(7) DEFAULT 'Y00_000'::character varying NOT NULL,
    "courseID" character varying(3) DEFAULT 0 NOT NULL,
    academic_year integer DEFAULT 0
);


ALTER TABLE public.course_cycle OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 16699)
-- Name: field; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.field (
    name character varying(40),
    id character varying(3) NOT NULL
);


ALTER TABLE public.field OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 16886)
-- Name: grade; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.grade (
    state character varying(10) DEFAULT ''::character varying,
    "prof_ID" character varying(7) DEFAULT ''::character varying NOT NULL,
    "student_ID" character varying(7) DEFAULT ''::character varying NOT NULL,
    "coursecycle_ID" character varying(7) DEFAULT 'Y00_000'::character varying
);


ALTER TABLE public.grade OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 16687)
-- Name: professor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.professor (
    specialization character varying(20) DEFAULT ''::character varying,
    id character varying(7) DEFAULT ''::character varying NOT NULL
);


ALTER TABLE public.professor OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 16855)
-- Name: professor_teaches; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.professor_teaches (
    prof_id character varying(7) DEFAULT ''::character varying NOT NULL,
    cycle_id character varying(7) DEFAULT ''::character varying NOT NULL
);


ALTER TABLE public.professor_teaches OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 16763)
-- Name: student; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student (
    student_id character varying(7) DEFAULT ''::character varying NOT NULL,
    semester integer DEFAULT 0 NOT NULL,
    "fieldID" character varying(3),
    registration date DEFAULT '0001-01-01'::date
);


ALTER TABLE public.student OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 16870)
-- Name: student_takes_courses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student_takes_courses (
    stud_id character varying(7) DEFAULT ''::character varying NOT NULL,
    "cycle_ID" character varying(7) DEFAULT ''::character varying NOT NULL,
    state character varying(10) DEFAULT ''::character varying
);


ALTER TABLE public.student_takes_courses OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 16612)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    firstname character varying(15) DEFAULT ''::character varying NOT NULL,
    lastname character varying(15) DEFAULT ''::character varying NOT NULL,
    academic_id character varying(7) DEFAULT NULL::character varying NOT NULL,
    email character varying(30) DEFAULT ''::character varying,
    phone character varying(10) DEFAULT 0,
    birthday date DEFAULT '0001-01-01'::date,
    gender character varying(7) DEFAULT ''::character varying,
    father character varying(15) DEFAULT ''::character varying,
    address character varying(30) DEFAULT ''::character varying,
    postcode integer DEFAULT 0,
    id_num character varying(6) DEFAULT ''::character varying,
    hashedpassword character varying(80) DEFAULT 0
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 4920 (class 0 OID 16913)
-- Dependencies: 244
-- Data for Name: certificate; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.certificate (id, "stud_ID", date, type) FROM stdin;
\.


--
-- TOC entry 4915 (class 0 OID 16825)
-- Dependencies: 239
-- Data for Name: course; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.course (id, name, credits, weight, "fieldID", semester) FROM stdin;
\.


--
-- TOC entry 4916 (class 0 OID 16841)
-- Dependencies: 240
-- Data for Name: course_cycle; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.course_cycle (semester, id, "courseID", academic_year) FROM stdin;
\.


--
-- TOC entry 4913 (class 0 OID 16699)
-- Dependencies: 237
-- Data for Name: field; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.field (name, id) FROM stdin;
Κορμός	000
Επικοινωνίες	001
Τεχνολογία της πληροφορίας	002
Έξυπνα δίκτυα με ΑΠΕ-Υψηλές τάσεις	003
Μετατροπή ενέργειας-Ηλεκτρονικά ισχύος	004
Λογισμικό και υλικό	005
Ηλεκτρονική και ενσωματωμένα συστήματα	006
Συστήματα, έλεγχος και ρομποτική	007
Κυβερνοφυσικά συστήματα	008
\.


--
-- TOC entry 4919 (class 0 OID 16886)
-- Dependencies: 243
-- Data for Name: grade; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.grade (state, "prof_ID", "student_ID", "coursecycle_ID") FROM stdin;
\.


--
-- TOC entry 4912 (class 0 OID 16687)
-- Dependencies: 236
-- Data for Name: professor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.professor (specialization, id) FROM stdin;
\.


--
-- TOC entry 4917 (class 0 OID 16855)
-- Dependencies: 241
-- Data for Name: professor_teaches; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.professor_teaches (prof_id, cycle_id) FROM stdin;
\.


--
-- TOC entry 4914 (class 0 OID 16763)
-- Dependencies: 238
-- Data for Name: student; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.student (student_id, semester, "fieldID", registration) FROM stdin;
S10800	2	000	2023-09-15
S10801	8	005	2020-09-10
\.


--
-- TOC entry 4918 (class 0 OID 16870)
-- Dependencies: 242
-- Data for Name: student_takes_courses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.student_takes_courses (stud_id, "cycle_ID", state) FROM stdin;
\.


--
-- TOC entry 4911 (class 0 OID 16612)
-- Dependencies: 235
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (firstname, lastname, academic_id, email, phone, birthday, gender, father, address, postcode, id_num, hashedpassword) FROM stdin;
Νίκος	Παπαδόπουλος	S10800	nikos.papadopoulos@gmail.com	6931234567	2005-04-23	Άνδρας	Γιάννης	Οδός Ερμού 45, Πάτρα	26100	Α00001	$2b$10$uFLnL9jUJxHOCnsuJSdtPO1IQKFGY5z3QVfk6jUgEL82FbHIOKdpG
Ελένη	Καραγιάννη	S10801	eleni.karagianni@gmail.com	6972345678	2002-06-12	Γυναίκα	Νικόλαος	Λεωφόρος Κηφισίας 78, Πάτρα	26100	Α00002	$2b$10$HdYsV/HSGvVXdNcdA1/5QOb9Ft/SQOghGGLdVoX2vFq1fDcoie4KK
\.


--
-- TOC entry 4754 (class 2606 OID 16921)
-- Name: certificate certificate_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certificate
    ADD CONSTRAINT certificate_pkey PRIMARY KEY (id);


--
-- TOC entry 4750 (class 2606 OID 16835)
-- Name: course course_PK; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT "course_PK" PRIMARY KEY (id);


--
-- TOC entry 4752 (class 2606 OID 16849)
-- Name: course_cycle cycle_PK; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_cycle
    ADD CONSTRAINT "cycle_PK" PRIMARY KEY (id);


--
-- TOC entry 4746 (class 2606 OID 16703)
-- Name: field field_PK; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.field
    ADD CONSTRAINT "field_PK" PRIMARY KEY (id);


--
-- TOC entry 4744 (class 2606 OID 16693)
-- Name: professor proffID_PK; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.professor
    ADD CONSTRAINT "proffID_PK" PRIMARY KEY (id);


--
-- TOC entry 4748 (class 2606 OID 16770)
-- Name: student student_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_pkey PRIMARY KEY (student_id);


--
-- TOC entry 4742 (class 2606 OID 16628)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (academic_id);


--
-- TOC entry 4767 (class 2606 OID 16922)
-- Name: certificate certificate_stud_ID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.certificate
    ADD CONSTRAINT "certificate_stud_ID_fkey" FOREIGN KEY ("stud_ID") REFERENCES public.student(student_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4759 (class 2606 OID 16850)
-- Name: course_cycle course_cycle_courseID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_cycle
    ADD CONSTRAINT "course_cycle_courseID_fkey" FOREIGN KEY ("courseID") REFERENCES public.course(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4758 (class 2606 OID 16836)
-- Name: course course_fieldID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course
    ADD CONSTRAINT "course_fieldID_fkey" FOREIGN KEY ("fieldID") REFERENCES public.field(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4764 (class 2606 OID 16903)
-- Name: grade grade_coursecycle_ID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grade
    ADD CONSTRAINT "grade_coursecycle_ID_fkey" FOREIGN KEY ("coursecycle_ID") REFERENCES public.course_cycle(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4765 (class 2606 OID 16898)
-- Name: grade grade_prof_ID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grade
    ADD CONSTRAINT "grade_prof_ID_fkey" FOREIGN KEY ("prof_ID") REFERENCES public.professor(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4766 (class 2606 OID 16893)
-- Name: grade grade_student_ID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grade
    ADD CONSTRAINT "grade_student_ID_fkey" FOREIGN KEY ("student_ID") REFERENCES public.student(student_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4755 (class 2606 OID 16694)
-- Name: professor professor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.professor
    ADD CONSTRAINT professor_id_fkey FOREIGN KEY (id) REFERENCES public."user"(academic_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4760 (class 2606 OID 16865)
-- Name: professor_teaches professor_teaches_cycle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.professor_teaches
    ADD CONSTRAINT professor_teaches_cycle_id_fkey FOREIGN KEY (cycle_id) REFERENCES public.course_cycle(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4761 (class 2606 OID 16860)
-- Name: professor_teaches professor_teaches_prof_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.professor_teaches
    ADD CONSTRAINT professor_teaches_prof_id_fkey FOREIGN KEY (prof_id) REFERENCES public.professor(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4756 (class 2606 OID 16771)
-- Name: student student_fieldID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT "student_fieldID_fkey" FOREIGN KEY ("fieldID") REFERENCES public.field(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4757 (class 2606 OID 16776)
-- Name: student student_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_student_id_fkey FOREIGN KEY (student_id) REFERENCES public."user"(academic_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4762 (class 2606 OID 16876)
-- Name: student_takes_courses student_takes_courses_cycle_ID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_takes_courses
    ADD CONSTRAINT "student_takes_courses_cycle_ID_fkey" FOREIGN KEY ("cycle_ID") REFERENCES public.course_cycle(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4763 (class 2606 OID 16881)
-- Name: student_takes_courses student_takes_courses_stud_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student_takes_courses
    ADD CONSTRAINT student_takes_courses_stud_id_fkey FOREIGN KEY (stud_id) REFERENCES public.student(student_id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2024-05-14 13:58:37

--
-- PostgreSQL database dump complete
--

