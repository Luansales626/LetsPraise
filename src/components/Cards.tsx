import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Musician {
  name: string;
  instrument: string;
}

interface Song {
  title: string;
}

interface CardData {
  id: number;
  local: string;
  dataHora: string;
  musicians: Musician[];
  songs: Song[];
}

const Cards: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [localInput, setLocalInput] = useState('');
  const [musicianNameInput, setMusicianNameInput] = useState('');
  const [instrumentInput, setInstrumentInput] = useState('');
  const [songTitleInput, setSongTitleInput] = useState('');
  const [addingMusician, setAddingMusician] = useState<{ [key: number]: boolean }>({});
  const [addingSong, setAddingSong] = useState<{ [key: number]: boolean }>({});
  const [showDatePicker, setShowDatePicker] = useState<{ [key: number]: boolean }>({});
  const [selectedDate, setSelectedDate] = useState<{ [key: number]: Date }>({});

  const handleAddCard = () => {
    const newCard: CardData = {
      id: cards.length + 1,
      local: 'Local Exemplo',
      dataHora: new Date().toLocaleString(),
      musicians: [],
      songs: [],
    };
    setCards([...cards, newCard]);
  };

  const handleAddMusician = (index: number) => {
    if (musicianNameInput.trim() === '' || instrumentInput.trim() === '') return;

    const updatedCards = [...cards];
    updatedCards[index].musicians.push({ name: musicianNameInput, instrument: instrumentInput });

    setCards(updatedCards);
    setMusicianNameInput('');
    setInstrumentInput('');
    setAddingMusician({ ...addingMusician, [index]: false });
  };

  const handleStartAddingMusician = (index: number) => {
    setAddingMusician({ ...addingMusician, [index]: true });
  };

  const handleAddSong = (index: number) => {
    if (songTitleInput.trim() === '') return;

    const updatedCards = [...cards];
    updatedCards[index].songs.push({ title: songTitleInput });

    setCards(updatedCards);
    setSongTitleInput('');
    setAddingSong({ ...addingSong, [index]: false });
  };

  const handleStartAddingSong = (index: number) => {
    setAddingSong({ ...addingSong, [index]: true });
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined, index: number) => {
    if (selectedDate) {
      const updatedCards = [...cards];
      updatedCards[index].dataHora = selectedDate.toLocaleString();
      setCards(updatedCards);
      setSelectedDate({ ...selectedDate, [index]: selectedDate });
    }
    setShowDatePicker({ ...showDatePicker, [index]: false });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAddCard}>
          <Text style={styles.buttonText}>Adicionar Card</Text>
        </TouchableOpacity>
      </View>
      {cards.map((card, index) => (
        <View key={card.id} style={styles.card}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={card.local}
              onChangeText={(text) => {
                const updatedCards = [...cards];
                updatedCards[index].local = text;
                setCards(updatedCards);
              }}
              placeholder="Local"
            />
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowDatePicker({ ...showDatePicker, [index]: true })}
            >
              <Text>{card.dataHora}</Text>
            </TouchableOpacity>
            {showDatePicker[index] && (
              <DateTimePicker
                value={selectedDate[index] || new Date()}
                mode="datetime"
                display="default"
                onChange={(event, selectedDate) => handleDateChange(event, selectedDate, index)}
              />
            )}
          </View>
          <View style={styles.musicianSection}>
            <Text style={styles.sectionTitle}>Músicos:</Text>
            {card.musicians.map((musician, musicianIndex) => (
              <View key={musicianIndex} style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={musician.name}
                  editable={false}
                />
                <TextInput
                  style={styles.input}
                  value={musician.instrument}
                  editable={false}
                />
              </View>
            ))}
            {addingMusician[index] && (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={musicianNameInput}
                  onChangeText={(text) => setMusicianNameInput(text)}
                  placeholder="Nome do Músico"
                />
                <TextInput
                  style={styles.input}
                  value={instrumentInput}
                  onChangeText={(text) => setInstrumentInput(text)}
                  placeholder="Instrumento"
                />
              </View>
            )}
            <TouchableOpacity style={styles.addButton} onPress={() => addingMusician[index] ? handleAddMusician(index) : handleStartAddingMusician(index)}>
              <Text style={styles.buttonText}>{addingMusician[index] ? 'Salvar Músico' : 'Adicionar Músico'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.songSection}>
            <Text style={styles.sectionTitle}>Músicas:</Text>
            {card.songs.map((song, songIndex) => (
              <TextInput
                key={songIndex}
                style={styles.input}
                value={song.title}
                editable={false}
              />
            ))}
            {addingSong[index] && (
              <TextInput
                style={styles.input}
                value={songTitleInput}
                onChangeText={(text) => setSongTitleInput(text)}
                placeholder="Título da Música"
              />
            )}
            <TouchableOpacity style={styles.addButton} onPress={() => addingSong[index] ? handleAddSong(index) : handleStartAddingSong(index)}>
              <Text style={styles.buttonText}>{addingSong[index] ? 'Salvar Música' : 'Adicionar Música'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2C313F',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  addButtonContainer: {
    width: '90%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1d93f3',
    borderRadius: 5,
    padding: 10,
    width: '100%', // Largura do botão
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1d93f3',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '90%',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    flex: 1,
    marginRight: 5,
  },
  musicianSection: {
    marginTop: 20,
    backgroundColor: '#2C313F',
    padding: 10,
    borderRadius: 10,
  },
  songSection: {
    marginTop: 20,
    backgroundColor: '#2C313F',
    padding: 10,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#1d93f3',
    borderRadius: 5,
    padding: 10,
    width: '100%', // Largura do botão
  },
});

export default Cards;
