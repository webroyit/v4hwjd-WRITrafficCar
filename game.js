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

    const buttonLeft = $("#button-left");
    const buttonRight = $("#button-right");

    const container_left = parseInt(container.css('left'));
    const container_width = parseInt(container.width());
    const container_height = parseInt(container.height());
    const car_width = parseInt(car.width());
    const car_height = parseInt(car.height());

    let game_over = false;

    let score_counter = 1;

    let speed = 3;
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
            else if(key === 39 && !move_right){
                move_right = requestAnimationFrame(right);
            }
            else if(key === 38 && !move_up){
                move_up = requestAnimationFrame(up);
            }
            else if(key === 40 && !move_down){
                move_down = requestAnimationFrame(down);
            }
        }
    });

    $(document).on("keyup", function(event){
        if(!game_over){
            let key = event.keyCode;
            if(key === 37){
                // stop the car from repeatedly going to the left
                cancelAnimationFrame(move_left);
                move_left = false;
            }
            else if(key === 39){
                cancelAnimationFrame(move_right);
                move_right = false;
            }
            else if(key === 38){
                cancelAnimationFrame(move_up);
                move_up = false;
            }
            else if(key === 40){
                cancelAnimationFrame(move_down);
                move_down = false;
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

    function right(){
        if(!game_over && parseInt(car.css("left")) < container_width - car_width){
            car.css("left", parseInt(car.css("left")) + 5);
            move_right = requestAnimationFrame(right);
        }
    }

    function up(){
        if(!game_over && parseInt(car.css("top")) > 0){
            car.css("top", parseInt(car.css("top")) - 5);
            move_up = requestAnimationFrame(up);
        }
    }

    function down(){
        if(!game_over && parseInt(car.css("top")) < container_height - car_height){
            car.css("top", parseInt(car.css("top")) + 5);
            move_down = requestAnimationFrame(down);
        }
    }

    anim_id = requestAnimationFrame(repeat);

    function repeat(){
        if(!game_over){

            if(collision(car, car_1) || collision(car, car_2) || collision(car, car_3)){
                stop_the_game();
            }

            // update the score
            score_counter++;
            if(score_counter % 20 === 0){
                score.text(parseInt(score.text()) + 1);
            }

            // make the other cars go faster
            if(score_counter % 500 === 0){
                speed++;
                line_speed++;
            }

            // move these cars down
            car_down(car_1);
            car_down(car_2);
            car_down(car_3);

            // move the lines down
            line_down(line_1);
            line_down(line_2);
            line_down(line_3);

            anim_id = requestAnimationFrame(repeat);
        }
    }

    function car_down(car){
        let current_top = parseInt(car.css("top"));

        // move the other cars back to the top to start the animation again
        if(current_top > container_height){
            current_top = -200;

            // make the other start at different position
            let car_left = parseInt(Math.random() * (container_width - car_width));
            car.css("left", car_left);
        }

        car.css("top", current_top + speed);
    }

    function line_down(line){
        let line_current_top = parseInt(line.css("top"));

        // move the line back to the top
        if(line_current_top > container_height){
            line_current_top = -300;
        }

        line.css("top", line_current_top + line_speed);
    }

    function stop_the_game(){
        game_over = true;
        cancelAnimationFrame(anim_id);
        cancelAnimationFrame(move_up);
        cancelAnimationFrame(move_down);
        cancelAnimationFrame(move_left);
        cancelAnimationFrame(move_right);

        // show the popup
        restart_div.slideDown();

        // allow enter keyboard to work
        restart_btn.focus();
    }

    // refresh the page
    restart_btn.click(function(){
        location.reload();
    });

    buttonLeft.click(function(){
        if(!game_over && parseInt(car.css("left")) > 0){
            car.css("left", parseInt(car.css("left")) - 10);
        }
    });

    buttonRight.click(function(){
        if(!game_over && parseInt(car.css("left")) < container_width - car_width){
            car.css("left", parseInt(car.css("left")) + 10);
        }
    });
});