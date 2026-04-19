# Sistema de Checklist de Vencimento

Protótipo web em HTML, CSS e JavaScript para administrar planilhas separadas de Frota, Carretas e Agregados.

## Como usar

1. Abra `login.html` no navegador.
2. Faça login com:
   - Usuário: `admin`
   - Senha: `admin123`
3. A interface principal abrirá automaticamente após o login.
4. Use o menu lateral para navegar entre Frota, Carretas, Agregados e Relatórios.
5. Clique em `Adicionar` para criar uma nova placa e em `Editar` para atualizar qualquer registro.

## Recursos incluídos

- Login exclusivo para administrador
- Interface com abas separadas para cada tipo
- Cálculo automático de vencimento em 60 dias
- Coloração de status: verde, amarelo e vermelho
- Busca rápida por registros
- Edição de dados com persistência em memória
- Visão de relatório com checklists realizados, reprovados e taxa de reprovação

## Observação

Os dados de exemplo estão em `app.js`. Para utilizar planilhas reais, você pode exportar como JSON e adaptar a função de carregamento de dados.
