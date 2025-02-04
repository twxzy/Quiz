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

  let respostaCorreta = data[`quiz-${proximoQuiz}`].respostaCorreta

  let pts = document.getElementById("pontosExatos")

  // Compara a resposta do usuário com a resposta correta
  if (vamo === respostaCorreta){

    let buttonColors = document.getElementById(`${respostaExata}`)
    buttonColors.style.backgroundColor = '#198754'
    buttonColors.style.color = 'white'

    let exibirResposta = document.getElementById("respostaExata")
    exibirResposta.innerHTML = "Resposta correta!"
    exibirResposta.style.color = "green"
    console.log("Resposta correta!")

    let pontosColor = document.getElementById('pontosRedGreen')
    pontosColor.style.color = '#198754'
    
    //Depois de um timer ele remove o texto "Resposta Correta!" e executa o proximo quiz
    setTimeout(() => {

      proxima()

      exibirResposta.innerHTML = "Escolha uma resposta!"
      exibirResposta.style.color = 'white'

      let buttonColors = document.getElementById(`${respostaExata}`)
      buttonColors.style.backgroundColor = 'white'
      buttonColors.style.color = 'black'

      pontosColor.style.color = 'white'
    }, 1800);
    
    let valorAtual = parseInt(pts.textContent) || 0;
    pts.textContent = valorAtual + 10;
    
  } else {

    let buttonColors = document.getElementById(`${respostaExata}`)
    buttonColors.style.backgroundColor = 'red'
    buttonColors.style.color = 'white'

    let exibirResposta = document.getElementById("respostaExata")
    exibirResposta.innerHTML = "Resposta incorreta. Tente novamente."
    exibirResposta.style.color = "red"

    let valorAtual = parseInt(pts.textContent) || 0
    pts.textContent = Math.max(-0, valorAtual - 5)

    let pontosColor = document.getElementById('pontosRedGreen')
    pontosColor.style.color = 'red'

    setTimeout(() => {

      exibirResposta.innerHTML = "Escolha uma resposta!"
      exibirResposta.style.color = 'white'

      let buttonColors = document.getElementById(`${respostaExata}`)
      buttonColors.style.backgroundColor = 'white'
      buttonColors.style.color = 'black'

      pontosColor.style.color = 'white'
    }, 1800);
  }
}

//Reseta o quiz
function repeat() {
  proximoQuiz = 0

  proxima()

  let valorAtual = document.getElementById('pontosExatos')
  valorAtual.innerHTML = 0

}


//Função para exibir ou remover a aba de adição de perguntas
const adicionar = document.getElementById('adicionarPerguntas')

function add() {
  adicionar.style.display = 'flex'
}

function fechar() {
  adicionar.style.display = 'none'
}



//Função que dispara o evento de adição de perguntas
function adicionarQuiz(){

  let adicionadoAlert = document.getElementById('adicionadoAlert')
  adicionadoAlert.innerHTML = 'Pergunta e respotas adicionadas com SUCESSO!!!'
  
  adicionadoAlert.style.color = '#198754'

  let addTitle = document.getElementById('addTitle')
  addTitle.innerHTML = 'Pergunta adicionada!'
  
  addTitle.style.color = '#198754'


  let pergunta = document.getElementById('inputPergunta')

  let respostaA = document.getElementById('respostaA')

  let respostaB = document.getElementById('respostaB')

  let respostaC = document.getElementById('respostaC')

  let respostaD = document.getElementById('respostaD')

  let respostaCerta = document.getElementById('respostaCerta')
  

  //Timer que remove de algumas coisas quando a pergunta for adicionada
  setTimeout(() => {

    fechar()

    addTitle.innerHTML = 'Adicione uma pergunta!'
    addTitle.style.color = 'white'

    adicionadoAlert.innerHTML = 'Adicione uma pergunta ao quiz!'
    adicionadoAlert.style.color = 'white'

    pergunta.value = ''
    respostaA.value = ''
    respostaB.value = ''
    respostaC.value = ''
    respostaD.value = ''
    respostaCerta = ''

  }, 2000);
}