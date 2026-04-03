import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from 'react-native';


type Tarefa = {
  id: string;
  texto: string;
  concluida: boolean;
};

export default function App() {
  const [texto, setTexto] = useState('');
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  
  function adicionarTarefa() {
    if (texto.trim() === '') return;

    const novaTarefa: Tarefa = {
      id: Date.now().toString(),
      texto: texto,
      concluida: false
    };

    setTarefas([...tarefas, novaTarefa]);
    setTexto('');
  }


  function removerTarefa(id: string) {
    setTarefas(tarefas.filter(t => t.id !== id));
  }

  
  function toggleTarefa(id: string) {
    setTarefas(
      tarefas.map(t =>
        t.id === id ? { ...t, concluida: !t.concluida } : t
      )
    );
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