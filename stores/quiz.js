import { defineStore } from 'pinia'
import { questions } from "../data/questions.js";

export const useQuizStore = defineStore('quiz', {
    state: () => ({
        answers: []
    }),
    actions: {
        reset() {
            this.answers = []
        },
        setAnswer(questionId, answer) {
            const a = this.answers.find(q => q.id === questionId)
            if (a) {
                a.answer = answer
            } else {
                this.answers.push({ id: questionId, answer: answer })
            }
        },
        getResults() {
            const results = [{ party: 'NFP', score: 0 }, { party: 'REN', score: 0 }, { party: 'RN', score: 0 }]
            this.answers.forEach(a => {
                const currentQuestion = questions.find(q => q.id === a.id)
                currentQuestion.score.forEach(s => {
                    const r = results.find(r => r.party === s.party)
                    if (s.score === 1 && a.answer === 1 || s.score === -1 && a.answer === -1) {
                        r.score += 1
                    }
                })
            })
            return results
        }
    }
})