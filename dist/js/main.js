// TODO: Add RestManager

$(function() {
    "use strict";

    $("#addExerciseModalConfirmBtn").click(function() {
        const exercise = {};

        $("#addExerciseModalForm")
            .serializeArray()
            .forEach(({
                name,
                value
            }) => exercise[name] = value);

        ExerciseManager.addExercise(exercise);
        DayManager.save();

        $("#addExerciseModal").modal("hide");
    });

    $("#dayChooserList .nav-item").click(function() {
        const $this = $(this);

        $this
            .parents(".nav")
            .find(".nav-link")
            .removeClass("active");

        $this
            .find(".nav-link")
            .addClass("active");

        DayManager.loadDay($this.find(".nav-link").attr("href"));
    });

    // TODO: Automatically choose the actual day of the week
    $("#dayChooserList .nav-item").first().click();
});
