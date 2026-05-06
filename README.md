# To-Do List App (React Native + AsyncStorage)

Aplicativo simples de lista de tarefas desenvolvido com **React Native (Expo)** e **TypeScript**, com persistência local utilizando AsyncStorage.

---

##  Funcionalidades

*  Adicionar novas tarefas
*  Marcar tarefas como concluídas
*  Remover tarefas
*  Armazenamento local com AsyncStorage
*  Persistência dos dados mesmo após fechar o aplicativo

---

##  Tecnologias utilizadas

* React Native (Expo)
* TypeScript
* AsyncStorage

---

##  Instalação

1. Clone o repositório:

```bash
git clone https://github.com/eduarda-hirt/to-do-list-react-native
```

2. Acesse a pasta do projeto:

```bash
cd SEU-REPOSITORIO
```

3. Instale as dependências:

```bash
npm install
```

---

## ▶️ Como executar o projeto

Execute o comando abaixo:

```bash
npx expo start
```

Depois disso, você pode:

* Abrir no navegador (Web)
* Rodar no emulador Android/iOS
* Escanear o QR Code com o aplicativo Expo Go no celular

---

##  Teste da persistência

1. Adicione uma tarefa
2. Feche o aplicativo
3. Abra novamente

 A tarefa deve continuar salva na lista, confirmando o funcionamento do AsyncStorage.

---

##  Estrutura

* `App.tsx` → Componente principal com toda a lógica do app
* Uso de `useState` e `useEffect` para controle de estado
* AsyncStorage para salvar e recuperar dados


