import { Request } from 'express';
import { IUser } from '../../models/User.model';

export namespace Express {
  export interface Request extends Request {
    utilisateur?: IUser;
  }
}

export interface IUtilisateurRequest extends Request {
  utilisateur?: IUser;
}
