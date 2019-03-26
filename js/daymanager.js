"use strict";

const DayManager = {
    day: null,

    save() {
        if (this.day !== null) localStorage.setItem(this.day, ExerciseManager.marshal());

        return this;
    },

    loadDay(day) {
        this.day = day;

        ExerciseManager
            .unmarshal(localStorage.getItem(this.day) || "[]")
            .renderExercises();

        return this;
    },
};
