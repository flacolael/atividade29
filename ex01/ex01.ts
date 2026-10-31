// Exercício 01: Situação do aluno no semestre
// Conteúdos: if, else if, else, operadores lógicos, ternário, funções

const campoNome = document.getElementById('nome') as HTMLInputElement;
const campoN1 = document.getElementById('n1') as HTMLInputElement;
const campoN2 = document.getElementById('n2') as HTMLInputElement;
const campoFrequencia = document.getElementById('frequencia') as HTMLInputElement;
const botao = document.getElementById('calcular') as HTMLButtonElement;
const saida = document.getElementById('resultado') as HTMLElement;

// Média aritmética das duas notas
function calcularMedia(n1: number, n2: number): number {
  return (n1 + n2) / 2;
}

// Notas de 0 a 10 e frequência de 0 a 100. Campo vazio vira NaN (inválido).
function dadosValidos(n1: number, n2: number, frequencia: number): boolean {
  return !(
    Number.isNaN(n1) || Number.isNaN(n2) || Number.isNaN(frequencia) ||
    n1 < 0 || n1 > 10 ||
    n2 < 0 || n2 > 10 ||
    frequencia < 0 || frequencia > 100
  );
}

// A frequência é testada PRIMEIRO: reprova por falta qualquer que seja a média.
// Depois testamos do maior limite para o menor (7, depois 4).
function situacao(media: number, frequencia: number): string {
  if (frequencia < 75) {
    return 'Reprovado por falta';
  } else if (media >= 7) {
    return 'Aprovado';
  } else if (media >= 4) {
    return `Exame final (precisa tirar ${(10 - media).toFixed(1)})`;
  } else {
    return 'Reprovado por nota';
  }
}

botao.addEventListener('click', () => {
  const n1 = campoN1.valueAsNumber;
  const n2 = campoN2.valueAsNumber;
  const frequencia = campoFrequencia.valueAsNumber;

  // Retorno antecipado quando os dados são inválidos
  if (!dadosValidos(n1, n2, frequencia)) {
    saida.textContent = 'Dados inválidos';
    saida.className = 'erro';
    return;
  }

  const media = calcularMedia(n1, n2);
  const resultado = situacao(media, frequencia);

  saida.textContent = `${campoNome.value}: média ${media.toFixed(1)}. ${resultado}`;
  // Ternário: verde se aprovado, vermelho nos outros casos
  saida.className = resultado === 'Aprovado' ? 'sucesso' : 'erro';
});
