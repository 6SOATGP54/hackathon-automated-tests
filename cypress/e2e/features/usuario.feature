# language: pt
Funcionalidade: Acesso de Usuário

  Cenário: Cadastro
    Dado que acessei a página de cadastro
    Quando preencher o formulário corretamente
    E clicar em Cadastrar-se
    Então o usuário deve ser cadastrado com sucesso

  Cenário: Login
    Dado que acessei a página de login
    Quando inserir as credenciais
    E clicar em Login
    Então devo ser redirecionado ao dashboard para upload de vídeo

  Cenário: Logout
    Dado que estou logado na plataforma
    Quando clicar em Sair
    Então devo ser redirecionado à página de login

  Cenário: Acesso não autorizado
    Dado que acessei a página de upload sem autorização
    Então o sistema deve me negar meu acesso
