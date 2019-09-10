window.onload = init;
var dice1,dice2;
var dado1,dado2;
var puntaje;
var primertiro = 0;
var segundointento= 0;
var mensaje;
function init(){
    dado1 = document.getElementById("dado1");
    dado2 = document.getElementById("dado2");
    mensaje = document.getElementById("mensaje"); 
    segundointento=0;
}


function tirar(){
    var suma;
    dice1 = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;
    dado1.src = "img/dado"+dice1+".PNG";
    dado2.src = "img/dado"+dice2+".PNG";
    suma = dice1+dice2;
    if(primertiro === 0){
        puntaje = suma;
    }
    primertiro++;
    comprobar(suma);
}


function comprobar(suma){
    if(segundointento === 0){
        if(suma === 7 || suma === 11){
            
            mensaje.innerText = "gano "+suma;
            primertiro = 0; 
            segundointento = 0;
        }
        if(suma === 2 || suma === 3 || suma === 12){
           
            mensaje.innerText="perdio "+suma;
            primertiro = 0;
            segundointento =0;
        }
        if(suma === 4 || suma === 5 || suma===6 || suma === 8 || suma === 9 || suma === 10){
            
            mensaje.innerText = "segundo intento "+suma;
            segundointento=1;

        }
    }
    else{
        if(suma === 4 || suma === 5 || suma===6 || suma === 8 || suma === 9 || suma === 10 || suma === 7|| suma === 11){
            if(puntaje === suma){
            
                mensaje.innerText = "ganaste "+suma;
              }
              else{
                
                  mensaje.innerText = "tienes que sacar "+puntaje+" sacaste "+suma;
              }
        }
        else{
          
            mensaje.innerText = "perdiste sacaste"+suma;
            primertiro = 0;
            segundointento =0;
        }
      
    }
}