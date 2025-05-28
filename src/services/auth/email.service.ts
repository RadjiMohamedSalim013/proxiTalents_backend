import { transporter } from '../../config/email.config';

export const envoyerEmailReinitialisation = async (email: string, token: string) => {
    const lien = `http://localhost:3000/reset-password/${token}`;

    const mailOptions = {
        from: '"ProxiTalents" <no-reply@proxitalents.com>',
        to: email,
        subject: 'Réinitialisation de votre mot de passe',
        html: `
            <p>Vous avez demandé une réinitialisation de votre mot de passe.</p>
            <p>Cliquez sur le lien ci-dessous pour définir un nouveau mot de passe :</p>
            <a href="${lien}">${lien}</a>
            <p>Si vous n'êtes pas à l'origine de cette demande, ignorez ce message.</p>
        `
    };

    await transporter.sendMail(mailOptions);
};
