import React from 'react';
import { View, Text } from 'react-native';

export default function BuilderRuntime({ config }) {
  return (
    <View style={{ padding: 20 }}>
      {config.sections?.map((section, i) => (
        <View key={i} style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 18 }}>{section.type}</Text>
        </View>
      ))}
    </View>
  );
}
