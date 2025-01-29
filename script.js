
let data
let totalQuizzes
let proximoQuiz = 1


fetch('quiz.json')
  .then(response => response.json())
  .then((json) => {
    
    data = json
    totalQuizzes = Object.keys(data).length + 1

    //Pergunta
    let pergunta = document.getElementById('pergunta')
    pergunta.innerHTML = data['quiz-1'].pergunta

    //A
    let A = document.getElementById('A')
    A.innerHTML = data['quiz-1'].A
    
    //B
    let B = document.getElementById('B')
    B.innerHTML = data['quiz-1'].B

    //C
    let C = document.getElementById('C')
    C.innerHTML = data['quiz-1'].C
    
    //D
    let D = document.getElementById('D')
    D.innerHTML = data['quiz-1'].D
  })
  .catch(error => console.error('Erro ao carregar o JSON:', error))


//Proximo quizz
function proxima() {
  
  proximoQuiz++

  if (proximoQuiz === totalQuizzes) {
    proximoQuiz = 1; // Reseta para o primeiro quiz
  }


  console.log(proximoQuiz)

  //Pergunta
  let pergunta = document.getElementById('pergunta')
  pergunta.innerHTML = data[`quiz-${proximoQuiz}`].pergunta

  //A
  let A = document.getElementById('A')
  A.innerHTML = data[`quiz-${proximoQuiz}`].A
    
  //B
  let B = document.getElementById('B')
  B.innerHTML = data[`quiz-${proximoQuiz}`].B

  //C
  let C = document.getElementById('C')
  C.innerHTML = data[`quiz-${proximoQuiz}`].C
    
  //D
  let D = document.getElementById('D')
  D.innerHTML = data[`quiz-${proximoQuiz}`].D
}



function escolha(respostaExata) {

  // Acessando o valor correto de "vamo" dentro do objeto "data"
  let vamo = data[`quiz-${proximoQuiz}`][`${respostaExata}`];
  console.log(vamo);

  // Obtém a resposta correta do quiz atual
  let respostaCorreta = data[`quiz-${proximoQuiz}`].respostaCorreta;
  console.log(respostaCorreta)

  // Compara a resposta do usuário com a resposta correta
  if (vamo === respostaCorreta) {
    console.log("Resposta correta!");

    


  } else {
    console.log("Resposta incorreta. Tente novamente.");
  }
}