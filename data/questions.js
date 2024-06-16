export const questions = [
    {
        id: 0,
        text:
            "Êtes-vous pour le droit à l'avortement ?",
        answers: [
            { text: "oui", score: { 'NFP': 10, 'REN': 5, 'RN': -10 } },
            { text: "non", score: { 'NFP': -10, 'REN': -5, 'RN': 10 } },
        ],
    },
];