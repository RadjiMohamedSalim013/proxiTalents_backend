import bcrypt from 'bcryptjs'
import { generateToken } from '../../utils/generateToken'
import { IUser, User } from '../../models/user.model';


export const loginUserService = async (email: string, motDePasse:string) =>{
    // recupération de l'email
    const user = await User.findOne({ email }) as IUser & { _id: string };

    if (!user){
        throw new Error('Utilisateur introuvable')
    }

    // récupération du mot de passe
    const isPasswordValid = await bcrypt.compare(motDePasse, user.motDePasse)
    if (!isPasswordValid) {
        throw new Error('Mot de passe incorrect')
    }

    //generation du token
    const token = generateToken(user._id.toString());

    return{
        message : 'connexion réussie',
        token,
        utilisateur:{
            id:user._id,
            nom: user.nom,
            email: user.email,
            role: user.role
        }
    }
    
}