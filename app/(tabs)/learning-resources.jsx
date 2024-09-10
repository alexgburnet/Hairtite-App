import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Modal, Button, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';

import CustomLearningResource from '../../components/CustomLearningResource';

const LearningResources = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/learning-resources')
      .then(response => setResources(response.data))
      .catch(error => console.error('Error fetching learning resources:', error));
  }, []);

  const openLinkInModal = (url) => {
    setCurrentUrl(url);
    setModalVisible(true);
  };

  getThumbnailUrl = (url) => {
    // video id is after shorts/ and before ? in the url
    const videoId = url.split('shorts/')[1].split('?')[0];
    return `https://img.youtube.com/vi/${videoId}/default.jpg`;
  }

  return (
    <>
      <ScrollView>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Learning Resources:</Text>
        </View>
        {resources.map((resource, index) => (
          <CustomLearningResource
            key={index}
            title={resource.title}
            description={resource.description}
            imageURL={getThumbnailUrl(resource.url)}
            linkURL={resource.url}
            onPress={() => openLinkInModal(resource.url)}
          />
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.modalHeader}>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
          <WebView source={{ uri: currentUrl }} style={styles.webView} />
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 10,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    paddingHorizontal: 20,
  },
  webView: {
    flex: 1,
  },
});

export default LearningResources;