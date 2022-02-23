palabras = ["ABAJO",
"ABANDONAR",
"ABUELA",
"PERRO",
"GATO",
"LEON",
"RINOCERONTE"];






var btnAgregarPalabras = document.getElementById('btnRegistrar');

   btnAgregarPalabras.addEventListener("click", function(event){

     agregarPalabra();
    
 });
 
 function agregarPalabra() {

    var palabraCapturada = document.getElementById('agregarPalabra').value;
    var nuevaPalabra = palabraCapturada.toUpperCase();
    

    if(nuevaPalabra == ""){
        alert("Debe insertar una palabra , no debe quedar vacio");
        document.getElementById("agregarPalabra").focus();
    }else{
        if(!palabras.includes(nuevaPalabra)){
            palabras.push(nuevaPalabra);
            alert("Se registro con exito la palabra: " +nuevaPalabra);
        }else{
            alert("La palabra esta repetida , favor de ingresar una nueva.");
            document.getElementById("agregarPalabra").focus();        
        }
    }   
    
    document.getElementById('agregarPalabra').value = "";
}