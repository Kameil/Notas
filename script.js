const materias = ["Biologia", "Fisica", "Quimica", "Filosofia", "Geografia", "Historia", "Sociologia", "Arte", "educacao fisica", "ingles", "ingles II", "Portugues", "Matematica"]

for(materiaNome of materias) {
   const materia = $("<div>")
   materia.addClass("materia")
   materia.attr("id", String(materiaNome).toLowerCase())
   const nota = $("<div>")
   nota.addClass("nota")
   const notaN = $("<p>")
   notaN.text("7,0")
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
   const materias = $("#materias")
   materias.append(materia)
}

const materiadeteste = $("#1")
materiadeteste.remove()