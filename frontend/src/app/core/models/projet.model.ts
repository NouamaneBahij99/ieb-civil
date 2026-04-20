export interface Projet {
  id?: number;
  titre: string;
  description: string;
  imagePath?: string;
}

export interface ServiceCivil {
  id?: number;
  nom: string;
  description: string;
}

export interface Message {
  id?: number;
  nomExpediteur: string;
  email: string;
  contenu: string;
}
