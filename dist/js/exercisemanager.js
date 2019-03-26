"use strict";

const ExerciseManager = {
    exercises: [],

    marshal() {
        return JSON.stringify(this.exercises);
    },

    unmarshal(data) {
        this.exercises = JSON.parse(data);

        return this;
    },

    addExercise(exercise) {
        this.exercises.push(exercise);
        this._renderExercise(exercise);

        return this;
    },

    removeExercise(exercise) {
        for (let i = this.exercises.length - 1; i >= 0; --i) {
            if (this.exercises[i].name === exercise.name) this.exercises.splice(i);
        }

        return this;
    },

    // XXX: Surely there must be a terser way to do this.
    _renderExercise(exercise) {
        const element = (name, klass, children, attrs) => {
            console.assert(typeof name === "string");
            console.assert(typeof klass === "string");
            if (children) console.assert(Array.isArray(children));
            if (attrs) console.assert(!Array.isArray(attrs));

            const el = $(`<${name}>`);
            el.addClass(klass);
            (children || []).forEach(child => el.append(child));
            for (let [key, val] of Object.entries(attrs || {})) {
                el[key](val);
            }
            return el;
        };

        const div = (klass, children, attrs) => element("div", klass, children, attrs);

        div("card exercise text-light bg-warning my-4", [
            div("card-header", [
                element("button", "close text-light", [], {
                    text: "\u00d7",

                    click() {
                        ExerciseManager.removeExercise(exercise);
                        DayManager.save();
                        $(this).parents(".card").remove();
                    },
                }),

                element("h5", "card-title", [], {
                    text: exercise.name
                }),

                element("h6", "card-subtitle", [], {
                    text: `${exercise.repetitions} reps \u00D7 ${exercise.sets} sets`
                }),
            ]),

            div("card-body", [
                element("input", "form-control-inline exerciseSets", [], {
                    attr: {
                        "name": "sets",
                        "min": 0,
                        "max": exercise.sets,
                        "readonly": true
                    },
                    val: 0
                }),

                element("span", "", [], {
                    text: ` sets out of ${exercise.sets}`
                })
            ]),

            div("card-footer", [
                div("btn-group", [
                    element("button", "btn btn-success", [], {
                        text: "Add Set",

                        click() {
                            const $card = $(this).parents(".card");

                            const $sets = $card.find(".exerciseSets");

                            if (+$sets.val() < +$sets.attr("max")) {
                                $sets.val(+$sets.val() + 1);
                            }

                            if ($sets.val() == $sets.attr("max")) {
                                $card
                                    .removeClass("text-light bg-warning")
                                    .addClass("text-muted bg-muted");

                                $card
                                    .find(".btn-group .btn-success")
                                    .removeClass("btn-success")
                                    .addClass("btn-outline-success")
                                    .addClass("disabled");

                                $card
                                    .find(".btn-group .btn-danger")
                                    .removeClass("btn-danger")
                                    .addClass("btn-outline-danger");
                            }
                        }
                    }),

                    element("button", "btn btn-danger", [], {
                        text: "Reset",
                        click() {
                            const $card = $(this).parents(".card");

                            $card
                                .addClass("text-light bg-warning")
                                .removeClass("text-muted bg-muted");

                            $card
                                .find(".btn-success, .btn-outline-success")
                                .addClass("btn-success")
                                .removeClass("btn-outline-success")
                                .removeClass("disabled");

                            $card
                                .find(".btn-danger, .btn-outline-danger")
                                .addClass("btn-danger")
                                .removeClass("btn-outline-danger");

                            $card
                                .find(".exerciseSets")
                                .val(0);
                        }
                    })
                ])
            ])
        ]).appendTo($(".exercises"));

        return this;
    },

    renderExercises() {
        $(".exercises").empty();
        this.exercises.forEach(exercise => this._renderExercise(exercise));

        return this;
    },
};
