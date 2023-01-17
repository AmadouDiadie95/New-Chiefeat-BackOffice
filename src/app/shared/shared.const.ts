import {FuseConfirmationConfig} from "../../@fuse/services/confirmation";

export const months: string[] = [
    '',
    'Jan.',
    'Fev.',
    'Mars.',
    'Avr.',
    'Mai.',
    'Juin.',
    'Juil.',
    'Aout.',
    'Sept.',
    'Oct.',
    'Nov.',
    'Dec.',
];

export const errorSaveDialogConfig : FuseConfirmationConfig = {
    "title": "Erreur de Sauvegarde !",
        "message": "Erreur lors de la Sauvegarde, veuillez Ressayez...",
        "icon": {
        "show": true,
            "name": "heroicons_outline:exclamation",
            "color": "warn"
    },
    "actions": {
        "confirm": {
            "show": false,
                "label": "Ok",
                "color": "warn"
        },
        "cancel": {
            "show": false,
                "label": "Cancel"
        }
    },
    "dismissible": true
}

export const successSaveDialogConfig : FuseConfirmationConfig = {
    "title": "Success !",
        "message": "Sauvegarde Effecutée avec Succèss",
        "icon": {
        "show": true,
            "name": "heroicons_outline:exclamation",
            "color": "success"
    },
    "actions": {
        "confirm": {
            "show": true,
                "label": "Ok",
                "color": "primary"
        },
        "cancel": {
            "show": false,
                "label": "Cancel"
        }
    },
    "dismissible": true
}

export const deleteDialogConfig : FuseConfirmationConfig = {
    "title": "Suppression",
    "message": "Etes-Vous Sure de Vouloir Supprimer ? Cette Action est Irréversible !",
    "icon": {
        "show": true,
        "name": "heroicons_outline:exclamation",
        "color": "warn"
    },
    "actions": {
        "confirm": {
            "show": true,
            "label": "Confirmer & Supprimer",
            "color": "warn"
        },
        "cancel": {
            "show": true,
            "label": "Annuler"
        }
    },
    "dismissible": true
}
