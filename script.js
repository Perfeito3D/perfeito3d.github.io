let pedidos = JSON.parse(localStorage.getItem('pedidos')) || []
let estoque = JSON.parse(localStorage.getItem('estoque')) || []

function salvarDados() {
  localStorage.setItem('pedidos', JSON.stringify(pedidos))
  localStorage.setItem('estoque', JSON.stringify(estoque))
}

function renderPedidos() {
  const tabela = document.getElementById('tabelaPedidos')
  tabela.innerHTML = ''

  pedidos.forEach((pedido, index) => {
    tabela.innerHTML += `
      <tr>
        <td>${pedido.cliente}</td>
        <td>${pedido.produto}</td>
        <td>€${Number(pedido.valor).toFixed(2)}</td>
        <td>
          <button onclick="removerPedido(${index})">Remover</button>
        </td>
      </tr>
    `
  })
}

function renderEstoque() {
  const tabela = document.getElementById('tabelaEstoque')
  tabela.innerHTML = ''

  estoque.forEach((item, index) => {
    tabela.innerHTML += `
      <tr>
        <td>${item.produto}</td>
        <td>${item.quantidade}</td>
        <td>
          <button onclick="removerEstoque(${index})">Remover</button>
        </td>
      </tr>
    `
  })
}

function abrirAba(id, event) {
  if(event){
    event.preventDefault()
  }

  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active')
  })

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active')
  })

  document.getElementById(id).classList.add('active')

  if(event && event.target){
    event.target.classList.add('active')
  }
}

function moeda(valor) {
  return valor.toLocaleString('pt-PT', {
    style: 'currency',
    currency: 'EUR'
  })
}

function calcular() {

  const materialKg = Number(document.getElementById('materialKg').value)
  const peso = Number(document.getElementById('peso').value)
  const energia = Number(document.getElementById('energia').value)
  const potencia = Number(document.getElementById('potencia').value)
  const horas = Number(document.getElementById('horas').value)
  const minutos = Number(document.getElementById('minutos').value)
  const maquinaHora = Number(document.getElementById('maquinaHora').value)
  const maoObra = Number(document.getElementById('maoObra').value)
  const margem = Number(document.getElementById('margem').value)

  const incluirIVA =
    document.getElementById('incluirIVA').checked

  const tempoTotal = horas + (minutos / 60)

  const custoMaterial =
    (peso * materialKg) / 1000

  const custoEnergia =
    ((potencia / 1000) * tempoTotal) * energia

  const custoMaquina =
    tempoTotal * maquinaHora

  const custoTotal =
    custoMaterial +
    custoEnergia +
    custoMaquina +
    maoObra

  let precoFinal =
    custoTotal * (1 + margem / 100)

  // IVA 22%
  if(incluirIVA){
    precoFinal = precoFinal * 1.22
  }

  document.getElementById('custoMaterial').innerText =
    moeda(custoMaterial)

  document.getElementById('custoEnergia').innerText =
    moeda(custoEnergia)

  document.getElementById('custoMaquina').innerText =
    moeda(custoMaquina)

  document.getElementById('custoTotal').innerText =
    moeda(custoTotal)

  document.getElementById('precoFinal').innerText =
    moeda(precoFinal)

    document.getElementById('incluirIVA')
  .addEventListener('change', calcular)
}

function adicionarPedido() {
  const cliente = document.getElementById('clientePedido').value
  const produto = document.getElementById('produtoPedido').value
  const valor = document.getElementById('valorPedido').value

  pedidos.push({
    cliente,
    produto,
    valor
  })

  salvarDados()
  renderPedidos()
}

function removerPedido(index) {
  pedidos.splice(index, 1)
  salvarDados()
  renderPedidos()
}

function adicionarEstoque() {
  const produto = document.getElementById('produtoEstoque').value
  const quantidade = document.getElementById('quantidadeEstoque').value

  estoque.push({
    produto,
    quantidade
  })

  salvarDados()
  renderEstoque()
}

function removerEstoque(index) {
  estoque.splice(index, 1)
  salvarDados()
  renderEstoque()
}

document.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', calcular)
})

calcular()
renderPedidos()
renderEstoque()

/* =======================
   LOADING + WELCOME
======================= */

window.addEventListener('load', () => {

  const loader =
    document.getElementById('loader')

  const welcome =
    document.getElementById('welcomeMessage')

  setTimeout(() => {

    loader.style.opacity = '0'

    loader.style.visibility = 'hidden'

    welcome.classList.add('show')

  }, 1800)

  setTimeout(() => {

    welcome.classList.remove('show')

  }, 5000)

})
const LINK_INSTAGRAM = "https://instagram.com/"