let data
let totalQuizzes
let proximoQuiz = 1

//Requisita perguntas e respostas
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


//Pula para o proximo quiz
function proxima() {
  
  proximoQuiz++

  if (proximoQuiz === totalQuizzes) {
    proximoQuiz = 1; // Reseta para o primeiro quiz
  }

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
  let vamo = data[`quiz-${proximoQuiz}`][`${respostaExata}`]

  // Obtém a resposta correta do quiz atual
  let respostaCorreta = data[`quiz-${proximoQuiz}`].respostaCorreta

  let pts = document.getElementById("pontosExatos")

  // Compara a resposta do usuário com a resposta correta
  if (vamo === respostaCorreta){

    //Adiciona cor do botão quando acertar a respostar
    let buttonColors = document.getElementById(`${respostaExata}`)
    buttonColors.style.backgroundColor = '#198754'
    buttonColors.style.color = 'white'
    
    //Adiciona um texto de "Resposta Correta!"
    let exibirResposta = document.getElementById("respostaExata")
    exibirResposta.innerHTML = "Resposta correta!"
    exibirResposta.style.color = "green"
    console.log("Resposta correta!")

    //Adiciona a cor vermelha dos pontos
    let pontosColor = document.getElementById('pontosRedGreen')
    pontosColor.style.color = '#198754'
    
    //Depois de um timer ele remove o texto "Resposta Correta!" e executa o proximo quiz
    setTimeout(() => {

      //Chama o funcão e executa o proximo quiz
      proxima()

      //Remove o Texto "Resposta Correta!"
      exibirResposta.innerHTML = "Escolha uma resposta!"
      exibirResposta.style.color = 'white'

      //Remove cor do botão depois de acertar a respostar
      let buttonColors = document.getElementById(`${respostaExata}`)
      buttonColors.style.backgroundColor = 'white'
      buttonColors.style.color = 'black'

      //Remove a cor vermelha dos pontos
      pontosColor.style.color = 'white'
    }, 1800);
    
    //Sistema de pontuação, se acertar a resposta ganha 10 PTS
    let valorAtual = parseInt(pts.textContent) || 0;
    pts.textContent = valorAtual + 10;
    
  } else {

    //Adiciona cor do botão quando acertar a respostar
    let buttonColors = document.getElementById(`${respostaExata}`)
    buttonColors.style.backgroundColor = 'red'
    buttonColors.style.color = 'white'

    //Adiciona um texto de "Resposta incorreta. Tente novamente."
    let exibirResposta = document.getElementById("respostaExata")
    exibirResposta.innerHTML = "Resposta incorreta. Tente novamente."
    exibirResposta.style.color = "red"

    //Sistema de pontuação, se errar a resposta perde 5 PTS
    let valorAtual = parseInt(pts.textContent) || 0
    pts.textContent = Math.max(-0, valorAtual - 5)

    //Adiciona a cor vermelha dos pontos
    let pontosColor = document.getElementById('pontosRedGreen')
    pontosColor.style.color = 'red'

    //Depois de um timer ele remove o texto "Resposta incorreta. Tente novamente."
    setTimeout(() => {

      //Remove o Texto "Resposta "Resposta incorreta. Tente novamente."
      exibirResposta.innerHTML = "Escolha uma resposta!"
      exibirResposta.style.color = 'white'

      //Adiciona cor do botão quando errar a respostar
      let buttonColors = document.getElementById(`${respostaExata}`)
      buttonColors.style.backgroundColor = 'white'
      buttonColors.style.color = 'black'

      //Remove a cor vermelha dos pontos
      pontosColor.style.color = 'white'
    }, 1800);
  }
}

function repeat() {
  //Resetando a numeração e voltando para o quiz 01
  proximoQuiz = 0

  //Requisitando o quiz 01
  proxima()

  //Reseta os PTS
  let valorAtual = document.getElementById('pontosExatos')
  valorAtual.innerHTML = 0

}


//Função para exibir ou remover a aba de adição de perguntas
const adicionar = document.getElementById('adicionarPerguntas')

//exibe a aba 
function add() {
  adicionar.style.display = 'flex'
}

//remove a aba
function fechar() {
  adicionar.style.display = 'none'
}

//Função que dispara o evento de adição de perguntas
function adicionarQuiz(){

  //Ao adicionar novas pergunta vai ser exibir um alerta de sucesso
  let adicionadoAlert = document.getElementById('adicionadoAlert')
  adicionadoAlert.innerHTML = 'Pergunta e respotas adicionadas com SUCESSO!!!'
  
  //Esse alerta vai ter a cor VERDE
  adicionadoAlert.style.color = '#198754'

  //Ao adicionar novas pergunta o vai ser exibir um alerta de sucesso
  let addTitle = document.getElementById('addTitle')
  addTitle.innerHTML = 'Pergunta adicionada!'
  
  //Esse alerta vai ter a cor VERDE
  addTitle.style.color = '#198754'

  //Timer que remove de algumas coisas quando a pergunta for adicionada
  setTimeout(() => {

    //Chama a função de fechar o opção de adicionar novas perguntas
    fechar()

    //Quando o tempo passar ele vai reexibir a mensagem e a cor anterior
    addTitle.innerHTML = 'Adicione uma pergunta!'
    addTitle.style.color = 'white'

    //Quando o tempo passar ele vai reexibir a mensagem e a cor anterior
    adicionadoAlert.innerHTML = 'Adicione uma pergunta ao quiz!'
    adicionadoAlert.style.color = 'white'
  }, 1800);
}