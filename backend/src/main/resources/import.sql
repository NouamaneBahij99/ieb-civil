-- Nettoyage préalable (Optionnel, à utiliser avec prudence)
-- DELETE FROM projet;
-- DELETE FROM service_civil;

-- 1. Insertion des Services (Table: service_civil)
INSERT INTO service_civil (nom, description) VALUES
                                                 ('Étude de Structure', 'Conception et calcul de structures en béton armé, charpente métallique et bois selon les Eurocodes.'),
                                                 ('Géotechnique', 'Analyses de sol, calcul de fondations superficielles et profondes, et études de soutènement.'),
                                                 ('Assainissement & VRD', 'Études de réseaux d’évacuation des eaux usées/pluviales et aménagement des voies de circulation.'),
                                                 ('Expertise Technique', 'Diagnostic de structures existantes, audit technique et préconisations de réhabilitation.');

-- 2. Insertion des Projets (Table: projet)
-- Note: Assure-toi que les images projet1.jpg, etc., existent dans ton dossier assets Angular
INSERT INTO projet (titre, description, image_path) VALUES
                                                        ('Résidence Atlas', 'Construction d’un complexe résidentiel de grand standing R+5 situé à Marrakech.', 'assets/projet1.jpg'),
                                                        ('Pont Oued Sebou', 'Réhabilitation structurelle et renforcement d’un pont routier stratégique.', 'assets/projet2.jpg'),
                                                        ('Usine Agro-Industrielle', 'Conception de la charpente métallique pour une unité de stockage de 5000 m².', 'assets/projet3.jpg');