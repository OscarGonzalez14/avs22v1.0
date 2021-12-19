<!DOCTYPE html>
<html>
	<body>
	   <input type='text' id=“hid_id” class='hid_id' value='1' />
	   <input type='text' id=“hid_id_dos” class='hid_id' value='2' />
	   <button onclick="myFunction()">Click me</button>

	<script>
	function myFunction() {
	var id = document.getElementsByClassName("hid_id");
	  //if (id.length > 0) {
	//	  console.log(id[0].value);
	 // }

	  for(i=0;i<id.length;i++){
       console.log(id[i].value);
       console.log(id[i].id );
	  }
	}

 // Ejercicio 172: Buscar el índice de un objeto en un arreglo a partir del valor de una propiedad.

let daniela = {nombre: 'Daniela', email: 'daniela@mail.com', edad: 23};
let german = {nombre: 'Germán', email: 'german@mail.com', edad: 29};
let edward = {nombre: 'Edward', email: 'edward@mail.com', edad: 33};

let personas = [daniela, german, edward];

console.log(personas);

console.log();

let indice = personas.findIndex((objeto, indice, personas) => {
    return objeto.nombre == 'Daniela';
});

console.log(indice);

	</script>

	</body>
</html>
