const materias = ["Biologia", "Fisica", "Quimica", "Filosofia", "Geografia", "Historia", "Sociologia", "Arte", "educacao fisica", "ingles", "ingles II", "Portugues", "Matematica"]

Notas = {}

if (!localStorage.getItem("Notas")) {
   for(materia of materias) {
      materiaNome = String(materia).toLowerCase().replaceAll(" ", "_")
      Notas[materiaNome] = 7,0
   
   }
   localStorage.setItem("Notas", JSON.stringify(Notas))
}else {
   Notas = JSON.parse(localStorage.getItem("Notas"));
}



for(materiaNome of materias) {
   const materia = $("<div>")
   materia.addClass("materia")
   materia.attr("id", String(materiaNome).toLowerCase().replaceAll(" ", "_"))
   const nota = $("<div>")
   nota.addClass("nota")
   const notaN = $("<p>")
   let notavalue = Notas[String(materiaNome).toLowerCase().replaceAll(" ", "_")]
   if (parseFloat(notavalue) < 6) {
      nota.addClass("nota-baixa")
   }else{
      nota.addClass("nota-boa")
   }
   notavaluecomvirgula = String(notavalue).replace(".", ",") 
   notaN.text(notavaluecomvirgula)
   nota.append(notaN)
   materia.append(nota)

   const nomedm = $("<div>")
   nomedm.addClass("nomedm")
   const nomeN = $("<p>")
   const nomeM = $("<p>")
   nomeM.addClass("m")
   nomeN.addClass("n")
   nomeN.text(materiaNome)
   nomeM.text("media aritimetica")
   nomedm.append(nomeN)
   nomedm.append(nomeM)
   materia.append(nomedm)

   const edit = $("<div>")
   edit.addClass("edit")
   edit.css("display", "none")
   edit.html('<span class="material-symbols-outlined">edit</span>')
   edit.attr("materia", String(materiaNome).toLowerCase().replaceAll(" ", "_"))
   materia.append(edit)

   const materias = $("#materias")
   materias.append(materia)
}

$("#main").fadeIn(300)

const materiadeteste = $("#1")
materiadeteste.remove()

$(".materia").mouseover((event) => {
    $(event.currentTarget).find(".edit").show();
}).mouseout((event) => {
   $(event.currentTarget).find(".edit").hide()
})

$(".edit").click((event) => {
   const materiaNome = $(event.currentTarget).attr("materia")
   const inputnotamain = $("#inputnotamain") 
   inputnotamain
   .css("display", "flex")
   .hide()
   .fadeIn()
   $("#salvar").attr("materia", materiaNome)
   console.log(materiaNome)
})

$("#cancelar").click(() => {
   const inputnotamain = $("#inputnotamain")
   inputnotamain.fadeOut()
   $("#altnota").val(null)
})

$("#mudarbagulho").submit((event) => {
   event.preventDefault()
   const altnota = $("#altnota");
   if (altnota.val() !== "") {
       const nota = parseFloat(altnota.val()); 
       if (nota <= 10 && nota >= 0) { 
           const materia = $("#salvar").attr("materia");
           let Notas = JSON.parse(localStorage.getItem("Notas")) || {}; 
           Notas[materia] = nota;
           localStorage.setItem("Notas", JSON.stringify(Notas));
           console.log(materia + ": " + nota);
           window.location.hash = materia
           setTimeout(() => {
            window.location.reload(true) 
           }, 50);
           

       } else {
           console.error("A nota deve ser menor ou igual a 10.");
       }
   } else {
       console.error("O campo de nota está vazio.");
   }
});


$(document).ready(function () {
   const hash = document.location.hash
   if (hash){
      const materiaDiv = $(hash)
      $('#materias').animate({
         scrollTop: materiaDiv.offset().top - $('#materias').offset().top + $('#materias').scrollTop() // Ajuste para rolar no contêiner
     }, 1000);
     let originalBgColor = materiaDiv.css("background-color");
            let tapiscando = false; 

            let picaintervalo = setInterval(() => {
                if (tapiscando) {
                    materiaDiv.css("background-color", originalBgColor);
                } else {
                    materiaDiv.css("background-color", "rgba(255, 255, 0, 0.5)");
                }
                tapiscando = !tapiscando;
            }, 500); 
            setTimeout(() => {
                clearInterval(picaintervalo); // Para o piscar
                materiaDiv.css("background-color", originalBgColor); // Retorna à cor original
            }, 2500);
            history.replaceState(null, document.title, window.location.pathname + window.location.search)
   }
});

$("#altnota").on("input", (event) => {
   event.preventDefault()
   altnota = $(event.currentTarget)
   if (altnota.val() <= 10 && altnota.val() >= 0) {
      const inputexp = $("#inputexp")
      if (String(altnota.val()).length <= 3) {
         inputexp.text(String(altnota.val()).replace(".", ","))
      }
      
      inputexp.removeClass("nota-boa")
      inputexp.addClass("nota-baixa")
      if (altnota.val() >= 6){
         inputexp.removeClass("nota-baixa")
         inputexp.addClass("nota-boa")
      }
   }
})