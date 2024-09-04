import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Modal, Button, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

import CustomLearningResource from '../../components/CustomLearningResource';
import CustomButton from '../../components/CustomButton';

const LearningResources = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  const resources = [
    {
      title: 'Lorem Ipsum',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      imageURL: 'https://placehold.co/400x400.png',
      linkURL: 'https://www.youtube.com/@ABurnetHCS',
    },
    // Add other resources as needed
  ];

  const openLinkInModal = (url) => {
    setCurrentUrl(url);
    setModalVisible(true);
  };

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
            imageURL={resource.imageURL}
            linkURL={resource.linkURL}
            onPress={() => openLinkInModal(resource.linkURL)} // Pass the handler here
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