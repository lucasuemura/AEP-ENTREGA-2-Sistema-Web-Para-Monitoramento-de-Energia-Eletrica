<h1>Módulos do Projeto</h1>

<h2>1. Front-End (Interface e Experiência do Usuário)</h2>
O sistema possui uma interface web desenvolvida com foco na usabilidade e na organização das informações, utilizando uma identidade visual baseada em tons escuros e elementos em verde, associados à temática de eficiência energética.
<br>
• Navegação em página única (SPA): Permite a alternância entre as seções do sistema (Início, Simulador e Metas ODS 7) sem a necessidade de recarregar a página, proporcionando uma experiência mais fluida ao usuário.
<br>
• Visualização de dados: Utilização da biblioteca Chart.js para geração de gráficos que auxiliam na análise do consumo energético, permitindo identificar os equipamentos com maior impacto no gasto de energia.
<br>
• Feedback ao usuário: Implementação de notificações visuais para informar operações realizadas no sistema, como inclusão ou remoção de aparelhos cadastrados.

<h2>2. Modelagem Java (Orientação a Objetos)</h2>
A estrutura do sistema foi modelada seguindo os princípios da Programação Orientada a Objetos, visando maior organização, reutilização de código e facilidade de manutenção.
<br>
• A classe Usuario é responsável pelo gerenciamento das informações do usuário e mantém uma relação com os cômodos cadastrados na residência.
<br>
• A classe Comodo representa cada ambiente da residência e armazena os aparelhos associados a esse local.
<br>
• A classe Aparelho contém os dados necessários para o cálculo do consumo energético, permitindo estimar gastos de energia e custos financeiros com base nas tarifas informadas pelo usuário.

<h2>3. Motor em C (Estruturas de Dados)</h2>
O módulo desenvolvido em linguagem C tem como objetivo aplicar conceitos de estruturas de dados e gerenciamento de memória, realizando o armazenamento e processamento dos aparelhos cadastrados.
<br>
• Lista encadeada: Os aparelhos são armazenados em uma estrutura dinâmica composta por nós interligados por ponteiros, permitindo inserções e remoções de forma eficiente.
<br>
• Alocação dinâmica de memória: A criação dos nós é realizada em tempo de execução por meio da função malloc(), enquanto a liberação dos recursos ocorre com a função free(), garantindo o uso adequado da memória durante a execução do programa.
<br>
• Manipulação dos dados: O módulo possibilita operações de cadastro, consulta, remoção e processamento das informações armazenadas na lista encadeada.
