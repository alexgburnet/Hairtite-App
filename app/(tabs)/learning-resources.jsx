import { View, ScrollView, Text, StyleSheet } from 'react-native'
import React from 'react'

import CustomLearningResource from '../../components/CustomLearningResource'

const learningResources = () => {

  const resources = [
    {
      title: 'Lorem Ipsum',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu augue nec elit mollis convallis vitae ac odio. Pellentesque et elit arcu. Sed at leo quis sem porta rhoncus ut.',
      imageURL: 'https://placehold.co/400x400.png',
    },
    {
      title: 'Lorem Ipsum',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget sem at nisl varius aliquam. Nunc a fermentum nisl, ac placerat justo. Nulla id mattis dui, et mattis erat. Sed.',
      imageURL: 'https://placehold.co/400x400.png',
    },
    {
      title: 'Lorem Ipsum',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer gravida egestas arcu, non euismod erat dapibus nec. Cras mi neque, feugiat in egestas a, mattis non est. Etiam condimentum sapien.',
      imageURL: 'https://placehold.co/400x400.png',
    },
    {
      title: 'Lorem Ipsum',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam gravida, orci id consectetur varius, velit mauris mollis ligula, vel iaculis nibh ante ac nibh. Nam eu lectus vel nunc molestie.',
      imageURL: 'https://placehold.co/400x400.png',
    },
    {
      title: 'Lorem Ipsum',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod sem vel augue rutrum, ac egestas erat pharetra. Pellentesque et tortor orci. Proin ornare leo ut magna accumsan, vel dignissim.',
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