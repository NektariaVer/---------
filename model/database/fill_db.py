import sqlite3

conn = sqlite3.connect("student_services.db")
cur = conn.cursor()

def upload_data():
    conn.execute('''INSERT INTO "user" VALUES
                    ('Νίκος', 'Παπαδόπουλος', 'S10800', 'nikos.papadopoulos@gmail.com', '6931234567', '2005-04-23', 'Άνδρας', 'Γιάννης', 'Οδός Ερμού 45, Πάτρα', '26100', 'Α00001','$2b$10$Zxi8QWN05A8tHMBhh50EXumQqTd7yJn4Fd7m7nncHI1AkUDonKEgW'),
                    ('Ελένη', 'Καραγιάννη', 'S10801', 'eleni.karagianni@gmail.com', '6972345678', '2002-06-12', 'Γυναίκα', 'Νικόλαος', 'Λεωφόρος Κηφισίας 78, Πάτρα', '26100', 'Α00002','$2b$10$tATBkz.Jr53KyRqAsQziDeE1Z70Grs2Kox7yVUk/atF3C90DUUmMq');
                 ''')
    
    conn.execute('''INSERT INTO "student" VALUES
                 ('S10800', 2, '30-09-2023', '000','15-09-2023'),
                 ('S10801', 8, '27-09-2023', '005','10-09-2020');
                 ''')
    
    conn.execute('''INSERT INTO "student_takes_courses" VALUES
                 ('S10800', 'ECE_Υ101', '7', '2023-2024'),
                 ('S10800', 'ECE_ΞΓ210', '8.5', '2023-2024'),
                 ('S10800', 'ECE_Υ107', '6.5', '2023-2024'),
                 ('S10800', 'ECE_Υ108', '5', '2023-2024'),
                 ('S10800', 'ECE_Υ109', '', '2023-2024'),
                 ('S10800', 'ECE_Υ106', '10', '2023-2024'),
                 ('S10800', 'ECE_Υ104', '3.5', '2023-2024'),

                 ('S10801', 'ECE_Υ101', '5.5', '2020-2021'),
                 ('S10801', 'ECE_ΞΓ210', '7', '2020-2021'),
                 ('S10801', 'ECE_Υ107', '6.5', '2020-2021'),
                 ('S10801', 'ECE_Υ108', '5', '2020-2021'),
                 ('S10801', 'ECE_Υ109', '9', '2021-2022'),
                 ('S10801', 'ECE_Υ106', '10', '2020-2021'),
                 ('S10801', 'ECE_Υ104', '7.5', '2020-2021'),

                 ('S10801', 'ECE_Υ210', '5', '2020-2021'),
                 ('S10801', 'ECE_Υ211', '7', '2021-2022'),
                 ('S10801', 'ECE_Υ212', '6', '2020-2021'),
                 ('S10801', 'ECE_Υ213', '8.5', '2020-2021'),
                 ('S10801', 'ECE_Υ214', '9', '2023-2024'),
                 ('S10801', 'ECE_Υ215', '10', '2020-2021'),
                 ('S10801', 'ECE_Υ216', '6.5', '2020-2021'),

                 ('S10801', 'ECE_Υ320', '5.5', '2021-2022'),
                 ('S10801', 'ECE_Υ321', '', '2023-2024'),
                 ('S10801', 'ECE_Υ322', '2', '2022-2023'),
                 ('S10801', 'ECE_Υ323', '8', '2021-2022'),
                 ('S10801', 'ECE_Υ324', '7.5', '2021-2022'),
                 ('S10801', 'ECE_Υ325', '9', '2022-2023'),
                 
                 ('S10801', 'ECE_Υ420', '', '2022-2023'),
                 ('S10801', 'ECE_Υ421', '', '2022-2023'),
                 ('S10801', 'ECE_Υ422', '6', '2021-2022'),
                 ('S10801', 'ECE_Υ423', '8', '2021-2022'),
                 ('S10801', 'ECE_Υ424', '7.5', '2021-2022'),
                 ('S10801', 'ECE_Υ425', '4', '2022-2023'),
                 
                 ('S10801', 'ECE_Υ520', '6', '2022-2023'),
                 ('S10801', 'ECE_Υ521', '', '2023-2024'),
                 ('S10801', 'ECE_Υ522', '7', '2022-2023'),
                 ('S10801', 'ECE_Υ523', '3', '2023-2024'),
                 ('S10801', 'ECE_Υ524', '8', '2022-2023'),
                 ('S10801', 'ECE_Υ525', '7.5', '2022-2023'),
                 
                 ('S10801', 'ECE_Υ620', '6.5', '2022-2023'),
                 ('S10801', 'ECE_Υ621', '', '2022-2023'),
                 ('S10801', 'ECE_Υ622', '7', '2022-2023'),
                 ('S10801', 'ECE_Υ623', '1', '2022-2023'),
                 ('S10801', 'ECE_Υ624', '9', '2022-2023'),
                 ('S10801', 'ECE_Υ625', '7.5', '2022-2023'),
                 
                 ('S10801', 'ECE_ΑΚ705', '8', '2023-2024'),
                 ('S10801', 'ECE_ΑΚ709', '9', '2023-2024'),
                 ('S10801', 'ECE_ΓΚ703', '10', '2023-2024'),
                 ('S10801', 'ECE_ΔΚ702', '3', '2023-2024'),
                 ('S10801', 'ECE_ΑΚ702', '7.5', '2023-2024'),
                 ('S10801', 'ECE_ΑΚ703', '2.5', '2023-2024');
                 ''')

    conn.execute('''INSERT INTO "field" VALUES
                 ('Κορμός', '000'),
                 ('Επικοινωνίες', '001'),
                 ('Τεχνολογία της πληροφορίας','002'),
                 ('Έξυπνα δίκτυα με ΑΠΕ-Υψηλές τάσεις','003'),
                 ('Μετατροπή ενέργειας-Ηλεκτρονικά ισχύος','004'),
                 ('Λογισμικό και υλικό','005'),
                 ('Ηλεκτρονική και ενσωματωμένα συστήματα','006'),
                 ('Συστήματα, έλεγχος και ρομποτική','007'),
                 ('Κυβερνοφυσικά συστήματα','008');
                 ''')
    
    conn.execute('''INSERT INTO "course" VALUES
                    ('ECE_ΞΓ210', 'ΑΓΓΛΙΚΑ', 3, 1.5, '000', 1),
                    ('ECE_Υ101', 'ΛΟΓΙΣΜΟΣ ΣΥΝΑΡΤΗΣΕΩΝ ΜΙΑΣ ΜΕΤΑΒΛΗΤΗΣ', 6, 2.0, '000', 1),
                    ('ECE_Υ104', 'ΓΡΑΜΜΙΚΗ ΑΛΓΕΒΡΑ', 3, 1.5, '000', 1),
                    ('ECE_Υ106', 'ΕΙΣΑΓΩΓΗ ΣΤΟΥΣ ΥΠΟΛΟΓΙΣΤΕΣ', 6, 2.0, '000', 1),
                    ('ECE_Υ107', 'ΣΥΓΧΡΟΝΗ ΦΥΣΙΚΗ', 4, 1.5, '000', 1),
                    ('ECE_Υ108', 'ΕΦΑΡΜΟΣΜΕΝΗ ΦΥΣΙΚΗ', 4, 1.5, '000', 1),
                    ('ECE_Υ109', 'ΨΗΦΙΑΚΗ ΛΟΓΙΚΗ', 4, 1.5, '000', 1),
                        
                    ('ECE_Υ210', 'ΕΙΣΑΓ ΣΤΗΝ ΕΠΙΣΤΗΜΗ ΤΟΥ ΗΛΕΚΤΡΟΜΗΧΑΝΙΚΟΥ & ΤΕΧΝΟΛΟΓΙΑΣ ΥΠΟΛΟΓΙΣΤΩΝ', 3, 1.5, '000', 2),
                    ('ECE_Υ211', 'ΗΛΕΚΤΡΙΚΑ ΚΥΚΛΩΜΑΤΑ Ι', 5, 1.5, '000', 2),
                    ('ECE_Υ212', 'ΛΟΓΙΣΜΙΚΗ ΣΥΝΑΡΤΗΣΗ ΠΟΛΛΩΝ ΜΕΤΑΒΛΗΤΩΝ & ΔΙΑΝΥΣΜΑΤΙΚΗ ΑΝΑΛΥΣΗ', 5, 1.5, '000', 2),
                    ('ECE_Υ213', 'ΕΡΓΑΣΤΗΡΙΟ ΕΦΑΡΜΟΣΜΕΝΗΣ ΦΥΣΙΚΗΣ', 3, 1.0, '000', 2),
                    ('ECE_Υ214', 'ΣΥΝΗΘΕΙΣ ΔΙΑΦΟΡΙΚΕΣ ΕΞΙΣΩΣΕΙΣ & ΜΙΓΑΔΙΚΕΣ ΣΥΝΑΡΤΗΣΕΙΣ', 4, 1.5, '000', 2),
                    ('ECE_Υ215', 'ΔΙΑΔΙΚΤΥΑΚΟΣ ΠΡΟΓΡΑΜΜΑΤΙΣΜΟΣ', 6, 2.0, '000', 2),
                    ('ECE_Υ216', 'ΤΕΧΝΙΚΗ ΜΗΧΑΝΙΚΗ', 4, 1.5, '000', 2),
                    
                    ('ECE_Υ323', 'ΗΛΕΚΤΡΟΤΕΧΝΙΚΑ-ΗΛΕΚΤΡΟΝΙΚΑ ΥΛΙΚΑ', 5, 1.5, '000', 3),
                    ('ECE_Υ320', 'ΗΛΕΚΤΡΙΚΑ ΚΥΚΛΩΜΑΤΑ ΙΙ', 7, 2.0, '000', 3),
                    ('ECE_Υ321', 'ΜΕΡΙΚΕΣ ΔΙΑΦΟΡΙΚΕΣ ΕΞΙΣΩΣΕΙΣ & ΜΕΤΑΣΧΗΜΑΤΙΣΜΟΙ', 6, 2.0, '000', 3),
                    ('ECE_Υ322', 'ΠΙΘΑΝΟΤΗΤΕΣ & ΣΤΑΤΙΣΤΙΚΗ', 4, 1.5, '000', 3),
                    ('ECE_Υ324', 'ΨΗΦΙΑΚΑ ΚΥΚΛΩΜΑΤΑ ΚΑΙ ΣΥΣΤΗΜΑΤΑ', 5, 1.5, '000', 3),
                    ('ECE_Υ325', 'ΑΝΤΙΚΕΙΜΕΝΟΣΤΡΕΦΗΣ ΤΕΧΝΟΛΟΓΙΑ', 3, 1.5, '000', 3),
                    
                    ('ECE_Υ420', 'ΗΛΕΚΤΡΟΜΑΓΝΗΤΙΚΑ ΠΕΔΙΑ Ι', 4, 1.5, '000', 4),
                    ('ECE_Υ421', 'ΜΙΚΡΟΗΛΕΚΤΡΟΝΙΚΕΣ ΔΙΑΤΑΞΕΙΣ ΚΑΙ ΚΥΚΛΩΜΑΤΑ', 6, 2.0, '000', 4),
                    ('ECE_Υ422', 'ΑΝΑΛΥΣΗ ΔΙΚΤΥΩΝ ΙΣΧΥΟΣ', 5, 1.5, '000', 4),
                    ('ECE_Υ423', 'ΟΡΓΑΝΩΣΗ ΥΠΟΛΟΓΙΣΤΩΝ', 4, 1.5, '000', 4),
                    ('ECE_Υ424', 'ΔΙΚΤΥΑ ΕΠΙΚΟΙΝΩΝΙΩΝ', 6, 2.0, '000', 4),
                    ('ECE_Υ425', 'ΣΗΜΑΤΑ & ΣΥΣΤΗΜΑΤΑ', 5, 2.0, '000', 4),
                    
                    ('ECE_Υ521', 'ΟΛΟΚΛΗΡΩΜΕΝΑ ΗΛΕΚΤΡΟΝΙΚΑ', 8, 2.0, '000', 5),
                    ('ECE_Υ520', 'ΗΛΕΚΤΡΟΜΑΓΝΗΤΙΚΑ ΠΕΔΙΑ ΙΙ', 5, 1.5, '000', 5),
                    ('ECE_Υ522', 'ΑΡΙΘΜΗΤΙΚΗ ΑΝΑΛΥΣΗ', 3, 1.5, '000', 5),
                    ('ECE_Υ523', 'ΕΠΕΞΕΡΓΑΣΙΑ ΣΗΜΑΤΩΝ', 4, 1.5, '000', 5),
                    ('ECE_Υ524', 'ΣΥΣΤΗΜΑΤΑ ΕΠΙΚΟΙΝΩΝΙΩΝ', 5, 2.0, '000', 5),
                    ('ECE_Υ525', 'ΣΥΣΤΗΜΑΤΑ ΗΛΕΚΤΡΙΚΗΣ ΕΝΕΡΓΕΙΑΣ', 5, 1.5, '000', 5),
                    
                    ('ECE_Υ620', 'ΣΥΣΤΗΜΑΤΑ ΑΥΤΟΜΑΤΟΥ ΕΛΕΓΧΟΥ', 8, 2.0, '000', 6),
                    ('ECE_Υ621', 'ΗΛΕΚΤΡΟΚΙΝΗΤΙΚΕΣ ΜΕΤΡΗΤΙΚΕΣ ΔΙΑΤΑΞΕΙΣ & ΤΕΧΝΙΚΕΣ', 3, 1.5, '000', 6),
                    ('ECE_Υ622', 'ΜΙΚΡΟΥΠΟΛΟΓΙΣΤΙΚΑ/ΕΝΣΩΜΑΤΩΜΕΝΑ ΣΥΣΤΗΜΑΤΑ', 4, 1.5, '000', 6),
                    ('ECE_Υ623', 'ΗΛΕΚΤΡΙΚΕΣ ΜΗΧΑΝΕΣ', 8, 2.0, '000', 6),
                    ('ECE_Υ624', 'ΤΕΧΝΙΚΟ ΣΧΕΔΙΟ', 3, 1.5, '000', 6),
                    ('ECE_Υ625', 'ΑΛΓΟΡΙΘΜΟΙ ΚΑΙ ΔΟΜΕΣ ΔΕΔΟΜΕΝΩΝ', 4, 1.5, '000', 6),
                    
                    ('ECE_ΑΚ705', 'ΤΕΧΝΗΤΗ ΝΟΗΜΟΣΥΝΗ Ι (Δ+Ε)', 5, 2.0, '001', 7),
                    ('ECE_ΑΚ709', 'ΓΡΑΦΙΚΑ & ΕΙΚΟΝΙΚΗ ΠΡΑΓΜΑΤΙΚΟΤΗΤΑ (Δ+Ε)', 5, 2.0, '002', 7),
                    ('ECE_ΓΚ703', 'ΒΑΣΕΙΣ ΔΕΔΟΜΕΝΩΝ (Δ+Ε)', 5, 2.0, '005', 7),
                    ('ECE_ΔΚ702', 'ΕΦΑΡΜΟΣΜΕΝΗ ΒΕΛΤΙΣΤΟΠΟΙΗΣΗ', 5, 1.5, '007', 7),
                    ('ECE_ΔΚ703', 'ΕΙΣΑΓΩΓΗ ΣΤΗ ΡΟΜΠΟΤΙΚΗ (Δ+Ε)', 5, 1.5, '007', 7),
                    ('ECE_ΕΚ701', 'ΕΙΣΑΓΩΓΗ ΣΤΑ ΚΥΒΕΡΝΟΦΥΣΙΚΑ ΣΥΣΤΗΜΑΤΑ', 5, 1.5, '008', 7),
                    ('ECE_ΑΚ703', 'ΨΗΦΙΑΚΕΣ ΕΠΙΚΟΙΝΩΝΙΕΣ Ι', 5, 1.5, '001', 7),
                    ('ECE_ΒΚ702', 'ΥΨΗΛΕΣ ΤΑΣΕΙΣ (Δ+Ε)', 5, 2.0, '003', 7),
                    ('ECE_ΒΚ704', 'ΗΛΕΚΤΡΙΚΕΣ ΕΓΚΑΤΑΣΤΑΣΕΙΣ', 5, 1.5, '003', 7),
                    ('ECE_ΒΚ705', 'ΗΛΕΚΤΡΟΝΙΚΑ ΙΣΧΥΟΣ Ι (Δ+Ε)', 5, 2.0, '004', 7),
                    ('ECE_ΒΚ706', 'ΗΛΕΚΤΡΙΚΑ ΚΙΝΗΤΗΡΙΑ ΣΥΣΤΗΜΑΤΑ Ι (Δ+Ε)', 5, 2.0, '004', 7),
                    ('ECE_ΑΚ702', 'ΑΣΥΡΜΑΤΗ ΔΙΑΔΟΣΗ', 5, 1.5, '001', 7),
                    ('ECE_ΔΚ701', 'ΕΛΕΓΧΟΣ ΓΡΑΜΜΙΚΩΝ ΣΥΣΤΗΜ ΣΤΟ ΧΩΡΟ ΚΑΤΑΣ', 5, 1.5, '007', 7),
                 
                    ('ECE_ΑΚ801', 'ΕΡΓΑΣΤΗΡΙΟ ΕΠΙΚΟΙΝΩΝΙΩΝ Ι', 5, 1.5, '001', 8),
                    ('ECE_ΑΚ802', 'ΑΣΥΡΜΑΤΑ ΔΙΚΤΥΑ ΚΑΙ ΔΙΚΤΥΑ ΚΙΝΗΤΩΝ ΕΠΙΚΟΙΝΩΝΙΩΝ', 5, 1.5, '002', 8),
                    ('ECE_ΑΚ803', 'ΘΕΩΡΙΑ ΚΕΡΑΙΩΝ', 5, 1.5, '001', 8),
                    ('ECE_ΑΚ804', 'ΘΕΩΡΙΑ ΤΗΛΕΠΙΚΟΙΝΩΝΙΑΚΗΣ ΚΙΝΗΣΗΣ ΚΑΙ ΣΥΣΤΗΜΑΤΑ ΑΝΑΜΟΝΗΣ', 5, 1.5, '002', 8),
                    ('ECE_ΑΚ805', 'ΟΠΤΙΚΕΣ ΕΠΙΚΟΙΝΩΝΙΕΣ (Δ+Ε)', 5, 1.5,'002', 8),
                    ('ECE_ΑΚ813', 'ΟΠΤΟΗΛΕΚΤΡΟΝΙΚΗ ΚΑΙ ΦΩΤΟΝΙΚΗ ΤΕΧΝΟΛΟΓΙΑ', 5, 1.5, '002', 8),
                    ('ECE_ΑΚ809', 'ΨΗΦΙΑΚΗ ΤΕΧΝΟΛΟΓΙΑ ΗΧΟΥ', 5, 1.5, '002', 8),
                    ('ECE_ΑΚ812', 'ΨΗΦΙΑΚΗ ΕΠΕΞΕΡΓΑΣΙΑ ΚΑΙ ΑΝΑΛΥΣΗ ΕΙΚΟΝΑΣ', 5, 1.5, '002', 8),
                    ('ECE_ΑΚ820', 'ΤΕΧΝΗΤΗ ΝΟΥΜΟΣΥΝΗ ΙΙ', 5, 2.0, '001', 8),
                    ('ECE_ΓΚ706', 'ΠΡΟΗΓΜΕΝΑ ΜΙΚΤΑ/ΨΗΦΙΑΚΑ ΚΥΚΛΩΜΑΤΑ ΚΑΙ ΔΙΑΤΑΞΕΙΣ', 5, 1.5, '006', 8),
                    ('ECE_ΔΚ808', 'ΡΟΜΠΟΤΙΚΑ ΣΥΣΤΗΜΑΤΑ Ι', 5, 1.5, '007', 8),
                 
                    ('ECE_ΑΚ901', 'ΕΡΓΑΣΤΗΡΙΟ ΕΠΙΚΟΙΝΩΝΙΩΝ ΙΙ', 5, 2.0, '001', 9),
                    ('ECE_ΑΚ902', 'ΡΑΔΙΟΣΥΧΝΟΤΗΤΕΣ ΚΑΙ ΦΩΤΟΝΙΚΕΣ ΤΕΧΝΟΛΟΓΙΕΣ', 5, 2.0, '001', 9);
                 ''')

 
 
    conn.execute('''INSERT INTO "course_cycle" (semester, id, courseID, academic_year) VALUES
                        (1, 'Y00_011', 'CS101', 2023),
                        (2, 'Y00_012', 'ME102', 2023),
                        (3, 'Y00_013', 'CS201', 2023),
                        (2, 'Y00_014', 'ME202', 2023),
                        (2, 'Y00_015', 'EE202', 2023)
                    ''')
 



def fill_database():
    upload_data()
    conn.commit()
    print("Data succesfully loaded.")

if __name__ == "__main__":
    fill_database()
    conn.close()