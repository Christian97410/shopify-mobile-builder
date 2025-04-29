import React, { useState } from 'react';
import { View, Text, ImageBackground, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function BuilderRuntime({ config }) {
  const pageKeys = Object.keys(config.pages || {});
  const currentPage = pageKeys[0] || '';
  const sections = (config.pages[currentPage] || {}).sections || [];

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>{currentPage}</Text>
      {sections.map((sec, i) => (
        <SectionRenderer key={i} section={sec} />
      ))}
    </View>
  );
}

function SectionRenderer({ section }) {
  const { type, props } = section;
  switch (type) {
    case 'hero-banner': return <HeroBanner {...props} />;
    case 'product-grid': return <ProductGrid {...props} />;
    case 'collection-list': return <CollectionList {...props} />;
    case 'newsletter': return <NewsletterForm {...props} />;
    default: return <Text>Unknown section: {type}</Text>;
  }
}

// Implémentations simplifiées :
function HeroBanner({ title, subtitle, imageUrl, buttonText, buttonLink }) {
  return (
    <ImageBackground source={{ uri: imageUrl }} style={styles.hero}>
      <Text style={styles.heroTitle}>{title}</Text>
      <Text style={styles.heroSubtitle}>{subtitle}</Text>
      {buttonText && (
        <TouchableOpacity onPress={()=>Alert.alert('Link', buttonLink)} style={styles.heroButton}>
          <Text style={styles.heroButtonText}>{buttonText}</Text>
        </TouchableOpacity>
      )}
    </ImageBackground>
  );
}

function ProductGrid({ title, limit }) {
  const items = Array.from({ length: limit }, (_, i) => ({ id: i, name: `${title} #${i+1}` }));
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={items}
        horizontal
        keyExtractor={i=>String(i.id)}
        renderItem={({ item }) => (
          <View style={styles.gridItem}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

function CollectionList({ title }) {
  const categories = ['A','B','C'];
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {categories.map((c,i)=><Text key={i}>• {c}</Text>)}
    </View>
  );
}

function NewsletterForm({ title, subtitle }) {
  const [email, setEmail] = useState('');
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionSubtitle}>{subtitle}</Text>
      <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} value={email}/>
      <TouchableOpacity style={styles.subscribeButton} onPress={()=>Alert.alert('Subscribed', email)}>
        <Text style={styles.subscribeButtonText}>Subscribe</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20, backgroundColor:'#fff' },
  pageTitle: { fontSize:24, fontWeight:'bold', marginBottom:12 },
  hero: { width:'100%', height:200, justifyContent:'center', alignItems:'center' },
  heroTitle: { fontSize:28, color:'#fff' },
  heroSubtitle: { fontSize:16, color:'#fff' },
  heroButton: { backgroundColor:'#000', padding:8, borderRadius:4 },
  heroButtonText: { color:'#fff' },
  section: { marginBottom:20 },
  sectionTitle: { fontSize:18, fontWeight:'600' },
  gridItem: { width:120, height:120, backgroundColor:'#eee', justifyContent:'center', alignItems:'center', marginRight:10 },
  input: { borderWidth:1, borderColor:'#ccc', padding:8, borderRadius:4, marginBottom:10 },
  subscribeButton: { backgroundColor:'#007AFF', padding:10, borderRadius:4, alignItems:'center' },
  subscribeButtonText: { color:'#fff', fontWeight:'600' },
});
