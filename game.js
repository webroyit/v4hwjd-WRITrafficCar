$(function() {
    const anim_id;

    const container = $('#container');
    const car = $('#car');
    const car_1 = $('#car_1');
    const car_2 = $('#car_2');
    const car_3 = $('#car_3');
    const line_1 = $('#line_1');
    const line_2 = $('#line_2');
    const line_3 = $('#line_3');
    const restart_div = $('#restart_div');
    const restart_btn = $('#restart');
    const score = $('#score');

    const container_left = parseInt(container.css('left'));
    const container_width = parseInt(container.width());
    const container_height = parseInt(container.height());
    const car_width = parseInt(car.width());
    const car_height = parseInt(car.height());

    let game_over = false;

    let score_counter = 1;

    let speed = 2;
    let line_speed = 5;

    let move_right = false;
    let move_left = false;
    let move_up = false;
    let move_down = false;
});