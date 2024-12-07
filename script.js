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

   notaN.text(notavalue)
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

$("#main").slideDown(500)

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
   const altnota = $("#altnota");
   if (altnota.val() !== "") {
       const nota = parseFloat(altnota.val()); 
       if (nota <= 10 && nota >= 0) { 
           const materia = $("#salvar").attr("materia");
           let Notas = JSON.parse(localStorage.getItem("Notas")) || {}; 
           Notas[materia] = nota;
           localStorage.setItem("Notas", JSON.stringify(Notas));
           console.log(materia + ": " + nota);
           window.location.reload()
       } else {
           console.error("A nota deve ser menor ou igual a 10.");
       }
   } else {
       console.error("O campo de nota está vazio.");
   }
});
