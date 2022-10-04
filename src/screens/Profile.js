import React from 'react'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'

export const Profile = (props) => {
  return (
    <View>
        <Text>Hello</Text>
    </View>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)