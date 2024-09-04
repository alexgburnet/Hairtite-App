import { View, ScrollView, Text, StyleSheet } from 'react-native'
import React from 'react'

import CustomLearningResource from '../../components/CustomLearningResource'

const learningResources = () => {

  const resources = [
    {
      title: 'Lorem Ipsum',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in.',
      imageURL: 'https://placehold.co/400x400.png',
    },
    {
      title: 'Lorem Ipsum',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dui lorem, dictum vel nulla nec.',
      imageURL: 'https://placehold.co/400x400.png',
    },
    {
      title: 'Lorem Ipsum',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quis mi vel sem eleifend semper.',
      imageURL: 'https://placehold.co/400x400.png',
    },
    {
      title: 'Lorem Ipsum',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eu neque ac risus faucibus congue.',
      imageURL: 'https://placehold.co/400x400.png',
    },
    {
      title: 'Lorem Ipsum',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas turpis enim, facilisis quis vestibulum ut.',
      imageURL: 'https://placehold.co/400x400.png',
    },
    {
      title: 'Lorem Ipsum',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sem urna, finibus eu orci sed, malesuada sodales erat. Fusce nibh nisi, volutpat id neque nec, volutpat condimentum odio. Nam fermentum.',
      imageURL: 'https://placehold.co/400x400.png',
    },
    
  ]

  return (
    <>
      <ScrollView>
        <View style = {styles.textContainer}>
          <Text style={styles.title}>Learning Resources</Text>
        </View>
        {resources.map((resource, index) => (
          <CustomLearningResource
            key={index}
            title={resource.title}
            description={resource.description}
            imageURL={resource.imageURL}
          />
        ))}
      </ScrollView>
    </>
  )
}

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
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: 'rgb(220, 220, 220)',
    backgroundColor: 'white',
    padding: 10,
  },
})

export default learningResources