# language: pt
Funcionalidade: API de Vídeo

  Cenário: Upload de vídeo válido
    Dado que estou logado na plataforma
    Quando carregar um arquivo válido
    E clicar em Extrair Imagens
    Então o botão de Extrair Imagens deve ficar desabilitado
    E um arquivo zipado das imagens deve ser retornado para download
    E o dashboard deve ser atualizado com o status do arquivo

  Cenário: Upload de vídeo inválido
    Dado que estou logado na plataforma
    Quando carregar um arquivo inválido
    E clicar em Extrair Imagens
    Então deve ocorrer um erro
