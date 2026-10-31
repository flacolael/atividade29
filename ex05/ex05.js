// Exercício 05: Caixa do mercado (integrador)
// Conteúdos: rest, sobrecarga, switch, for/break/continue, tipo de função, ternário...
const campoItens = document.getElementById('itens');
const campoCupom = document.getElementById('cupom');
const campoFidelidade = document.getElementById('fidelidade');
const botao = document.getElementById('fechar');
const saida = document.getElementById('resultado');
const MAX_ITENS = 20;
const formatarReal = (valor) => `R$ ${valor.toFixed(2)}`;
// Lê um preço por linha. Aceita ponto ou vírgula como separador decimal.
function lerPrecos(texto) {
    const linhas = texto.split('\n');
    const precos = [];
    let ignorados = 0;
    for (let i = 0; i < linhas.length; i++) {
        const linha = linhas[i].trim();
        if (linha === '') {
            continue; // linha vazia: ignora sem contar
        }
        const valor = Number(linha.replace(',', '.'));
        if (!Number.isFinite(valor) || valor <= 0) {
            ignorados++; // inválida: ignora e conta
            continue;
        }
        precos.push(valor);
        if (precos.length === MAX_ITENS) {
            break; // limite de 20 itens por compra
        }
    }
    return { precos, ignorados };
}
// Parâmetro rest: recebe qualquer quantidade de preços
function somarItens(...precos) {
    let soma = 0;
    for (const preco of precos) {
        soma += preco;
    }
    return soma;
}
function calcularDesconto(total, desconto) {
    if (typeof desconto === 'number') {
        return (total * desconto) / 100;
    }
    switch (desconto.toUpperCase()) {
        case 'BEMVINDO':
            return (total * 10) / 100;
        case 'PROMO20':
            return (total * 20) / 100;
        case 'MENOS15':
            return total >= 100 ? 15 : 0;
        default:
            return 0;
    }
}
botao.addEventListener('click', () => {
    const { precos, ignorados } = lerPrecos(campoItens.value);
    if (precos.length === 0) {
        saida.textContent = 'Nenhum item válido';
        saida.className = 'erro';
        return;
    }
    const subtotal = somarItens(...precos); // spread
    const codigo = campoCupom.value.trim();
    const descontoCupom = codigo !== '' ? calcularDesconto(subtotal, codigo) : 0;
    const cupomInvalido = codigo !== '' && descontoCupom === 0;
    const aposCupom = subtotal - descontoCupom;
    const descontoFidelidade = campoFidelidade.checked ? calcularDesconto(aposCupom, 5) : 0;
    const total = aposCupom - descontoFidelidade;
    let texto = `Itens: ${precos.length}`;
    if (ignorados > 0) {
        texto += ` (${ignorados} ${ignorados === 1 ? 'linha ignorada' : 'linhas ignoradas'})`;
    }
    texto += `\nSubtotal: ${formatarReal(subtotal)}`;
    if (cupomInvalido) {
        texto += '\nCupom inválido ou não aplicável';
    }
    else if (codigo !== '') {
        texto += `\nCupom ${codigo.toUpperCase()}: - ${formatarReal(descontoCupom)}`;
    }
    if (campoFidelidade.checked) {
        texto += `\nFidelidade (5%): - ${formatarReal(descontoFidelidade)}`;
    }
    texto += `\nTotal a pagar: ${formatarReal(total)}`;
    saida.textContent = texto;
    saida.className = cupomInvalido ? 'alerta' : 'sucesso';
});
export {};
//# sourceMappingURL=ex05.js.map