let token = null;
let produtoModalInstance = null;

document.addEventListener('DOMContentLoaded', () => {
  // Abas de login/cadastro
  const btnLogin = document.getElementById('btnLoginTab');
  const btnCadastro = document.getElementById('btnCadastroTab');
  const panelLogin = document.getElementById('loginPanel');
  const panelCadastro = document.getElementById('cadastroPanel');

  btnLogin.addEventListener('click', () => {
    btnLogin.classList.add('active');
    btnCadastro.classList.remove('active');
    panelLogin.style.display = 'block';
    panelCadastro.style.display = 'none';
  });
  btnCadastro.addEventListener('click', () => {
    btnCadastro.classList.add('active');
    btnLogin.classList.remove('active');
    panelLogin.style.display = 'none';
    panelCadastro.style.display = 'block';
  });

  // Modal
  const modalElement = document.getElementById('produtoModal');
  if (modalElement) produtoModalInstance = new bootstrap.Modal(modalElement);

  // Eventos dos formulários
  document.getElementById('loginForm').addEventListener('submit', fazerLogin);
  document.getElementById('registerForm').addEventListener('submit', fazerCadastro);
  document.getElementById('salvarProdutoBtn').addEventListener('click', salvarProduto);

  // Verificar token salvo
  const savedToken = localStorage.getItem('token');
  if (savedToken) {
    token = savedToken;
    mostrarSecaoProdutos();
    carregarTodasListas();
  }
});

async function fazerLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const senha = document.getElementById('loginSenha').value;
  const msgDiv = document.getElementById('authMessage');

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.mensagem || 'Erro no login');
    token = data.token;
    localStorage.setItem('token', token);
    mostrarMensagem(msgDiv, 'Login OK! Redirecionando...', 'success');
    setTimeout(() => {
      mostrarSecaoProdutos();
      carregarTodasListas();
    }, 1000);
  } catch (err) {
    mostrarMensagem(msgDiv, err.message, 'danger');
  }
}

async function fazerCadastro(e) {
  e.preventDefault();
  const nome = document.getElementById('regNome').value;
  const email = document.getElementById('regEmail').value;
  const senha = document.getElementById('regSenha').value;
  const msgDiv = document.getElementById('authMessage');

  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.mensagem || 'Erro no cadastro');
    mostrarMensagem(msgDiv, 'Cadastro realizado! Faça login.', 'success');
    document.getElementById('btnLoginTab').click();
  } catch (err) {
    mostrarMensagem(msgDiv, err.message, 'danger');
  }
}

function mostrarSecaoProdutos() {
  document.getElementById('produtosSection').style.display = 'block';
}

async function carregarTodasListas() {
  await carregarMeusProdutos();
  await carregarTodosProdutos();
}

async function carregarMeusProdutos() {
  try {
    const res = await fetch('/api/produtos', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Não autorizado');
    const produtos = await res.json();
    exibirProdutos(produtos, document.getElementById('meusProdutosList'), true);
  } catch (err) {
    document.getElementById('meusProdutosList').innerHTML = `<div class="col-12 text-center text-muted">Erro: ${err.message}</div>`;
  }
}

async function carregarTodosProdutos() {
  try {
    const res = await fetch('/api/produtos/todos');
    if (!res.ok) throw new Error('Erro ao carregar produtos');
    const produtos = await res.json();
    exibirProdutos(produtos, document.getElementById('todosProdutosList'), false);
  } catch (err) {
    document.getElementById('todosProdutosList').innerHTML = `<div class="col-12 text-center text-muted">Erro: ${err.message}</div>`;
  }
}

function exibirProdutos(produtos, container, comAcoes) {
  if (!produtos.length) {
    container.innerHTML = '<div class="col-12 text-center text-muted">Nenhum produto encontrado. ✨</div>';
    return;
  }
  container.innerHTML = produtos.map(p => `
    <div class="col-md-6 col-lg-4">
      <div class="produto-card p-3">
        <div class="d-flex justify-content-between">
          <h6 class="mb-1 fw-bold">${escapeHtml(p.nome)}</h6>
          ${comAcoes && p._id ? `
            <div>
              <i class="bi bi-pencil-square text-pink me-2" style="cursor:pointer" onclick="editarProduto('${p._id}')"></i>
              <i class="bi bi-trash3 text-pink" style="cursor:pointer" onclick="deletarProduto('${p._id}')"></i>
            </div>
          ` : ''}
        </div>
        <p class="small text-muted mb-1">${escapeHtml(p.categoria)}</p>
        <p class="fw-bold text-pink mb-1">R$ ${Number(p.preco).toFixed(2)}</p>
        <p class="small">${escapeHtml(p.descricao || '')}</p>
        ${!comAcoes && p.criadoPor ? `<p class="small text-muted mt-2"><i class="bi bi-person-circle"></i> Criado por: ${escapeHtml(p.criadoPor.name || p.criadoPor.email)}</p>` : ''}
      </div>
    </div>
  `).join('');
}

function limparFormProduto() {
  document.getElementById('produtoId').value = '';
  document.getElementById('produtoNome').value = '';
  document.getElementById('produtoPreco').value = '';
  document.getElementById('produtoCategoria').value = '';
  document.getElementById('produtoDescricao').value = '';
  document.getElementById('produtoAtributos').value = '';
}

function editarProduto(id) {
  fetch(`/api/produtos/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(produto => {
      document.getElementById('produtoId').value = produto._id;
      document.getElementById('produtoNome').value = produto.nome;
      document.getElementById('produtoPreco').value = produto.preco;
      document.getElementById('produtoCategoria').value = produto.categoria;
      document.getElementById('produtoDescricao').value = produto.descricao || '';
      document.getElementById('produtoAtributos').value = produto.atributosDinamicos ? JSON.stringify(produto.atributosDinamicos, null, 2) : '';
      if (produtoModalInstance) produtoModalInstance.show();
    })
    .catch(err => alert('Erro ao carregar produto: ' + err.message));
}

async function salvarProduto() {
  const id = document.getElementById('produtoId').value;
  const nome = document.getElementById('produtoNome').value;
  const preco = parseFloat(document.getElementById('produtoPreco').value);
  const categoria = document.getElementById('produtoCategoria').value;
  const descricao = document.getElementById('produtoDescricao').value;
  let atributosDinamicos = {};
  try {
    const attrText = document.getElementById('produtoAtributos').value.trim();
    if (attrText) atributosDinamicos = JSON.parse(attrText);
  } catch(e) { alert('JSON dos atributos inválido'); return; }

  const body = { nome, preco, categoria, descricao, atributosDinamicos };
  const method = id ? 'PUT' : 'POST';
  const url = id ? `/api/produtos/${id}` : '/api/produtos';

  try {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error('Erro ao salvar produto');
    if (produtoModalInstance) produtoModalInstance.hide();
    // Recarrega ambas as listas após salvar
    await carregarTodasListas();
  } catch (err) {
    alert(err.message);
  }
}

async function deletarProduto(id) {
  if (!confirm('Remover produto permanentemente?')) return;
  try {
    const res = await fetch(`/api/produtos/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Erro ao deletar');
    await carregarTodasListas();
  } catch (err) {
    alert(err.message);
  }
}

function mostrarMensagem(elemento, texto, tipo) {
  elemento.textContent = texto;
  elemento.classList.remove('d-none', 'alert-success', 'alert-danger');
  elemento.classList.add(`alert-${tipo}`);
  setTimeout(() => elemento.classList.add('d-none'), 3000);
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}