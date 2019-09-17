window.onload = init;
var dice1,dice2;
var dado1,dado2;
var puntaje;
var primertiro = 0;
var segundointento= 0;
var mensaje;
var name;
var PuntajeActual=0;
var persons;
var Usuarios=[];
var RecUsuarios=[];
var numUsuario;
var person = {
    "name" : "david",
    "record": []
};



function init(){
    dado1 = document.getElementById("dado1");
    dado2 = document.getElementById("dado2");
    mensaje = document.getElementById("mensaje"); 
    segundointento=0;
}

function jugar(){
    name = document.getElementById("name").value;
    cambiodepantalla("inicio","dice");
    
    Usuarios = JSON.parse(localStorage.getItem('person'));
    if(Usuarios === null){
        Usuarios = [];
    }
    var founduser;
    for(i in Usuarios){
        if(Usuarios[i].name === name ){
           founduser = true;
           numUsuario = parseInt(i);
        }
    }
    if(founduser!=true){
        var person = {
            "name" : name,
            "record": [0,0,0,0,0,0,0,0,0,0]
        };

        Usuarios.push(person);
        localStorage.setItem('person', JSON.stringify(Usuarios));
        numUsuario = Usuarios.length - 1 ;
    }
    top10();

}

function cambiodepantalla(pant1,pant2){
    document.getElementById(pant1).classList.add("none");
    document.getElementById(pant2).classList.remove("none");
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
            PuntajeActual++;
        }
        if(suma === 2 || suma === 3 || suma === 12){
           
            mensaje.innerText="perdio "+suma;
            primertiro = 0;
            segundointento =0;
            perdio();
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
                PuntajeActual++;
              }
              else{
                  mensaje.innerText = "tienes que sacar "+puntaje+" sacaste "+suma;
              }
        }
        else{
          
            mensaje.innerText = "perdiste sacaste"+suma;
            primertiro = 0;
            segundointento =0;
            perdio();
        }
      
    }
}

function perdio(){
    var haverecord = false;
    for(i in Usuarios[numUsuario].record){
        if(Usuarios[numUsuario].record[i] === PuntajeActual){
            haverecord=true;
        }
    }

    if(haverecord != true){
        Usuarios[numUsuario].record.push(PuntajeActual);
        Usuarios[numUsuario].record.sort((a,b)=>b-a);
        Usuarios[numUsuario].record.pop();
        localStorage.setItem('person', JSON.stringify(Usuarios));
        recordmundial();
    }
    else{
        PuntajeActual = 0;
    }
}

function recordmundial(){
    RecUsuarios = JSON.parse(localStorage.getItem('record'));
    if(RecUsuarios === null){
        RecUsuarios = [];
        var recordg = {
            "name" : "N/A",
            "value" : 0
        };
        RecUsuarios.push(recordg);RecUsuarios.push(recordg);RecUsuarios.push(recordg);RecUsuarios.push(recordg);RecUsuarios.push(recordg);RecUsuarios.push(recordg);RecUsuarios.push(recordg);RecUsuarios.push(recordg);RecUsuarios.push(recordg);RecUsuarios.push(recordg);
        
    }
        var recordd = {
            "name" : name,
            "value" : PuntajeActual
        };
        RecUsuarios.push(recordd);
        RecUsuarios.sort((a,b)=>b.value-a.value);
        RecUsuarios.pop();
        localStorage.setItem('record', JSON.stringify(RecUsuarios));
    
        PuntajeActual = 0;
}

function top10(){
    cambiodepantalla("btn-topmundial","btn-top10");

}
function topmundial(){
    cambiodepantalla("btn-top10","btn-topmundial");
    
}