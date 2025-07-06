import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Share,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const storiesData = [
    {
      id: '1',
      title: 'The Power of Kindness',
      content:
        'Once upon a time in a small town, a kind girl changed the lives of many through simple acts of compassion. She would smile at everyone she met, help anyone who was in need, and spread kindness wherever she went. One day, a stranger came to town, cold and hungry. The girl gave him food, warmth, and comfort. The stranger, who was actually a wealthy businessman, was so touched by her kindness that he decided to stay in the town and help the people there. Her small act of kindness had transformed the entire community.',
    },
    {
      id: '2',
      title: 'Dreams Beyond Stars',
      content:
        'A boy who loved watching the night sky became a renowned astronomer by following his heart and never giving up. From a young age, he would spend his nights gazing at the stars, dreaming of one day discovering something incredible. He worked hard, studying the stars and learning everything he could. Eventually, his persistence paid off. He discovered a new planet and became famous for his work. His story inspired many other young dreamers to pursue their passions, no matter how impossible they seemed.',
    },
    {
      id: '3',
      title: 'Grandma’s Secret Garden',
      content:
        'Behind the old wooden gate was a magical garden filled with stories, memories, and blooming wonders. Grandma had always told her grandchildren about the special garden, but it was only when they grew older that they realized the true magic behind it. The garden seemed to change with the seasons, and every flower had a story to tell. Some flowers brought memories of their parents, others of their own childhood. The garden became a place where the family gathered to remember and celebrate their past, while looking forward to the future.',
    },
    {
      id: '4',
      title: 'The Lost Key',
      content:
        'A young girl found an ancient key that led her to uncover hidden treasures, but she soon realized the greatest treasure was the journey itself. She had been wandering through the forest when she stumbled upon a rusty, old key half-buried in the dirt. Intrigued, she set off on a quest to find the lock it belonged to. Along the way, she met strange creatures, solved riddles, and learned the importance of friendship and courage. When she finally found the lock, it opened to a treasure chest filled with memories and experiences she had gained on her journey, proving that the journey itself was the true treasure.',
    },
    {
      id: '5',
      title: 'The Courageous Lion',
      content:
        'In a jungle where fear ruled, a lion found the strength to stand up to the mighty elephant and became the leader of the animal kingdom. The lion had always been shy and fearful, watching from the sidelines as the other animals fought for power. One day, a great storm ravaged the jungle, and all the animals were in fear of the destruction. The lion stepped up, rallied the animals, and led them to safety. The other animals were so impressed by his courage and leadership that they elected him as their king. The lion learned that true strength lies in facing fear and acting with bravery.',
    },
    {
      id: '6',
      title: 'The Invisible Friend',
      content:
        'A lonely child made an unlikely friend — a magical creature no one else could see — and learned the true meaning of friendship and trust. She was an outcast at school, ignored by the other children, until one day, she met a strange creature in the forest. It was invisible to everyone else, but it became her best friend. They would talk, play, and share secrets that no one else could hear. Over time, she learned to trust her invisible friend and discovered that real friendship comes from understanding and accepting each other, no matter how different they may seem.',
    },
    {
      id: '7',
      title: 'The Time Traveler’s Diary',
      content:
        'A curious boy stumbled upon an old diary that transported him back in time, and soon he discovered the future depended on his every move. The boy found a dusty old book in the attic one day. As he flipped through its pages, he realized that it was not just a regular diary — it was a time travel journal. Each entry would send him back in time to important events. He learned that his actions in the past could change the future, and he had to be careful with every decision he made. The boy used the diary to fix mistakes, help people, and make the world a better place, realizing that sometimes, the smallest choices can have the greatest impact.',
    },
    {
      id: '8',
      title: 'The Magic of Music',
      content:
        'A young musician discovered that the melodies she played could heal hearts and bring peace to even the most troubled souls. She was a talented violinist who loved playing music in the park. One day, as she played, a man who had been suffering from a broken heart sat down to listen. Her music seemed to wash away his sorrow, and he felt a deep sense of peace. Word spread, and soon, people from all over came to hear her play, finding solace in the beautiful melodies. She realized that music had the power to heal, and she used her gift to bring comfort to others.',
    },
  ];
  

const { height, width } = Dimensions.get('window');

const ReadStories = () => {
    const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStory, setSelectedStory] = useState<{
    id: string;
    title: string;
    content: string;
  } | null>(null);

  const openModal = (story: typeof storiesData[0]) => {
    setSelectedStory(story);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedStory(null);
  };

  const handleShare = async () => {
    if (selectedStory) {
      try {
        await Share.share({
          message: `${selectedStory.title}\n\n${selectedStory.content}`,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace('/featuresPage')
          }
          style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Read Top Real Stories</Text>
      </View>

      <Image
        source={require('../../assets/images/on-boarding-image.jpg')}
        style={styles.topImage}
        resizeMode="cover"
      />

      <ScrollView contentContainerStyle={styles.storiesContainer}>
        {storiesData.map((item) => (
          <View key={item.id} style={styles.storyItem}>
            <Text style={styles.storyTitle}>{item.title}</Text>
            <Pressable onPress={() => openModal(item)} style={styles.readMore}>
              <Text style={styles.readMoreText}>Read More</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>

      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{selectedStory?.title}</Text>
            <ScrollView style={styles.modalScroll}>
              <Text style={styles.modalContent}>{selectedStory?.content}</Text>
            </ScrollView>
            <View style={styles.modalButtons}>
              <Pressable onPress={closeModal} style={styles.closeBtn}>
                <Text style={styles.closeText}>Close</Text>
              </Pressable>
              <Pressable onPress={handleShare} style={styles.shareBtn}>
                <Text style={styles.shareText}>Share</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ReadStories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e0146',
    paddingTop: 5,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 15,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f5f6fa',
    textAlign: 'center',
    marginRight: 32,
  },
  topImage: {
    width: '100%',
    height: height * 0.4,
    borderRadius: 24,
    marginBottom: 16,
  },
  storiesContainer: {
    paddingBottom: 100,
  },
  storyItem: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 16,
    marginBottom: 12,
  },
  storyTitle: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  readMore: {
    backgroundColor: '#6a1b4d',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  readMoreText: {
    color: '#fff',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    width: width * 0.9,
    height: height * 0.6, // Increased height
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e0146',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalScroll: {
    flex: 1,
    width: '100%',
    marginBottom: 20,
  },
  modalContent: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
    padding:10,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  closeBtn: {
    backgroundColor: '#1e0146',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginRight: 10,
  },
  shareBtn: {
    backgroundColor: '#6a1b4d',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  shareText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
