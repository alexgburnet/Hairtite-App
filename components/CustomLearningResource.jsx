import { View, Pressable, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

const CustomLearningResource = ({ title, description, imageURL, onPress }) => {
  // Split the description by newlines
  const descriptionLines = description.split('\\n');
  console.log(descriptionLines);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressedContainer,
      ]}
      onPress={onPress}
    >
      <Text style={styles.title}>{title}</Text>
      <View style={styles.textAndPicture}>
        <Image
          source={{ uri: imageURL }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          {descriptionLines.map((line, index) => (
            <Text key={index} style={styles.description}>{line}</Text>
          ))}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: 'rgb(220, 220, 220)',
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  pressedContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  textAndPicture: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  textContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-start', // Align text to the start
    gap: 5,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  description: {
    fontSize: 12,
    textAlign: 'left', // Change to left for proper multiline display
    fontFamily: 'Poppins-Light',
  },
});

export default CustomLearningResource;