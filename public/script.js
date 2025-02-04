
let data;
let totalQuizzes = 0
let proximoQuiz = 1;

// Função para carregar o quiz e atualizar o HTML
fetch('http://localhost:3000/server/quiz.json')
  .then(res => res.json())
  .then(fetchedData => {
    data = fetchedData; // Atribui os dados recebidos à variável global
    inicial(); // Chama a função inicial logo após os dados serem carregados
    
  })
  .catch(console.error);

// Função inicial para preencher os dados da primeira pergunta
function inicial() {
  if (!data) return; // Verifica se o data foi carregado

  let pergunta = document.getElementById('pergunta');
  pergunta.innerHTML = data[`quiz-${proximoQuiz}`].pergunta;

  let A = document.getElementById('A');
  A.innerHTML = data[`quiz-${proximoQuiz}`].A;

  let B = document.getElementById('B');
  B.innerHTML = data[`quiz-${proximoQuiz}`].B;

  let C = document.getElementById('C');
  C.innerHTML = data[`quiz-${proximoQuiz}`].C;

  let D = document.getElementById('D');
  D.innerHTML = data[`quiz-${proximoQuiz}`].D;
}


// Função para carregar a próxima pergunta
function proxima() {
  proximoQuiz++;

  // Conta o número de quizzes no JSON
  totalQuizzes = Object.keys(data).length;
  console.log(totalQuizzes)

  if(proximoQuiz > totalQuizzes){
    proximoQuiz = 1
  }

  inicial()
}

// Verifica a resposta
function escolha(respostaExata) {
  let quizAtual = data[`quiz-${proximoQuiz}`];
  let respostaCorreta = quizAtual.respostaCorreta;
  let button = document.getElementById(respostaExata);
  let mensagem = document.getElementById('respostaExata');
  let pontos = document.getElementById('pontosExatos');
  let pontosColor = document.getElementById('pontosRedGreen');

  if (quizAtual[respostaExata] === respostaCorreta) {
    button.style.backgroundColor = '#198754';
    button.style.color = 'white';
    mensagem.innerHTML = 'Resposta correta!';
    mensagem.style.color = 'green';
    pontosColor.style.color = '#198754';
    pontos.textContent = (parseInt(pontos.textContent) || 0) + 10;
  } else {
    button.style.backgroundColor = 'red';
    button.style.color = 'white';
    mensagem.innerHTML = 'Resposta incorreta.';
    mensagem.style.color = 'red';
    pontosColor.style.color = 'red';
    pontos.textContent = Math.max(0, (parseInt(pontos.textContent) || 0) - 10);
  }

  setTimeout(() => {
    button.style.backgroundColor = 'white';
    button.style.color = 'black';
    mensagem.innerHTML = 'Escolha uma resposta!';
    mensagem.style.color = 'white';
    pontosColor.style.color = 'white';
    proxima();
  }, 1800);
}

// Reseta o quiz
function repeat() {
  proximoQuiz = 1;

  let pts = document.getElementById('pontosExatos')
  pts.innerHTML = '0'

  inicial()
}

//Abre e fecha aba
let addPergunta = document.getElementById('adicionarPerguntas')

function add(){
  addPergunta.style.display = 'flex'
}

function fechar() {
  addPergunta.style.display = 'none'
}

// Adicionar nova pergunta
function addQuestion() {  

  totalQuizzes++

  let campos = ['inputQuestion', 'respostaA', 'respostaB', 'respostaC', 'respostaD', 'respostaCerta'];
  let valores = {};
  
  for (let campo of campos) {
    valores[campo] = document.getElementById(campo).value;
    if (!valores[campo]) {
      alert('Preencha todos os campos!');
      return;
    }
  } 

  totalQuizzes = Object.keys(data).length;
  console.log(totalQuizzes)

  let novaPergunta = {
    pergunta: `${totalQuizzes + 1} - ${valores.inputQuestion}`,  // Corrigido para concatenar corretamente
    A: valores.respostaA,
    B: valores.respostaB,
    C: valores.respostaC,
    D: valores.respostaD,
    respostaCorreta: valores.respostaCerta
  };
  
  fetch('http://localhost:3000/add-question', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(novaPergunta)
  })
    .then(response => response.json())

  const addTitle = document.getElementById('addTitle')
  addTitle.style.color = 'green'
  addTitle.innerHTML = 'Pergunta adicionada!'


  const adicionadoAlert = document.getElementById('adicionadoAlert')
  adicionadoAlert.style.color = 'green'
  adicionadoAlert.innerHTML = 'Pergunta e respotas adicionadas com SUCESSO!!!'

  setTimeout(() => {
    window.location.reload()
  }, 1800);
}