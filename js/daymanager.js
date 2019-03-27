/* jshint esversion: 9, browser: true, module: true */
/* globals $, ExerciseManager */

"use strict";

import { ExerciseManager } from "./exercisemanager.js";

export const DayManager = {
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

    loadToday() {
        const idx = new Date().getDay();
        $($("#dayChooserList .nav-item .nav-link").get(idx === 0 ? 6 : idx - 1)).click();
    },
};
