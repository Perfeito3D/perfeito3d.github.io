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

document.addEventListener('DOMContentLoaded', () => {

/* =======================
   TAREFAS
======================= */

const tarefas = {

"Segunda-feira": [

  {
    hora: "08:15",
    titulo: "OLX + Marketplace",
    descricao: "Anunciar produtos"
  },

  {
    hora: "12:30",
    titulo: "Instagram Story",
    descricao: "Mostrar impressora a funcionar"
  },

  {
    hora: "20:38",
    titulo: "TikTok",
    descricao: "Vídeo principal do produto"
  },

  {
    hora: "21:15",
    titulo: "Instagram Reel",
    descricao: "Repost do TikTok"
  }

],

"Terça-feira": [

  {
    hora: "08:21",
    titulo: "Marketplace",
    descricao: "Publicar foto produto"
  },

  {
    hora: "13:00",
    titulo: "Story",
    descricao: "Nova impressão"
  },

  {
    hora: "20:52",
    titulo: "TikTok/Reel",
    descricao: "Vídeo satisfying"
  }

],

"Quarta-feira": [

  {
    hora: "08:15",
    titulo: "Repost anúncio",
    descricao: "Marketplace + OLX"
  },

  {
    hora: "12:45",
    titulo: "Instagram Story",
    descricao: "Mostrar impressão quase pronta"
  },

  {
    hora: "20:38",
    titulo: "TikTok",
    descricao: "Vídeo viral/articulado"
  },

  {
    hora: "22:06",
    titulo: "Instagram Reel",
    descricao: "Vídeo curto extra"
  }

],

"Quinta-feira": [

  {
    hora: "08:45",
    titulo: "Marketplace",
    descricao: "Anunciar produto novo"
  },

  {
    hora: "18:47",
    titulo: "TikTok Teaser",
    descricao: "Preview do vídeo"
  },

  {
    hora: "20:38",
    titulo: "TikTok",
    descricao: "Vídeo principal"
  },

  {
    hora: "21:12",
    titulo: "Instagram Reel",
    descricao: "Produto novo"
  }

],

"Sexta-feira": [

  {
    hora: "08:15",
    titulo: "OLX + Vinted",
    descricao: "Atualizar anúncios"
  },

  {
    hora: "19:18",
    titulo: "TikTok",
    descricao: "Setup/impressão"
  },

  {
    hora: "20:52",
    titulo: "Instagram Reel",
    descricao: "Produto pronto"
  },

  {
    hora: "22:06",
    titulo: "TikTok Extra",
    descricao: "Vídeo trending"
  }

],

"Sábado": [

  {
    hora: "10:15",
    titulo: "Marketplace",
    descricao: "Produto disponível hoje"
  },

  {
    hora: "13:20",
    titulo: "Story",
    descricao: "Embalagem/envio"
  },

  {
    hora: "20:38",
    titulo: "TikTok",
    descricao: "Vídeo principal"
  },

  {
    hora: "21:40",
    titulo: "Instagram Reel",
    descricao: "Vídeo rápido"
  }

],

"Domingo": [

  {
    hora: "11:30",
    titulo: "Marketplace",
    descricao: "Repost produto"
  },

  {
    hora: "18:30",
    titulo: "Story",
    descricao: "Teaser melhor produto"
  },

  {
    hora: "20:38",
    titulo: "TikTok",
    descricao: "Melhor vídeo da semana"
  },

  {
    hora: "21:15",
    titulo: "Instagram Reel",
    descricao: "Repost TikTok"
  }

]

}

const diasSemana =
  document.getElementById('diasSemana')

const tarefasLista =
  document.getElementById('tarefasLista')

Object.keys(tarefas).forEach(dia => {

  diasSemana.innerHTML += `

    <button
      class="dia-btn"
      onclick="mostrarTarefas('${dia}')"
    >
      ${dia}
    </button>

  `
})

window.mostrarTarefas = function(dia){

  tarefasLista.innerHTML = ''

  tarefas[dia].forEach(tarefa => {

    tarefasLista.innerHTML += `

      <div class="task-item">

        <div class="task-hour">
          ${tarefa.hora}
        </div>

        <div class="task-info">

          <h4>
            ${tarefa.titulo}
          </h4>

          <p>
            ${tarefa.descricao}
          </p>

        </div>

      </div>

    `
  })
}

/* MOSTRAR SEGUNDA */

mostrarTarefas('Segunda-feira')

})