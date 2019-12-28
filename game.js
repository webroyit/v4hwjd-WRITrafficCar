$(function() {
    let anim_id;

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

    $(document).on("keydown", function(event){
        if(!game_over){
            let key = event.keyCode;
            if(key === 37 && !move_left){
                move_left = requestAnimationFrame(left);
            }
        }
    });

    $(document).on("keyup", function(event){
        if(!game_over){
            let key = event.keyCode;
            if(key === 37){
                cancelAnimationFrame(move_left);
                move_left = false;
            }
        }
    });

    function collision($div1, $div2) {
        const x1 = $div1.offset().left;
        const y1 = $div1.offset().top;
        const h1 = $div1.outerHeight(true);
        const w1 = $div1.outerWidth(true);
        const b1 = y1 + h1;
        const r1 = x1 + w1;
        const x2 = $div2.offset().left;
        const y2 = $div2.offset().top;
        const h2 = $div2.outerHeight(true);
        const w2 = $div2.outerWidth(true);
        const b2 = y2 + h2;
        const r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }

    function left(){
        if(!game_over && parseInt(car.css("left")) > 0){
            car.css("left", parseInt(car.css("left")) - 5);
            move_left = requestAnimationFrame(left);
        }
    }
});