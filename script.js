let up = 38;
let down = 40;
let left = 37;
let right = 39;
let space = 32;
let reloadingGun = 82;
var reload = false;
let moveLeft = false,moveRight = false,moveUp = false,moveDown = false,shoot = false ;
let screen = document.querySelector('canvas');
let context = screen.getContext("2d");
let player = {x:10,y:10};
let ball = {x:10,y:10};
let target = {x:676,y:Math.floor(Math.random() * 300)};




update();
//when press key will call this function 
window.addEventListener("keydown", keydownHandler);
//when  key is not pressed will call this function
window.addEventListener("keyup", keyupHandler);

function keydownHandler(event){
    let key = event.keyCode;

    if(key === left && key !==right){
        moveLeft = true;
    }
    if(key === right && key !==left){
        moveRight = true;
    }
    if(key === up && key !==down){
        moveUp = true;
    }
    if(key === down && key !==up){
        moveDown = true;
    }
    if(key === space){
        shoot = true;
    }
    console.log('key',key);
    if(key === reloadingGun){
        reload = true;
    }
}

function keyupHandler(event){
   
    let key = event.keyCode;
    if(key === left && key !==right){
        moveLeft = false;
    }
    if(key === right && key !==left){
        moveRight = false;
    }
    if(key === up && key !==down){
        moveUp = false;
    }
    if(key === down && key !==up){
        moveDown = false;
    }
}


//look if the ball will pass the screen
function edgeScreen(){
    if(player.x < 0 ){
        player.x = 0;
        ball.x = 0;
    }
    if(player.x  > 650){
        player.x = 650;
        ball.x = 650;
    }
     if(player.y < 0 ){
        player.y = 0;
        ball.y = 0;
     }
     if(player.y  > 351){
        player.y = 351;
        ball.y = 351;
        
     }

}

  function colision(){
      
     if(ball.x == target.x && ball.y == target.y ){
         alert('BOOOOMMMMMMM');
        target = {x:676,y:Math.floor(Math.random() * 300)};
        alert('Reloading');
        reloadGUN();
     }
     for(var i = 1; i< 20 ; i++){
        if(ball.x == target.x && (ball.y + i )== target.y  ){
            alert('BOOOOMMMMMMM');
            target = {x:676,y:Math.floor(Math.random() * 300)};
            alert('Reloading');
            reloadGUN();
        }
        if(ball.x == target.x && (ball.y - i )== target.y  ){
            alert('BOOOOMMMMMMM');
            target = {x:676,y:Math.floor(Math.random() * 300)};
            alert('Reloading');
            reloadGUN();
        }   
    }  
 }

//function to move player
function movePlayer(){

    if(moveLeft){
        player.x--;
        ball.x--
    }
    if(moveRight){
        player.x++;
        ball.x++;
    }
    if(moveUp){
        player.y--;
        ball.y--;
    }
    if(moveDown){
        player.y++;
        ball.y++;
    }
}
//function to shoot the ball
function moveBall(){

    if(reload){
        reloadGUN();
    }
    if(shoot){
        for(var i = 0; i <=screen.width ; i ++){
            if(ball.x < 650){
            ball.x += i; 
            }
        }
        colision();
        shoot = false;
    }  
}

function reloadGUN(){
    ball.x = player.x;
    ball.y = player.y;
    reload = false;
}


//clean the screen and after fill the screen with new position
function render(){
    context.clearRect(0,0,screen.width,screen.height);
    context.fillStyle = 'green';
    context.fillRect(target.x,target.y , 20,20);
    context.fillStyle = 'black';
    context.fillRect(player.x,player.y,50,50);
    context.fillStyle = 'red';
    context.fillRect(ball.x,ball.y , 20,20);
    context.fillStyle = 'red';
    context.fillRect(ball.x,ball.y , 20,20);
    console.log('ty is '+ target.y);
    console.log('by is '+ ball.y);
    console.log('ballX is '+ ball.x + 'and ball y is '+ ball.y);
    
}

//update screen
function update(){
    requestAnimationFrame(update,screen);
    movePlayer();
    moveBall();
    render();
    edgeScreen();
}
