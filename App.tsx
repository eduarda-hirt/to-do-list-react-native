import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Tarefa = {
  id: string;
  texto: string;
  concluida: boolean;
};

export default function App() {
  const [texto, setTexto] = useState('');
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  // 🔹 SALVAR tarefas
  const salvarTarefas = async (novasTarefas: Tarefa[]) => {
    try {
      await AsyncStorage.setItem('@tarefas', JSON.stringify(novasTarefas));
    } catch (error) {
      console.log('Erro ao salvar tarefas', error);
    }
  };

  // 🔹 CARREGAR tarefas
  const carregarTarefas = async () => {
    try {
      const tarefasSalvas = await AsyncStorage.getItem('@tarefas');
      if (tarefasSalvas !== null) {
        setTarefas(JSON.parse(tarefasSalvas));
      }
    } catch (error) {
      console.log('Erro ao carregar tarefas', error);
    }
  };

  // 🔹 Carrega ao abrir o app
  useEffect(() => {
    carregarTarefas();
  }, []);

  // 🔹 Adicionar tarefa
  function adicionarTarefa() {
    if (texto.trim() === '') return;

    const novaTarefa: Tarefa = {
      id: Date.now().toString(),
      texto: texto,
      concluida: false
    };

    const novasTarefas = [...tarefas, novaTarefa];

    setTarefas(novasTarefas);
    salvarTarefas(novasTarefas);
    setTexto('');
  }

  // 🔹 Remover tarefa
  function removerTarefa(id: string) {
    const novasTarefas = tarefas.filter(t => t.id !== id);

    setTarefas(novasTarefas);
    salvarTarefas(novasTarefas);
  }

  // 🔹 Marcar como concluída
  function toggleTarefa(id: string) {
    const novasTarefas = tarefas.map(t =>
      t.id === id ? { ...t, concluida: !t.concluida } : t
    );

    setTarefas(novasTarefas);
    salvarTarefas(novasTarefas);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>To Do List</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite uma tarefa..."
        value={texto}
        onChangeText={setTexto}
      />

      <TouchableOpacity style={styles.botao} onPress={adicionarTarefa}>
        <Text style={styles.botaoTexto}>Adicionar</Text>
      </TouchableOpacity>

      <FlatList
        data={tarefas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            
            {/* Marcar como concluída */}
            <TouchableOpacity onPress={() => toggleTarefa(item.id)}>
              <Text
                style={[
                  styles.itemTexto,
                  item.concluida && styles.concluida
                ]}
              >
                {item.texto}
              </Text>
            </TouchableOpacity>

            {/* Remover */}
            <TouchableOpacity onPress={() => removerTarefa(item.id)}>
              <Text style={styles.remover}>X</Text>
            </TouchableOpacity>

          </View>
        )}
      />
    </View>
  );
}

// 🎨 Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10
  },
  botao: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold'
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 10
  },
  itemTexto: {
    fontSize: 16
  },
  concluida: {
    textDecorationLine: 'line-through',
    color: 'gray'
  },
  remover: {
    color: 'red',
    fontWeight: 'bold'
  }
});