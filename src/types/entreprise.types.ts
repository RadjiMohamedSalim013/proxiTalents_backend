export interface IEntrepriseCreation {
  nom: string;
  description?: string;
  ville: string;
  whatsapp?: string;
  email: string;
  siteWeb?: string;
  secteurActivite: string;
  utilisateurId?: string; // Ajout de utilisateurId pour correspondre au modèle mongoose
}
