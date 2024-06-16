import { defineStore } from 'pinia'

export const useQuizStore = defineStore('quiz', {
    state: () => ({
        questions: []
    }),
    actions: {
        setQuestions(questions) {
            this.questions = questions
        }
    }
})